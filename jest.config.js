module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  verbose: false,
  collectCoverageFrom: [
    'src/**/*.{js,vue}'
  ],
  modulePathIgnorePatterns: ['src/rubya.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  moduleDirectories: ['node_modules', 'src']
}
