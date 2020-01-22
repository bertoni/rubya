module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}'
  ],
  modulePathIgnorePatterns: [
    'src/plugin.js',
    'src/main.js',
    'src/App.vue'
  ]
}
