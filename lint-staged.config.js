module.exports = {
  '*.ts(x)': ['eslint', 'pretter --write', 'git add'],
  '.scss': ['stylelint --fix', 'git add']
}
