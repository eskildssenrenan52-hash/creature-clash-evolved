# Gerar APK com Bun — Twelve Creature Clash

## Antes de começar
- Instale Bun: https://bun.sh/
- Instale JDK 17.
- Instale Android SDK (por exemplo, pelo Android Studio).
- Instale Gradle e deixe `gradle` disponível no PATH.
- Configure `JAVA_HOME` e `ANDROID_HOME`/`ANDROID_SDK_ROOT`.

## 1. Configure a URL do jogo
Abra `android/app/src/main/res/values/config.xml` e troque
`https://SEU-PROJETO.lovable.app/odyssey` pela URL HTTPS publicada do seu jogo.
Mantenha `/odyssey` apenas se essa for a rota real.

A aplicação Android carrega o jogo dessa URL pela internet. `bun run build`
compila a parte web, mas não incorpora automaticamente os arquivos web no APK.
A URL precisa estar publicada e acessível no celular.

## 2. Windows
Dê dois cliques em `build-apk.bat`, ou abra o terminal nesta pasta e execute:

```powershell
bun install
bun run build
bun run apk
```

O comando `bun run apk` executa a compilação web e depois `gradle -p android assembleDebug`.
Se o Gradle não estiver instalado/no PATH, abra `android` no Android Studio e use
**Build > Build Bundle(s) / APK(s) > Build APK(s)**.

## 3. Linux/macOS
No terminal, nesta pasta:

```bash
chmod +x build-apk.sh
./build-apk.sh
```

Ou execute os comandos Bun acima, desde que Gradle, JDK e Android SDK estejam configurados.

## 4. APK de saída
`android/app/build/outputs/apk/debug/app-debug.apk`

Esse é um APK debug para testes. Para distribuir uma versão release, configure a
assinatura/keystore antes de gerar `assembleRelease`.

## Orientação
O `AndroidManifest.xml` fixa `android:screenOrientation="landscape"`.
