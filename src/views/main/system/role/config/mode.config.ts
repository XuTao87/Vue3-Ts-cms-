import { IForm } from '@/base-ui/form'
export const modalConfig: IForm = {
  formItems: [
    {
      type: 'inpit',
      label: '角色名',
      rules: [],
      placeholder: '请输入角色名',
      field: 'name'
    },
    {
      type: 'inpit',
      label: '角色介绍',
      rules: [],
      placeholder: '请输入角色介绍',
      field: 'intro'
    }
  ],
  colLayout: {
    span: 24
  },
  itemStyle: {}
}
