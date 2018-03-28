var emailRegExp = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
var phoneRegExp = /^1[0-9]{10}$/
// 登录密码 长度至少8位
var passwordLengthRegExp = /^\w{8,}$/
// 登录密码 必须且只能包含数字大小写字母
var passwordRegExp = /(?:\d[a-zA-Z])|(?:[a-zA-Z]\d)/
// 注册密码 长度不小于8位，必须包含至少一个大写字母一个小写字母和一个数字
var registerpPasswordRegExp = /(?!(^[^a-z]+$))(?!(^[^A-Z]+$))(?!(^[^\d]+$))^[\w`~!#$%\\\\^&*|{};:\',\\/<>?@]{8,}$/
// 重置主机密码
const hostPassword = /(?!^([\da-z]+|[\dA-Z]+|[a-zA-Z]+)$)^[\w]{6,}$/
export default{
  emailVail: (email) => {
    return emailRegExp.test(email) || phoneRegExp.test(email);
  },
  phoneVail: (phone) => {
    return phoneRegExp.test(phone);
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
  // 用于校验主机密码
  hostPassword: (password) => {
    if (!hostPassword.test(password)) {
      return false
    }
    return true
  }
}
