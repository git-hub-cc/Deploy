irm https://create.tauri.app/ps | iex
npm run tauri dev
npm run tauri build


npm create tauri-app@latest my-android-app
cd my-android-app
npm install
npm run tauri dev
npm run tauri android init
npm run tauri android dev
npm run tauri android build

$env:ANDROID_HOME="C:\Users\User\AppData\Local\Android\Sdk"
$env:NDK_HOME="$env:ANDROID_HOME\ndk\<ndk版本>"
$env:JAVA_HOME="C:\Users\User\.jdks\jdk-17.0.16"

$env:RUSTUP_DIST_SERVER="https://mirrors.tuna.tsinghua.edu.cn/rustup"
$env:RUSTUP_UPDATE_ROOT="https://mirrors.tuna.tsinghua.edu.cn/rustup/rustup"
