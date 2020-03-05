# 模版开发文档
## 目录结构
```
|-config
|    |-(webpack.config)
|-src
|    |-config
|    |   |-control.js
|    |   |-initialPage.js
|    |   |-login.js
|    |   |-project.js
|    |-controls
|    |-template
|    |-util
|    |-config.js
|    |-DynamciView.js
|    |-FieldView.js
|    |-index.js
|    |-TemplateView.js
|    |-WorkitemView.js
|-.babelrc
|-
```

## 开发步骤
### 配置项目服务器信息
>修改src/config/project.json文件,这个文件返回一个json对象，包含三个信息

* sessionKey
    >用于确定当前应用的session前缀，必须是唯一的，否则两个应用将无法在一个页面中同时使用
* serverPath
    >YIGO2的服务器地址
* appName
    >这个暂时没用，Native应用的app名称

```javascript
{
    "sessionKey": "thgn",
    "serverPath":"http://192.168.123.7:8089/yigo",
    "appName": "yesdemo"
}
```

### 配置登录界面信息
>登录界面是用户可以扩展开发的，系统自带了一个Login实现，名字就叫Login，定义在src/config/control.js中,登录界面的配置在src/config/login.json中。

* template
    > 这个属性指定了登录界面对应的控件名称，名称必须在control.js中定义
* 其他
    >除了template这个属性意外的所有属性都会被作为props传送给template属性对应的控件

```javascript
{
    "template": "Login",
    "tooltip": "欢迎登录天和光能",
    "companyName": "Copyright © 常州天合光能有限公司",
    "bgImagePath":"./img/login_bg.jpg",
    "logoImagePath": "./img/logo.png"
}
```

### 首页定义
>首页的定义保存在src/config/initialPage.json中 

* type
    >定义了当前首页的模式，当前版本只支持tab(底部Tab导航)
* 其他配置
    >根据type不同会有不同的属性，如果是tab，需要一个tab属性

```javascript
{
    "type":"tab",
    "tab":[{
        "formKey": "TSL_ToDoList",
        "title": "待办",
        "key": "TodoList",
        "headerRight": true
    },{
        "formKey": "MOA_Employee",
        "title": "我的",
        "key": "My",
        "headerRight": true
    }]
}
```

### 单据配置
>如果没有对单据进行额外的配置，将会使用单据设计器中的布局进行渲染(暂时没有全部支持,只支持手机设计器设计的单据),单据配置建议存放在src/config/billforms目录下

1. 新增一个和单据metaKey同名的js文件
2. 在src/config/billforms/index.js中增加对新增文件的引入
    >这里需要注意index.js导出的key必须是单据的metaKey,文件名并不是强求的，只是为了以后检索方便，建议使用metaKey作为文件名

### 控件扩展
>系统中很多地方提供了控件的扩展，如果对于默认的渲染方式不满意，可以自己定制项目特有的控件，系统中有一个src/config/control.js文件，这个文件负责定义所有扩展用的控件，包括了之前的登录界面，这个导出的key就是以后用到该控件时候的名称。