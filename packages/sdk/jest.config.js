/* eslint-disable */
const { readFileSync } = require('fs');

// Reading the SWC compilation config and remove the "exclude"
// for the test files to be compiled by SWC
const { exclude: _, ...swcJestConfig } = JSON.parse(
  readFileSync(`${__dirname}/.swcrc`, 'utf-8'),
);

// disable .swcrc look-up by SWC core because we're passing in swcJestConfig ourselves.
// If we do not disable this, SWC Core will read .swcrc and won't transform our test files due to "exclude"
if (swcJestConfig.swcrc === undefined) {
  swcJestConfig.swcrc = false;
}

// Uncomment if using global setup/teardown files being transformed via swc
// https://nx.dev/packages/jest/documents/overview#global-setup/teardown-with-nx-libraries
// jest needs EsModule Interop to find the default exported setup/teardown functions
// swcJestConfig.module.noInterop = false;

module.exports = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  coveragePathIgnorePatterns: ['__tests__', '/node_modules/'],
  coverageProvider: 'v8',
  coverageReporters: ['cobertura', 'clover', 'json', 'lcov', 'text'],
  globals: {
    __DEV__: true,
    __TEST__: true,
    __BROWSER__: false,
    __VERSION__: '"unknow"',
  },
  preset: 'ts-jest',
  transformIgnorePatterns: [
    // Change MODULE_NAME_HERE to your module that isn't being compiled
    '/node_modules/(?!((@byted/garfish-)|(byted-tea-sdk))).+\\.js$',
  ],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', swcJestConfig],
  },
  rootDir: __dirname,
  testMatch: ['<rootDir>__tests__/**/**.spec.[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
};
