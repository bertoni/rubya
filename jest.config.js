module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverageFrom: [
    'src/**/*.{js,vue}'
  ],
  modulePathIgnorePatterns: [
    'src/plugin.js',
    'src/main.js',
    'src/App.vue'
  ]
}
