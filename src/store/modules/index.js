/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('.', false, /\.js$/)
let modules = []

files.keys().forEach(key => {
  if (key !== './index.js' &&
    key !== './token.js' &&
    key !== './contrato.js' &&
    key !== './dashboard.js' &&
    key !== './modal.js') {
    modules.push(key.replace('./', '').replace('.js', ''))
  }
})

export default modules
