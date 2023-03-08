## Setup

- add `"stream": "npm:stream-browserify@3.0.0",`
- `npm install events buffer assert util`
- add `Buffer` to `window`
- local SDK dependency works with `yarn`, not with `npm`


- npx expo start --clear 
- npx create-expo-app rn-wallet --template expo-template-tabs-typescript@46
- npx expo run:android - after npx expo prebuild
- Gradle version should be less than 7.3.*
  - could be required to sync gradle version in Android studio!
- `import "crypto";` had to be added to project root 


