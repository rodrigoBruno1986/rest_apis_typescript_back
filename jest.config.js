/** @type {import("jest").Config} **/
export default {
  testEnvironment: "node",
  preset: "ts-jest/presets/default-esm",
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.ts$": ["ts-jest", {
      useESM: true,
      tsconfig: "tsconfig.jest.json",
    }],
  },
  // moduleNameMapping: {
  //   "^(\\.{1,2}/.*)\\.js$": "$1",
  // },
  // Silenciar warnings
  silent: false,
  verbose: false,
};