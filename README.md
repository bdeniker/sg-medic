# sg-medic

## Setup (Linux)

1. Install [nvm](https://github.com/nvm-sh/nvm) and run `nvm install` in the root directory to install the correct version of Node.
2. Install openjdk-11-jdk
3. Install Android Studio and install Android SDK 31
4. Add that SDK to your PATH by adding this to your shell rc file:

```
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/10.0/bin
```

5. To set up a physical device for debugging, use the [react native docs](https://reactnative.dev/docs/running-on-device)
6. Might want to do a restart around here 😬🤷

## Generate an APK

For react-native 0.69.4, ensure `android/app/build.gradle` has `enableSeparateBuildPerCPUArchitecture` set to `true` and (much lower down, in `splits{abi{}}`) `universalApk true`. Then, run the following in the `android/` directory:

```sh
./gradlew clean && ./gradlew bundleRelease && ./gradlew assembleRelease
```

This should generate architecture-specific APKs _as well as_ a universal APK in `android/app/build/outputs/apk/release/`.

## ToDo

- Upgrade to latest Node
- Upgrade react-native... and NFC lib, which might mean Expo, which might mean just start a new project template and carry over the componenets 🤷
- upgrade [@react-navigation/bottom-tabs](https://reactnavigation.org/docs/bottom-tab-navigator/) (and/or otherwise fix Injury tab cropping)
