# sg-med

## Run on connected phone

```sh
npm run android -- --device
```

## Build APK

```sh
eas build -p android --profile preview
```

## Useful adb commands

```sh
adb devices # lists all connected devices
adb kill-server # I am asking you to stop vs kilall not asking, I'm telling
```
