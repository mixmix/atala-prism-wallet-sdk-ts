## Setup

- add `"stream": "npm:stream-browserify@3.0.0",`
- `npm install events buffer assert util`
- `npm install babel-plugin-module-resolver`
- `npm install stream-browserify @craftzdog/react-native-buffer react-native-quick-crypto react-native-quick-base64`
- 
- add `Buffer` to `window`
- local SDK dependency works with `yarn`, not with `npm`


- npx expo start --clear 
- npx create-expo-app rn-wallet --template expo-template-tabs-typescript@46
- npx expo run:android - after npx expo prebuild
- Gradle version should be less than 7.3.*
  - could be required to sync gradle version in Android studio!
- `import "crypto";` had to be added to project root 
- no BigInt support until RN 0.70, but crypto polyfill doesn't work with 0.71
- https://github.com/margelo/react-native-quick-crypto
  - works only with RN 0.70 (<0.70 doesn't support BigInt, 0.71 changed node_modules/react-native/android)
    - open bug - https://github.com/margelo/react-native-quick-crypto/issues/143
- crypto-browserify doesn't implement `randomBytes`, so not an option


