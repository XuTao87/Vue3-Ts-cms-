export const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名',
      trigger: ['blur', 'change']
    },
    {
      pattern: /^[a-z0-9]{4,11}$/,
      message: '用户名必须是5-10个小写字母或者是数字',
      trigger: ['blur', 'change']
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: ['blur', 'change']
    },
    {
      pattern: /^[a-z0-9A-Z]{3,}$/,
      message: '密码必须是3位以上得字母或者是数字',
      trigger: ['blur', 'change']
    }
  ]
}
