import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { drawChar } from "@/odyssey/gfx";
import { drawHero, HERO_SKINS, CLASSIC_SKIN, skinFx, skinUnlocked } from "@/odyssey/hero-sprite";
import { drawFxInst, makeFx, preloadFx, tickFx, type FxInst } from "@/odyssey/vfx";
import {
  CAPES, DEFAULT_LOOK, EYE_COLORS, HAIR_COLORS, HAIR_STYLES, HATS, MARKS, OUTFITS, SKIN_PRESETS, SKIN_TONES,
  getLook, randomLook, resolveLook, setLook, type Look,
} from "@/odyssey/appearance";

type Cat = "skins" | "skin" | "hair" | "style" | "eyes" | "outfit" | "cape" | "hat" | "mark";
const CATS: [Cat, string][] = [["skins", "Skins"], ["skin", "Pele"], ["hair", "Cabelo"], ["style", "Estilo"], ["eyes", "Olhos"], ["outfit", "Roupa"], ["cape", "Capa"], ["hat", "Chapéu"], ["mark", "Rosto"]];

/** Skins de IA (com 5 ataques) aparecem primeiro; o índice salvo não muda. */
const SKIN_ORDER = HERO_SKINS.map((s, i) => ({ i, ai: !!s.ai })).sort((a, b) => Number(b.ai) - Number(a.ai) || a.i - b.i).map((x) => x.i);
const PV = 192, PS = 4; // canvas de prévia: 48×48 px de jogo ampliados 4×

