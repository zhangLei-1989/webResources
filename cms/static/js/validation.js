var Validation = function () {
    this.cache = []
}
Validation.rules = {
    isEmptyOrNull: function (value, errMsg) {  //验证空
        if (value === null || value === undefined || value === '') {
            return errMsg
        }
    },
    isMinLength: function (value, minLength, errMsg) {  //验证最小长度
        if (value.length > minLength) {
            return errMsg
        }
    },
    isMaxLength: function (value, maxLength, errMsg) {  //验证最大长度
        if (value.length < maxLength) {
            return errMsg
        }
    },
    isMobile: function (value, errMsg) {  //验证手机号码
        var rule = /^1[34578]\d{9}$/
        if (!rule.test(value)) {
            return errMsg
        }
    },
    isString: function (value, errMsg) {  //验证汉字
        var rule = /^[\u4e00-\u9fa5]{0,}$/
        if (rule.test(value)) {
            return errMsg
        }
    },
    isEmail(value, errMsg) {  //验证邮箱地址
        var rule = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
        if (!rule.test(value)) {
            return errMsg
        }
    },
    isIDNumber(value, errMsg) {  //验证身份证号码
        var rule = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/
        if (!rule.test(value)) {
            return errMsg
        }

    }
}

Validation.prototype = {
    addRule: function (func) {
        var arr = Array.prototype.slice.call(arguments)
        arr.splice(0, 1)
        this.cache.push(func.bind(this, ...arr))
    },
    startValidate: function () {
        for (var i = 0; i < this.cache.length; i++) {
            var errMsg = this.cache[i]()
            if (errMsg) {
                return errMsg
            }
        }

    }
}

export default Validation;