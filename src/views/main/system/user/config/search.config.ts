import { IFormItem, IForm } from '@/base-ui/form'
export const formConfig: IForm = {
  labelWidth: '120px',
  itemLayout: {
    padding: '10px 20px'
  },
  formItems: [
    {
      type: 'inpit',
      label: 'id',
      rules: [],
      placeholder: '请输入id',
      field: 'id'
    },
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
      placeholder: '请输入真实姓名',
      field: 'realname'
    },
    {
      type: 'inpit',
      label: '手机号',
      placeholder: '请输入手机号',
      field: 'cellphone'
    },
    {
      type: 'datepicker',
      label: '创建时间',
      placeholder: '请选择创建时间范围',
      field: 'createAt',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
