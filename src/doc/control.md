# 一般控件属性描述
> 这里所说的一般控件是指除了字典，Combo,List类(Gird,Gallery等复合数据控件)的其他简单控件.

*  disabled

    这个属性用于控制控件的可编辑性

* controlState

    这个属性用于传递控件的状态信息，这个对象是一个ImmutableJS的对象,一般控件的数据如下 

    ```javascript
        Immutable.fromJS({
            visible: this.visible,
            editable: this.editable,
            enable: this.enable,
            value: this.value,
            displayValue: this.text || this.value,
            required: this.required,
            loading: false,
            virtual: false
        })

    ```

    在控件开发中一般会比较关注virtual,value,loading属性这里的enable和上面的disabled属性是同一个来源,这个对象中的dispalyValue永远没有值，以后会被清除

* displayValue

    控件的显示值，这个属性决定了控件在界面上显示的内容

* onChange

    这是一个函数，当控件内容发生变化的时候调用

* onClick

    一个函数，当控件被点击的时候调用，如果控件不需要相应点击事件，就忽略这个属性

# 字典

* items

    字典可选内容的列表

    Javascript Array

    内容结构如下 

    ```javascript
    [{
        oid:10001,
        caption:'上海'
    },...]
    ```

* loading

    字典正在加载字典可选内容，也就是上面的items

* showPopup

    boolean类型，用于指定字典控件是否要显示字典选择界面

* onChangePopupState

    函数，当字典选择界面的状态(可见状态)改动的时候调用这个函数

    一个boolean型参数，显示-true,隐藏-false

* onQuery

    函数，当字典选择界面要进行过滤的时候调用

    一个字符型参数，过滤字符串

* onLoadMore

    函数，当需要加载更多字典项目的时候调用

    无参数

# Combobox

* items

    字典可选内容的列表

    JavaScript Array

    结构如下 

    ```javascript
    [{
        value:1001
        caption:'上海'
    },...]
    ```

* loading

    字典正在加载字典可选内容，也就是上面的items

* showPopup

    boolean类型，用于指定字典控件是否要显示字典选择界面

* onChangePopupState

    函数，当字典选择界面的状态(可见状态)改动的时候调用这个函数

 