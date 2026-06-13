# sg-med

## Useful commands

### Development

List all devices connected to adb

```sh
adb devices
```

Shut down the adb server nicely (if not, there's always `killall` 🤷)

```sh
adb kill-server
```

### Release

#### APK

```sh
npm run build-apk # OR
npm run build-apk-local # if you don't want to use EAS/cloud
```

#### AAB, the bane of my existence

Assuming `android/gradlew` has executable permission: `npm run build-aab`, which is just:

```sh
cd android/
./gradlew app:bundleRelease
```

I _almost_ have [CNG](https://docs.expo.dev/workflow/continuous-native-generation/) sorted - including an `aab` config in `eas.json` - but I haven't figured out how to configure local signing credentials for a local build working with it. If I delete the `android/` folder and have the keystore and `credetnials.json` specified, I currently get:

```
[RUN_GRADLEW] FAILURE: Build completed with 3 failures.
[RUN_GRADLEW] 1: Task failed with an exception.
[RUN_GRADLEW] -----------
[RUN_GRADLEW] * What went wrong:
[RUN_GRADLEW] Execution failed for task ':app:lintVitalAnalyzeRelease'.
[RUN_GRADLEW] > A failure occurred while executing com.android.build.gradle.internal.lint.AndroidLintWorkAction
[RUN_GRADLEW]    > Internal error: Unexpected lint invalid arguments
[RUN_GRADLEW] * Try:
[RUN_GRADLEW] > Run with --stacktrace option to get the stack trace.
[RUN_GRADLEW] > Run with --info or --debug option to get more log output.
[RUN_GRADLEW] > Run with --scan to get full insights.
[RUN_GRADLEW] > Get more help at https://help.gradle.org.
[RUN_GRADLEW] ==============================================================================
[RUN_GRADLEW] 2: Task failed with an exception.
[RUN_GRADLEW] -----------
[RUN_GRADLEW] * What went wrong:
[RUN_GRADLEW] Execution failed for task ':app:mergeReleaseNativeLibs'.
[RUN_GRADLEW] > A failure occurred while executing com.android.build.gradle.internal.tasks.MergeNativeLibsTask$MergeNativeLibsTaskWorkAction
[RUN_GRADLEW]    > No space left on device
[RUN_GRADLEW] * Try:
[RUN_GRADLEW] > Run with --stacktrace option to get the stack trace.
[RUN_GRADLEW] > Run with --info or --debug option to get more log output.
[RUN_GRADLEW] > Run with --scan to get full insights.
[RUN_GRADLEW] > Get more help at https://help.gradle.org.
[RUN_GRADLEW] ==============================================================================
[RUN_GRADLEW] 3: Task failed with an exception.
[RUN_GRADLEW] -----------
[RUN_GRADLEW] * What went wrong:
[RUN_GRADLEW] java.nio.file.FileSystemException: /home/sienf/.gradle/.tmp/problems-report14582795354858060236.html -> /tmp/sienf/eas-build-local-nodejs/931b55fb-3094-4b2d-a222-e5f824d04794/build/android/build/reports/problems/problems-report.html: No space left on device
[...]

```

despite loooads of free space in both the partition the project is in as well as `/tmp`. But calling gradle directly as above has no issues at all, as long as it's configured. Idk, answer is probably to get a CNG plugin to set up code signing, such that it gets generated equivalent to current using `prebuild` and then skipping EAS and just using prebuild & gradle 🤷
