# TextGrid
>是设计器中表格控件的渲染控件

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

## 属性
* primaryKey
    
    * type

        String | Control
    * 描述

        主内容，在显示的时候会加黑，字体稍大，在Cell中显示在最上方，当输入String的时候代表一个表格列的key,系统使用设计器中对应列的渲染设置进行渲染，如果需要使用其他渲染控件的话，则可以使用控件描述，上面的例子就是使用控件描述，primaryKey使用Path这个列，渲染控件使用PathText，elementProps则是PathText的属性。
* empty

    * type

        String | Control
    * 描述

        当没有数据的时候显示内容，可以是一个String也可以是一个控件描述
* itemNumberOfLines

    * type

        Number
    * 描述
        显示的行数，决定了每个行的高度
* actions

    * type
    
        Array(String)
    * 描述
        
        列key的数组，一般都是按钮列
* secondKey

    * type

        Array(String | Control)
    * 描述

        次内容，在显示的时候会加虚，字体稍小，在Cell中显示在主内容下方，当输入String的时候代表一个表格列的key,系统使用设计器中对应列的渲染设置进行渲染，如果需要使用其他渲染控件的话，则可以使用控件描述，上面的例子secondKey使用的是第一种，会显示两个列的数据

* leftElement

    * type
    
        Control

    * 描述

        行最左边的控件，一般用于显示图片

* rightElement

    ```javascript
            "rightElement": {
                "type": "element",
                "elementType": "ListRightElement",
                "elementProps": {
                    "firstline": "SumQuantityMW",
                    "firstlineprops": {
                        "format": "<%= displayValue %>(MW)"
                    },
                    "secondline": "Amount",
                    "secondlineprops": {
                        "format": "¥<%= displayValue %>(M)"
                    }
                }
            }
    ```

    * type
    
        Control

    * 描述

        行最右边的控件

