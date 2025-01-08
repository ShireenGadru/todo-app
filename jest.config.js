export default {
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom/"],
  moduleNameMapper: {
    "^.+\\.css$": "identity-obj-proxy", // Correct regular expression
  },
};
