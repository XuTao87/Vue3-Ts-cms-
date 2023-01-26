import { IFormItem, IForm } from '@/base-ui/form'
export const formConfig: IForm = {
  labelWidth: '120px',
  itemLayout: {
    padding: '10px 20px'
  },
  formItems: [
    {
      type: 'inpit',
      label: '权限介绍',
      placeholder: '请输入权限介绍',
      field: 'intro'
    },
    {
      type: 'datepicker',
      label: '创建时间',
      placeholder: '请选择创建时间范围',
      field: 'createTime',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ]
}
