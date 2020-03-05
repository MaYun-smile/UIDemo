# 写Component时常用的属性和方法

## props

通过this.props.** 可以获取很多属性和方法
 
 - formKey: string。想要获得fromKey，只需使用`this.props.formKey`。
 - oid: string。
 - gridId: string。只有表格控件才有此属性，表头控件没有此属性。
 - gridRow: number。只有表格控件才有此属性，表头控件没有此属性。
 - controlState,object。控件的state状态。`this.props.controlState`
 - getComponentState, function。获取控件的State状态的函数。`this.props.getComponentState()`
 - comp,object。 获取当前控件。`this.prps.comp`
 - getComponent, function。获取当前控件的函数。`this.props.getComponent(yigoid)`，参数为当前控件的`yigoid`。
 - onChange, function。控件的默认的`onChange`函数。`this.props.onChange(v)`,参数为`V`。
 - onClick, function。控件的默认的`onClick`函数。`this.props.onClick()`。
