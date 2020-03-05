# 单据定义
>单据定义其实定义的是单据的渲染过程，包括布局和控件，如果没有指定单据的配置，则系统会使用设计器中配置的布局方案。

## 默认配置
在src/config/billforms目录下有一个default.json文件，这个文件的主要功能是定义了所有单据的默认配置或者也可以用与设置所有单据公用的属性。上面说到的，没有指定单据配置的情况下，使用设计器布局就是通过在default.json中指定formTemplate为dynamic来实现的。

## 单据配置

### 引入
* 新增单据定义文件

    在src/config/billforms目录下，新增单据定义文件，建议使用单据的formKey作为文件名。
* 引入单据定义文件

    在src/config/billforms/index.js中引入第一步新增的单据定义文件，并且导出，导出的key必须是单据的formKey

```javascript
import defaultForm from './default.json';
import B_ERPAccAuzChgApp from './B_ERPAccAuzChgApp.json';
import TSL_ToDoList from './TSL_ToDoList.json';
import B_FrmContrCN from './B_FrmContrCN.json';
import B_LeaveApplication from './B_LeaveApplication.json';
import B_PayApplication from './B_PayApplication.json';
import OA_TransferTask from './OA_TransferTask.json';

export default {
    default: defaultForm,
    TSL_ToDoList,
    B_ERPAccAuzChgApp,
    B_FrmContrCN,
    B_LeaveApplication,
    B_PayApplication,
    OA_TransferTask,
};

```

## 单据配置描述
* formTemplate

    这个属性指定了单据使用的单据模版，值是在src/template中导出的类的key
* 其他属性
    
    其他所有属性都是与formTemplate对应的模版匹配的。

## 单据模版列表
* dynamic
* tab
* modal