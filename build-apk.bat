\
@echo off
setlocal
cd /d "%~dp0"
echo [1/4] Verificando Bun...
where bun >nul 2>nul
if errorlevel 1 (
  echo ERRO: Bun nao encontrado. Instale em https://bun.sh/
  pause
  exit /b 1
)
echo [2/4] Instalando dependencias JavaScript...
call bun install
if errorlevel 1 goto :error
echo [3/4] Compilando o jogo web...
call bun run build
if errorlevel 1 goto :error
echo [4/4] Gerando APK Android debug...
where gradle >nul 2>nul
if errorlevel 1 (
  echo ERRO: Gradle nao encontrado no PATH.
  echo Instale o Gradle e configure JAVA_HOME e ANDROID_HOME, ou abra a pasta android no Android Studio.
  pause
  exit /b 1
)
call gradle -p android assembleDebug
if errorlevel 1 goto :error
echo.
echo APK criado em: android\app\build\outputs\apk\debug\app-debug.apk
pause
exit /b 0
:error
echo.
echo Falha durante a compilacao. Confira as mensagens acima.
pause
exit /b 1
