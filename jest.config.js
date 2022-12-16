module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|sass)$': 'identity-obj-proxy',
  },
};