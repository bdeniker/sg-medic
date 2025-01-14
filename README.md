# sg-medic

## Setup (Linux)
1. Install [nvm](https://github.com/nvm-sh/nvm) and run `nvm install` in the root directory to install the correct version of Node.
2. Install openjdk-11-jdk
2. Install Android Studio and install Android SDK 31
3. Add that SDK to your PATH by adding this to your shell rc file:
```
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/10.0/bin
```
5. To set up a physical device for debugging, use the [react native docs](https://reactnative.dev/docs/running-on-device)
6. Might want to do a restart around here 😬🤷

## ToDo
- Upgrade to latest Node