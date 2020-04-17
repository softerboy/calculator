module.exports = {
  '!(*test).(js|ts)': [
    'pretty-quick --staged --pattern "**/*.*(js|jsx)"',
    'eslint --fix',
  ],
}
