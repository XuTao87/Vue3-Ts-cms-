type IFormtype = 'inpit' | 'password' | 'select' | 'datepicker'
export interface IFormItem {
  field: string
  type: IFormtype
  label: string
  rules?: any[]
  placeholder?: string
  options?: any[]
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemLayout?: any
  itemStyle?: any
}
