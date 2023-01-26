import { IForm } from '@/base-ui/form'
export const modalConfig: IForm = {
  formItems: [
    {
      type: 'inpit',
      label: '用户名',
      rules: [],
      placeholder: '请输入用户名',
      field: 'name'
    },
    {
      type: 'inpit',
      label: '真实姓名',
      rules: [],
      placeholder: '请输入真实姓名',
      field: 'realname'
    },
    {
      type: 'password',
      label: '密码',
      rules: [],
      placeholder: '请输入密码',
      field: 'password',
      isHidden: false
    },
    {
      type: 'inpit',
      label: '电话号码',
      rules: [],
      placeholder: '请输入电话号码',
      field: 'cellphone'
    },
    {
      type: 'select',
      label: '选择部门',
      rules: [],
      placeholder: '请选择部门',
      field: 'departmentId',
      options: []
    },
    {
      type: 'select',
      label: '选择角色',
      rules: [],
      placeholder: '请选择角色',
      field: 'roleId',
      options: []
    }
  ],
  colLayout: {
    span: 24
  },
  itemStyle: {}
}
