# 模版模型
>所有的模版都定义在src/template目录下，每一个模版其实都是一个单据和一个配置文件的组合控件，单据的配置存放在src/config/billforms中，在渲染的时候会根据单据配置中指定的模版类型来确定模版控件。所有的模版都需要提供一个DynamicBillForm控件，可以从DynamicBillForm继承也可以，将DynamicBillForm渲染到模版下，一个模版中必须渲染一个DynamicBillForm.

## 模版开发流程
* 在tempalte下新增模版目录
* 在模版目录下开发模版控件
    >这里必须要注意，在模版导出文件的最后，需要加入模版的注册代码，需要调用defaultTemplateMapping.reg来进行注册

    ```javascript
    import defaultTemplateMapping from '../defaultTemplateMapping';
    ...
    defaultTemplateMapping.reg('tabs', WrappedTabTemplate);
    ```
* 在src/template/index.js中增加对于新模版控件的引用

