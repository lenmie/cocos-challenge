# Cocos Challenge - Expo managed React Native App

you can download the apk from here -> https://loadly.io/5MkiMcOD

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone git@github.com:lenmie/cocos-challenge.github
   ```

2. Navigate to the project directory:
   ```bash
   cd cocos-challenge
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

4. Set up Android device or emulator:
   - Connect an Android device via USB with USB debugging enabled, or
   - Set up an Android emulator using Android Studio

5. Set up port forwarding for Metro bundler:
   ```bash
   adb reverse tcp:8081 tcp:8081
   ```

6. Run the Android app:
   ```bash
   yarn android
   ```

