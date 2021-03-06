const emailRegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
const phoneRegExp = /^1[0-9]{10}$/
// 登录密码 长度至少8位
const passwordLengthRegExp = /^\w{8,}$/
// 登录密码 必须且只能包含数字大小写字母
const passwordRegExp = /(?:\d[a-zA-Z])|(?:[a-zA-Z]\d)/
// 注册密码 长度不小于8位，必须包含至少一个大写字母一个小写字母和一个数字
const registerpPasswordRegExp = /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w`~!#$%_()^&*,-<>?@.+=]{8,}$/
// 重置云服务器密码
const hostPassword = /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w~*:,]{8,30}$/
// 身份证号码验证
const IDCardRegExp = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
const idCardRegExp = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/
// 营业执照
const val = '/(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/';
const DomainRegExp = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/

//var passwordRegExp = /ddd/;
export default {
  emailVail: (email) => {
    return emailRegExp.test(email) || phoneRegExp.test(email);
  },
  phoneVail: (phone) => {
    if (phoneRegExp.test(phone)){
      return true;
    } else {
      return false;
    }  
  },
  passwordVail: (password) => {
    if (!passwordLengthRegExp.exec(password)) {
      return false
    }
    if (!passwordRegExp.exec(password)) {
      return false
    }
    return true;
  },
  IDCardVail: (idCard) => {
    if (IDCardRegExp.test(idCard) || idCardRegExp.test(idCard)) {
      return true
    }
    return false
  },
  registerPasswordVail: (password) => {
    if (!registerpPasswordRegExp.test(password)) {
      return false
    }
    return true
  },
  validaRegisteredName: (rule, value, callback) => {
    if (!value) {
      return callback(new Error('输入名称不能为空'));
    }
    if ((/[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(value)) || (/[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im.test(value)) || (/\s+/.test(value))) {
      callback(new Error('输入名称中不能包含特殊字符或空格'));
    } else {
      callback()
    }
  },
  validaSinginName: (rule, value, callback) => {
    if (!value) {
      return callback(new Error('密码不能为空'))
    }
    if (!passwordLengthRegExp.test(value) || !passwordRegExp.test(value)) {
      callback(new Error('必须且只能包含数字大小写字母,长度至少为8位'))
    } else {
      callback()
    }
  },
  // 用于校验云服务器密码
  hostPassword: (password) => {
    if (!hostPassword.test(password)) {
      return false
    }
    return true
  },

  // 用于校验网站域名
  validaDomain: (domain) => {
    if (DomainRegExp.test(domain)) {
      return true
    }
    return false
  }
}
