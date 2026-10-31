#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
command -v bun >/dev/null || { echo "Erro: instale Bun em https://bun.sh/"; exit 1; }
command -v gradle >/dev/null || { echo "Erro: Gradle nao encontrado. Instale Gradle e configure JAVA_HOME/ANDROID_HOME, ou use Android Studio."; exit 1; }
bun install
bun run build
gradle -p android assembleDebug
echo "APK criado em: android/app/build/outputs/apk/debug/app-debug.apk"
