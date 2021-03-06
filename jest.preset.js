const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  setupFiles: ['jest-canvas-mock', 'jest-webextension-mock'],
  collectCoverage: true,
  coverageReporters: ['text', 'text-summary', 'html-spa'],
};
