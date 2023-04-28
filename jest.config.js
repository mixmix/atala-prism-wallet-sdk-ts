import { pathsToModuleNameMapper } from 'ts-jest'
import tsconfig from './tsconfig.json' assert {type: 'json'}
// import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig = {
  preset: 'ts-jest',
  extensionsToTreatAsEsm: ['.ts'],
  roots: ['<rootDir>'],
  modulePaths: [tsconfig.compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { useESM: true }),
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  testMatch: ["**/tests/**/*.test.ts"]
};

export default jestConfig