function Preview({ look, armor, ring }: { look: Look; armor: string; ring: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [dir, setDir] = useState(0);
  const [mode, setMode] = useState<"walk" | "idle" | "attack">("attack");
  const [step, setStep] = useState(0);
  const st = useRef({ look, armor, ring, dir, mode });
  st.current = { look, armor, ring, dir, mode };
  useEffect(() => {
    preloadFx();
    let raf = 0, last = performance.now(), t = 0, atk = 0, combo = -1, fx: FxInst[] = [];
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now; t += dt;
      const c = ref.current?.getContext("2d");
      if (c) {
        const { look: lk, armor: am, ring: rg, dir: d, mode: m } = st.current;
        if (m === "attack") {
          atk -= dt / 0.28;
          if (atk < -0.9) {
            combo = (combo + 1) % 5; atk = 1; setStep(combo);
            const name = skinFx(lk.kskin, combo), fin = combo === 4;
            const ground = name !== "slash" && name !== "impact" && name !== "blood" && name !== "void" && name !== "explosion" && name !== "ice" && name !== "nature";
            fx.push(makeFx(name, 31, ground ? 44 : 32, fin ? 0.75 : 0.5, false, fin ? 0.5 : 0.36));
          }
        } else { atk = 0; combo = -1; }
        fx = tickFx(fx, dt);
        const r = resolveLook(lk, am, rg);
        c.setTransform(1, 0, 0, 1, 0, 0); c.clearRect(0, 0, PV, PV); c.imageSmoothingEnabled = false;
        c.setTransform(PS, 0, 0, PS, 0, 0);
        const hx = m === "attack" ? 15 : 24, dd = m === "attack" ? 2 : d;
        const ok = drawHero(c, hx, 42, { skin: lk.kskin, dir: dd, moving: m === "walk", frameT: t * 8, attack: Math.max(0, atk), combo: Math.max(0, combo), time: t });
        if (!ok) drawChar(c, hx, 42, r.pal, dd, Math.floor(t * 5) % 4, null, Math.max(0, atk), r.extras);
        for (const f of fx) drawFxInst(c, f);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="look-preview">
      <canvas ref={ref} width={PV} height={PV} aria-label="Pré-visualização do herói" />
      {mode === "attack" && <div className="look-combo" aria-live="polite">{[0, 1, 2, 3, 4].map((i) => <span key={i} className={i === step ? "on" : ""}>{i + 1}</span>)}</div>}
      <div className="look-preview-btns">
        <Button variant="game" className="game-btn" aria-label="Girar à esquerda" onClick={() => { setMode((m) => (m === "attack" ? "idle" : m)); setDir((d) => [2, 3, 1, 0][d] ?? 0); }}>⟲</Button>
        <Button variant="game" className="game-btn" aria-label="Ver ataques" aria-pressed={mode === "attack"} onClick={() => setMode("attack")}>⚔</Button>
        <Button variant="game" className="game-btn" aria-label={mode === "walk" ? "Parar" : "Andar"} onClick={() => setMode((m) => (m === "walk" ? "idle" : "walk"))}>{mode === "walk" ? "❚❚" : "▶"}</Button>
        <Button variant="game" className="game-btn" aria-label="Girar à direita" onClick={() => { setMode((m) => (m === "attack" ? "idle" : m)); setDir((d) => [1, 2, 3, 0][d] ?? 0); }}>⟳</Button>
      </div>
    </div>
  );
}

/** Miniatura parada da skin; tenta de novo até a folha carregar. */
function SkinThumb({ index }: { index: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let tries = 0, id = 0;
    const draw = () => {
      const c = ref.current?.getContext("2d"); if (!c) return;
      c.clearRect(0, 0, 40, 40); c.imageSmoothingEnabled = false;
      const ok = drawHero(c, 20, 37, { skin: index, dir: 0, moving: false, frameT: 0, attack: 0, time: 0 });
      if (!ok && HERO_SKINS[index]?.sheet && tries++ < 40) id = window.setTimeout(draw, 150);
      else if (!ok) drawChar(c, 20, 37, resolveLook(DEFAULT_LOOK, "#6a8", "#ddc58e").pal, 0, 0, null, 0);
    };
    draw();
    return () => clearTimeout(id);
  }, [index]);
  return <canvas ref={ref} width={40} height={40} className="look-skin-thumb" aria-hidden="true" />;
}

export function AppearancePanel({ level, armor, ring }: { level: number; armor: string; ring: string }) {
  const [look, setL] = useState<Look>(() => getLook());
  const [cat, setCat] = useState<Cat>("skins");
  const apply = (patch: Partial<Look>) => { const n = { ...look, kskin: CLASSIC_SKIN, ...patch }; setL(n); setLook(n); };
  const set = (n: Look) => { setL(n); setLook(n); };

  const swatches = (items: { name: string; color: string }[], key: keyof Look) => (
    <div className="look-grid">{items.map((s, i) => (
      <button key={s.name} className={`look-swatch ${look[key] === i ? "on" : ""}`} onClick={() => apply({ [key]: i } as Partial<Look>)} aria-label={s.name} aria-pressed={look[key] === i} title={s.name}>
        <span style={{ background: s.color || "transparent" }} className={s.color ? "" : "look-none"}>{s.color ? "" : "∅"}</span><small>{s.name}</small>
      </button>))}
    </div>
  );
  const chips = (names: string[], key: keyof Look, locked?: (i: number) => number | undefined) => (
    <div className="look-grid look-chips">{names.map((n, i) => {
      const need = locked?.(i); const lock = need !== undefined && level < need;
      return <button key={n} disabled={lock} className={`look-chip ${look[key] === i ? "on" : ""}`} onClick={() => apply({ [key]: i } as Partial<Look>)} aria-pressed={look[key] === i}>{n}{lock && <small>Nv {need}</small>}</button>;
    })}</div>
  );

  return (
    <div className="look-layout">
      <Preview look={look} armor={armor} ring={ring} />
      <div className="look-editor">
        <div className="look-cats" role="tablist" aria-label="Categorias">{CATS.map(([id, label]) => <button key={id} role="tab" aria-selected={cat === id} className={cat === id ? "on" : ""} onClick={() => setCat(id)}>{label}</button>)}</div>
        <div className="look-options">
          {cat === "skins" && <><div className="look-skins">{SKIN_ORDER.map((i) => { const s = HERO_SKINS[i]!; return <Button key={s.id} variant="game" disabled={!skinUnlocked(i, level)} aria-pressed={look.kskin === i} className={`look-skin h-auto whitespace-normal text-left ${look.kskin === i ? "ring-1 ring-primary" : ""}`} onClick={() => apply({ kskin: i })}><span className="look-skin-row"><SkinThumb index={i} /><span className="look-skin-text"><b>{s.name}{s.ai && <em className="look-skin-tag">5 ataques</em>}</b><small>{skinUnlocked(i, level) ? s.desc : `Libera no nível ${s.minLevel}`}</small></span></span></Button>; })}</div><div className="look-skins mt-3">{SKIN_PRESETS.map((s) => {
            const lock = level < s.minLevel;
            return <Button variant="game" key={s.id} disabled={lock} className="look-skin h-auto whitespace-normal text-left" onClick={() => set({ ...s.look, kskin: CLASSIC_SKIN })}><b>{s.name}</b><small>{lock ? `Libera no nível ${s.minLevel}` : s.desc}</small></Button>;
          })}</div></>}
          {cat === "skin" && swatches(SKIN_TONES, "skin")}
          {cat === "hair" && swatches(HAIR_COLORS, "hairColor")}
          {cat === "style" && chips(HAIR_STYLES, "hairStyle")}
          {cat === "eyes" && swatches(EYE_COLORS, "eyes")}
          {cat === "outfit" && chips(OUTFITS.map((o) => o.name), "outfit", (i) => OUTFITS[i]?.minLevel)}
          {cat === "cape" && swatches(CAPES, "cape")}
          {cat === "hat" && chips(HATS.map((h) => h.name), "hat", (i) => HATS[i]?.minLevel)}
          {cat === "mark" && chips(MARKS, "mark")}
        </div>
        <div className="look-actions">
          <Button variant="game" className="game-btn" onClick={() => set(randomLook(level))}>🎲 Aleatório</Button>
          <Button variant="game" className="game-btn" onClick={() => set({ ...DEFAULT_LOOK })}>↺ Restaurar</Button>
        </div>
        {look.outfit === 0 && <div className="modal-hint">“Armadura equipada” usa a cor da armadura que você veste.</div>}
      </div>
    </div>
  );
}
