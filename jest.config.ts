import type { Config } from 'jest';
const config: Config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  setupFiles: ['<rootDir>/setupTest.ts'],
  testEnvironment: 'jest-environment-node',
  collectCoverageFrom: ['src/**/*.test.{ts,tsx}'],
  coveragePathIgnorePatterns: [
    '<rootDir>/generated/',
    '<rootDir>/node_modules/',
  ],
};
export default config;
