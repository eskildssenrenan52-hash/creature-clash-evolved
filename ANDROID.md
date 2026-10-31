# Gerar o APK (Android Studio)

O app Android é uma casca nativa (WebView) que abre o jogo publicado em HTTPS, em tela cheia.
Os saves ficam no armazenamento do app. **Precisa de internet** (não é offline).

## 1. Instalar
1. **Android Studio** (versão atual, Ladybug ou mais nova): https://developer.android.com/studio
   - Ele já traz o JDK 17+ (JBR); não precisa instalar Java à parte.
2. No Android Studio: *Settings → Languages & Frameworks → Android SDK* e marque:
   - **Android 15 (API 35)** – SDK Platform
   - *SDK Tools*: **Android SDK Build-Tools 35**, **Platform-Tools**, **Command-line Tools**
3. (Opcional) um celular com *Depuração USB* ligada, ou crie um emulador em *Device Manager*.

## 2. Apontar para o seu jogo
Publique o projeto no Lovable (Publish) e edite:
`android/app/src/main/res/values/config.xml` → troque `game_url` pela URL `https://…/odyssey`.

## 3. Abrir e compilar
1. *File → Open* → escolha a pasta **android/** (não a raiz do repositório).
2. Espere o *Gradle Sync* terminar (ele baixa o Gradle 8.9 sozinho na primeira vez).
3. APK de teste: *Build → Build Bundle(s) / APK(s) → Build APK(s)*.
   Saída: `android/app/build/outputs/apk/debug/app-debug.apk` → copie para o celular e instale.
4. Pelo terminal (se tiver o wrapper gerado): `cd android && ./gradlew assembleDebug`.

## 4. Versão de loja (release)
*Build → Generate Signed App Bundle / APK* → crie um keystore (**guarde o arquivo e a senha; não suba no Git**).
Para a Play Store use **.aab** (Android App Bundle).
