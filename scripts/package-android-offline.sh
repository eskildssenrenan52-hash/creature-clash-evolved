#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ASSET_DIR="$ROOT/android/app/src/main/assets/game"

cd "$ROOT"
pnpm run build
rm -rf "$ASSET_DIR"
mkdir -p "$ASSET_DIR"
cp -a .output/public/. "$ASSET_DIR/"

python3 - "$ASSET_DIR" <<'PY'
from pathlib import Path
import html
import sys

root = Path(sys.argv[1])
assets = root / "assets"
entry = next(assets.glob("index-*.js"), None)
if entry is None:
    raise SystemExit("bundle JS de entrada não encontrado")
css = sorted(assets.glob("*.css"))
if not css:
    raise SystemExit("CSS compilado não encontrado")

# O build web usa raízes HTTP. No APK, tudo vive sob file:///android_asset/game/.
for path in list(assets.glob("*.js")) + list(assets.glob("*.css")):
    text = path.read_text(encoding="utf-8")
    for old, new in (("\"/assets/", "\"assets/"), ("'/assets/", "'assets/"), ("`/assets/", "`assets/"),
                     ("\"/kaetram/", "\"kaetram/"), ("'/kaetram/", "'kaetram/"), ("`/kaetram/", "`kaetram/")):
        text = text.replace(old, new)
    path.write_text(text, encoding="utf-8")

styles = "\n".join(f'<link rel="stylesheet" href="assets/{html.escape(p.name)}">' for p in css)
page = f'''<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">
  <base href="https://appassets.androidplatform.net/assets/game/">
  <title>Creature Clash Reimagined</title>
  {styles}
</head>
<body>
  <div id="root"></div>
  <!-- URL relativa: preserva a origem file://android_asset e evita SecurityError no WebView. -->
  <script>try {{ history.replaceState(null, "", "/odyssey"); }} catch (_) {{ /* WebViews antigos continuam na entrada local. */ }}</script>
  <script type="module" src="assets/{html.escape(entry.name)}"></script>
</body>
</html>
'''
(root / "index.html").write_text(page, encoding="utf-8")
PY

printf 'offline assets: '
du -sh "$ASSET_DIR" | cut -f1
printf 'entry: '
find "$ASSET_DIR/assets" -maxdepth 1 -name 'index-*.js' -printf '%f\n'
