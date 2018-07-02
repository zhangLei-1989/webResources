/**
 * Created by hq5544 on 16/3/30.
 * vue-validator 的验证规则和提示文字
 */
import {
  alert
} from '../tools/utils'

export const validRules = {
  account: {
    minlength: {
      rule: 4,
      message: '请输入您的登录帐号'
    }
  },
  username: {
    minlength: {
      rule: 2,
      message: '请输入姓名'
    }
  },
  address: {
    required: {
      rule: true,
      message: '请输入详细地址'
    }
  },
  housearea: {
    required: {
      rule: true,
      message: '请输入房屋面积'
    }
  },
  cartypes: {
    required: {
      rule: true,
      message: '请输入车辆型号'
    }
  },
  comname: {
    required: {
      rule: true,
      message: '请输入公司名称'
    }
  },
  position: {
    required: {
      rule: true,
      message: '请输入工作职位'
    }
  },
  price: {
    required: {
      rule: true,
      message: '请输入价格'
    }
  },
  havepay: {
    required: {
      rule: true,
      message: '请输入已支付金额'
    }
  },
  pics: {
    required: {
      rule: true,
      message: '请上传图片'
    }
  },
  income: {
    required: {
      rule: true,
      message: '请输入月收入'
    }
  },
  bankCard: {
    minlength: {
      rule: 12,
      message: '请输入 12 - 19 位银行卡号'
    },
    maxlength: {
      rule: 19,
      message: '请输入 12 - 19 位银行卡号'
    }
  },
  phone: {
    reg: {
      rule: /^1[3|4|5|7|8][0-9]{9}$/,
      message: '请输入正确的手机号'
    }
  },
  password: {
    minlength: {
      rule: 6,
      message: '请输入 6 - 20 位密码'
    },
    maxlength: {
      rule: 20,
      message: '请输入 6 - 20 位密码'
    }
  },
  payPassword: {
    minlength: {
      rule: 6,
      message: '请输入 6 位交易密码'
    },
    maxlength: {
      rule: 6,
      message: '请输入 6 位交易密码'
    }
  },
  searchPwd: {
    minlength: {
      rule: 6,
      message: '请输入 6 位查询密码'
    },
    maxlength: {
      rule: 6,
      message: '请输入 6 位查询密码'
    }
  },
  code: {
    required: {
      rule: true,
      message: '您输入的验证码有误'
    }
  },
  idcard: {
    length: {
      rule: 18,
      message: '请输入 18 位身份证号'
    }
  },
  wxAccount: {
    required: {
      rule: true,
      message: '请输入您的微信号码'
    }
  },
  contactName: {
    minlength: {
      rule: 2,
      message: '请输入联系人的姓名'
    }
  },
  contactPhone: {
    reg: {
      rule: /^1[3|4|5|7|8][0-9]{9}$/,
      message: '请输入正确的联系人手机号'
    }
  },
  xueli: {
    textNotEq: {
      rule: '--请选择--',
      message: '请选择您的学历'
    }
  },
  jobPhone: {
    required: {
      rule: true,
      message: '请输入公司电话'
    }
  },
  picCode: {
    required: {
      rule: true,
      message: '请输入验证码'
    }
  },
  userCode: {
    required: {
      rule: true,
      message: '请输入身份验证码'
    }
  }
}

export const validators = {
  eq (val, target) {
    return parseInt(val, 10) === parseInt(target, 10)
  },
  atLeast (val, target) {
    return parseInt(val, 10) >= parseInt(target, 10)
  },
  length (val, target) {
    return val.length === parseInt(target, 10)
  },
  required (val) {
    return !!val
  },
  minlength (val, target) {
    return val.length >= parseInt(target, 10)
  },
  maxlength (val, target) {
    return val.length <= parseInt(target, 10)
  },
  textNotEq (val, target) {
    return val !== target
  },
  reg (val, target) {
    return !!val.match(target)
  }
}

export function toValidate (cb) {
  // 手动验证
  const that = this
  this.$validate(true, () => {
    if (that.$validator.invalid) {
      const errorsList = that.$validator.errors.reverse()
      let errors = ''
      errorsList.forEach((i) => {
        if ({}.hasOwnProperty.call(i, 'message')) {
          errors += `${i.message}<br>`
        }
      })
      alert(errors)
    } else {
      cb()
    }
  })
}
