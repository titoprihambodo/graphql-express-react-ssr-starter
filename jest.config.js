module.exports = {
  // jest config/options here: https://jestjs.io/docs/en/configuration
  clearMocks: true,
  collectCoverageFrom: ['**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'json', 'jsx'],
  setupFiles: ['<rootDir>/enzyme.config.js'],
  // testEnvironment: 'jsdom',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.style+\\.css$': '<rootDir>/node_modules/jest-css-modules',
    '^.+\\.css$': '<rootDir>/node_modules/jest-transform-css',
  },
  verbose: true,
}