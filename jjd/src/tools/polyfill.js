/**
 * Created by hq5544 on 16/8/25.
 */
/* eslint-disable no-extend-native, prefer-rest-params, func-names, max-len */
export default {
  includes () {
    if (!Array.prototype.includes) {
      Array.prototype.includes = function (searchElement) {
        if (this == null) {
          throw new TypeError('Array.prototype.includes called on null or undefined')
        }

        const O = Object(this)
        const len = parseInt(O.length, 10) || 0
        if (len === 0) {
          return false
        }
        const n = parseInt(arguments[1], 10) || 0
        let k
        if (n >= 0) {
          k = n
        } else {
          k = len + n
          if (k < 0) {
            k = 0
          }
        }
        let currentElement
        while (k < len) {
          currentElement = O[k]
          if (searchElement === currentElement) { // NaN !== NaN
            return true
          }
          k += 1
        }
        return false
      }
    }
  }
}
/* eslint-enable no-extend-native, prefer-rest-params, func-names, max-len */
