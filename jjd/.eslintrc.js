module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  globals: {
    "document": true,
    "window": true,
    "navigator": true,
    "Image": true,
    "Blob": true,
    "URL": true,
    "wx": true,
  },
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
//    'arrow-parens': 0,
//    'indent': [2, 2, {'SwitchCase': 1}],
//    'spaced-comment': 0,
    'semi': [2, 'never'],
    'global-require': 0,
    'linebreak-style:': 0,
//    'quote-props': 0,
    'comma-dangle': 0,
    'no-underscore-dangle': 0,
    'space-before-function-paren': [2, 'always'],
//    'no-param-reassign': [2, {'props': false}],
//    'object-curly-spacing': 0,
//    'max-len': [1, 80, 4],
    'import/no-unresolved': 0,
    'no-mixed-operators': 0,
    'import/no-extraneous-dependencies': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
