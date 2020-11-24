module.exports = {
  displayName: 'any-color',
  preset: '../../jest.preset.js',
  setupFiles: [
    '<rootDir>/src/test-setup.ts',
    'jest-canvas-mock',
    'jest-webextension-mock',
  ],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/any-color',
};
