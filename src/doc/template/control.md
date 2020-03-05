# 控件描述

## 控件注册
* 在src/config/control.js文件中引入控件
* 在src/config/control.js文件中导出控件
    >导出的对象中的名称就是将来在配置中引用的key

    ```javascript
    import { Login } from 'yes-platform';
    export default {
        Login
    }
    ```

    上面的例子就是从yes-platform中导出Login控件,然后导出成名称为Login的控件。

## 控件使用
>当前的模版方案中，控件可以在两个地方使用，一是在单据的控件描述中，二是在控件的第一层属性中。
* 控件描述中

     在模版配置中我们允许用户自己指定控件的属性，同时指定单据控件的渲染控件，在控件描述中如果指定了control这个属性，并且其中的值是控件注册中的合法控件，则系统会使用control这个属性对应的渲染控件来渲染当前的单据控件.

    ```javascript
        "AuditOpinion": {
            "control": "TextArea",
            "placeholder": "请输入审批意见",
            "autoHeight": true
        },
    ```
* 控件属性中

    在控件描述中，如果第一层的属性中type属性为element则，程序会读取当前属性中的elementType，作为控件的key，也就是说这个第一层的属性会被转化为一个React的Element.这个Element的类就是elementType这个属性对应的控件，属性则从elementProps中读取。

    ```javascript
        "AttachmentGrid": {
            "control": "TextGrid",
            "primaryKey": {
                "type": "element",
                "elementType": "PathText",
                "elementProps": {
                    "textLayouts": {
                        "fontWeight": "bold",
                        "fontSize": 16
                    },
                    "yigoid": "Path"
                }
            },
            "empty": "没有附件",
            "itemNumberOfLines": 2,
            "actions": [
                "Preview"
            ],
            "secondKey": [
                "UploadOperator",
                "UploadTime"
            ]
        },
    ```

## 控件列表
* TextGrid
    
* Timeline