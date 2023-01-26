export const contentTableConfig = {
  showIndexColum: false,
  showSelectColumen: false,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  propList: [
    {
      prop: 'name',
      label: '菜单名称',
      minWith: '100'
    },
    {
      prop: 'type',
      label: '级别',
      minWith: '100'
    },
    {
      prop: 'url',
      label: '菜单URL',
      minWith: '100'
    },
    {
      prop: 'icon',
      label: '图标icon',
      minWith: '100'
    },
    {
      prop: 'permission',
      label: '权限按钮',
      minWith: '100'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWith: '100'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWith: '100'
    },
    {
      prop: 'operation',
      label: '操作',
      minWith: '100'
    }
  ]
}
