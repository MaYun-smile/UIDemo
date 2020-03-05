# 教程
    本教程将向大家展示如何在yigo2的配置基础上完成webapp和微信应用的开发。
    本教程使用的配置是yigo2的demo配置。
    本教程将完成如下一些功能：
    - 目标平台是微信
    - 序时簿类单据的手机展现
    - 明细单据的手机展现
    - 支持一些本地资源的调用(摄像头)      

## 准备工作
* yigo2服务器

    请下载最新的yigo2服务器，当前不需要运行专门的手机用服务端，使用支持web端的ygio2服务器就可以
* yigo2服务器端改动

    由于需要跨域进行服务器服务访问，所以yigo2的服务器端必须要进行一些调整以支持跨域请求，不同的appServer跨域请求的支持都是不一样，以tomcat为例，对于tomcat7.0以后的版本，是直接支持跨域配置的[参考](https://tomcat.apache.org/tomcat-7.0-doc/config/filter.html)，对于之前的版本可以使用第三方的包来完成跨域支持，比如[这个](http://software.dzhuvinov.com/cors-filter-installation.html)
* 配置使用yigo2的演示配置demo
* 开发的机器需要安装nodejs和npm

    请安装最新版本的nodejs,npm会在安装nodejs的时候自动安装

## 开始
>请先确保yigo2的服务器可以正常访问，直接在浏览器中打开yigo2的web版本路径，保证页面可以正常打开，功能可以正常使用。

### 安装webapp的开发环境
    webapp的开发环境可以通过[svn](http://1.1.2.17:8000/svn/yes/webapp/src)进行下载，在完成下载之后，目录下会有如下一些目录
* app
 
    这个目录是给用户存放开发配置的，基本上用户开发的代码都会放在这个目录下，注意用户开发的js如果使用ES6的语法则必须放到这个目录下，否则会出错
* js

    这个目录是框架代码所在的目录，一般不需要在这个目录中开发代码，这个目录只在引用功能时使用。

* 根目录

    这个目录下包含了一些配置配置文件，用于支持npm,ES6,gulp等打包用的功能。

>运行npm install 命令，这个命令会从网上下载一大堆第三方的依赖包，时间会比较长，但是由于只在第一次使用的时候需要执行一次，所以还是忍耐一下。

### 应用框架搭建
>就是让应用跑起来的最小配置，这里主要会涉及到两个文件
* 根目录下的entry.js

    这个文件是应用的根文件，文件名不能修改，在这个文件中会创建一个App对象，并且启动这个对象。

```javascript
'use strict';
import FastClick from 'fastclick';
import App from './app/scm'

function onDeviceReady(){
    FastClick.attach(document.body);
    App.start(document.getElementById('app'));
}

if (window.cordova) {
    document.addEventListener("deviceready", onDeviceReady, false);
} else {
    onDeviceReady();
}
```

>一般的形式就是象上面的代码一样，最主要就是需要加载一个App对象，并且调用这个对象的start方法

* 在app目录下的App对象文件

    这个文件名称可以任意，主要就是在entry.js中进行引用，这个文件需要返回一个App对象，在我们的教程中使用如下的代码形式
```javascript
'use strict';

import { WebApp } from '../js'
import config from './config'

export default new WebApp(config);
```
    我们可以把App的配置信息直接写到这个文件中，也可以独立存放一个文件，教程中是单独存放在config.js中
```javascript
'use strict';
import { WebComponents } from '../js'
import Home from './home'
import PutawayView from './PutawayView'
import ReceiptView from './ReceiptView'
import Receipt from './Receipt'
// import Putaway from './Putaway'
import {Router,Route,IndexRoute,DefaultRoute,IndexRedirect } from 'react-router'
import React from 'react'

var { AppLayout } = WebComponents;

var appOptions = {
    sessionKey:'demo',
    supportWechat:true,
    wechatOptions:{
        appId:'wx739b9f74ab475e99',
        proxyServer:'http://1.1.8.34:4001'
    },
    serverPath:'http://192.168.1.116:8089/yigo'//yigo的服务地址
};

appOptions.routes = (
    <Route name="app" path="/" component={AppLayout}>
        <IndexRedirect to="home/ReceiptView"/>
        <Route name="home" path="home" component={Home}>
            <Route path="ReceiptView" component={ReceiptView} />
            <Route path="PutawayView" component={PutawayView} />
        </Route>
        <Route path="Receipt/:id" component={Receipt} />
    </Route>
);

export default appOptions;
```

### 应用配置
#### app对象配置
    app对象就是传递给App初始化的对象，在当前版本下有如下几个比较重要的属性
* sessionKey

    系统保存用于sessionID的标识,在cordova中不能使用cookie(最新版本中已经支持),所以系统中吧sessionID保存在localStorage中，为了防止多个应用产生冲突，所以这里需要指定一个唯一的应用标识

* serverPath

    yigo2的服务器地址，这个地址要和yigo2服务的licence文件中的访问地址一样，否则在调用yigo2服务的时候会出现地址和端口不一致的错误。

* wechat相关配置

    如果应用需要支持wechat则，需要使用这组属性，appId是向微信申请的应用Id，proxyServer是现在系统要求的中转服务器地址(yigo2暂时还没有支持微信登陆的方案，所以我们开发了一个独立的中转登录服务器，来完成微信的认证)

* routes

    react-router的route结构，使用jsx语法，[官方网站](https://github.com/reactjs/react-router)

#### 路由
>每一个路由都会对应一个React Component(也就是我们后面会开发的单据对象，在实际开发过程中一个单据就是一个React Component)上面配置的意思基本上一看就能看懂，下面稍微说明一下

```xml
    <Route name="app" path="/" component={AppLayout}>
```
    根路由，也就是没有任何参数和路径的时候系统使用的路由

```xml
    <IndexRedirect to="home/ReceiptView"/>
```
    根路径重定向，这个路由配置说明在没有路径的时候，系统会自动跳转到#home/ReceiptView这个路径上

```xml
    <Route name="home" path="home" component={Home}>
```
    定义了一个home路径,path是#home,对应的对象是Home

```xml
    <Route path="ReceiptView" component={ReceiptView} />
```
    定义了一个ReceiptView路径,path是#home/ReceiptView,对应的对象是ReceiptView,这里由于是放在home路径下的所以匹配的是home/ReceiptView而不是#ReceiptView

```xml
    <Route path="Receipt/:id" component={Receipt} />
```
    定义了Receipt路径，匹配的路径是#Receipt/XXX，对应的对象是Receipt,这个路径是在根路径下的，所以匹配的时候是直接#Receipt开头的，这里的":id"是一个变量定义如果访问的路径是#Receipt/1001,那么id就是1001,在对象的this.props.location.params.id中可以得到。

>   这里的Receipt的名字必须和单据的Key保持一致

### 配置序时簿单据
>序时簿单据本身和后面提到的明细单据在配置上没有大的差别，只是在yigo中，这两种单据的差别比较明显，所以这里分开进行说明。所谓的叙事簿类单据，一般都包含一个列表，一些查询条件字段，一个查询按钮或者一些toolbar按钮。

    我们以ReceiptView为例说明
```javascript
'use strict';

import React,{ Component } from 'react'
import { WebComponents } from '../js'
import { ButtonArea,CellsTitle,Cells,Cell,CellHeader,CellBody,CellFooter } from 'react-weui'

var { BarcodeScanText,BillForm,Button,List,GridRow,Nav,Text,Dict,Wechat } = WebComponents;

class ReceiptView extends Component {
    state={
        showFilter:false
    }

    listTemplate(listitem){
        return (
            <GridRow title={listitem.getIn(['RH_RECEIPT_NO_LV','caption'])}
                summary = {[listitem.getIn(['RH_OWNER_ID_LV','caption']),
            listitem.getIn(['RH_RECV_DATETIME_LV','caption'])]}
                ></GridRow>
            )
    }

    onFilterClick(){
        this.setState({
            showFilter:!this.state.showFilter
        })
    }

    onQueryClick(){
        this.setState({
            showFilter:false
        })
    }

    getFilter(){
        return (
        <div className="flex-1 flexbox flex-dir-col">
            <Cells>
                <BarcodeScanText label="收货单号" yigoid="RH_RECEIPT_NO"/>
                <Dict label="货主" yigoid="RH_OWNER_ID"/>
                <Dict label="供应商" yigoid="RH_VENDOR_ID"/>
            </Cells>
            <Button onClick={()=>this.onQueryClick()} yigoid="Query">确定</Button>
        </div>);
    }

    getList(){
        var { children, ...other } =this.props;
        return (
            <List {...other} className="flex-1" template={this.listTemplate} yigoid="list"></List>
        )
    }

    render(){
        var { children, ...other } =this.props;
        var Content = this.state.showFilter?this.getFilter():this.getList();
        return (
            <BillForm formKey="ReceiptView" entry="StockOut" className="fittoparent flexbox flex-dir-col">
                <Nav.Navbar>
                    <Nav.NavTitle>收货单列表</Nav.NavTitle>
                    <Nav.NavToolbarItem yigoid="main_toolbar" optKey="New" float="right"><i className="fa fa-pencil-square-o"></i></Nav.NavToolbarItem>
                    <Nav.NavItem float="right" onClick={(e)=>this.onFilterClick(e)}><i className="fa fa-filter"></i></Nav.NavItem>
                </Nav.Navbar>
                {Content}
            </BillForm>
            )
    }
}

export default ReceiptView
```

    其中核心的部分是这段
```javascript
<BillForm formKey="ReceiptView" entry="StockOut" className="fittoparent flexbox flex-dir-col">
    <Nav.Navbar>
        <Nav.NavTitle>收货单列表</Nav.NavTitle>
        <Nav.NavToolbarItem yigoid="main_toolbar" optKey="New" float="right"><i className="fa fa-pencil-square-o"></i></Nav.NavToolbarItem>
        <Nav.NavItem float="right" onClick={(e)=>this.onFilterClick(e)}><i className="fa fa-filter"></i></Nav.NavItem>
    </Nav.Navbar>
    {Content}
</BillForm>
```
    对于开发人员来说BillForm这个对象是系统框架自带的，使用方法非常简单，只需要指定两个参数formKey和entry,然后从配置上可以非常简单的看出来，单据由一个导航条，这个导航条有一个title收货单列表，并且有两个按钮，新增(main_toolbar这个工具条上的一个按钮)和过滤一个自定义按钮，用于显示包含过滤条件部分的单据内容。单据的主体部分是Content。具体控件的使用方法，请参考控件的详细文档。

### 配置明细单据
>明细单据主要特点是一般支持编辑，界面上以控件为主组成

```javascript
'use strict';
import React,{ Component } from 'react'
import { CellsTitle,Cells,Cell,CellHeader,CellBody,CellFooter,
    Button,Dialog,Input } from 'react-weui'
import { WebComponents,FormStore,Util } from '../js'
import JSON5 from 'json5'
import wx from '../js/lib/yes/components/wechat/wechat.config'

var { Login,BillForm,Text,Dict,Combobox,Date,
    Grid,GridRow,Link,VirtualGrid,Nav,TabGroup,AuthenticatedRoute } = WebComponents;

class Receipt extends Component {
    state={
        show:false,
        scrollToIndex:0
    }

    productTemplate(rowdata,index){
        return (
            <GridRow title={Util.getCellData(rowdata,'RL_MATERIAL_ID')}
                summary = {[Util.getCellData(rowdata,'RL_RECV_QTY') + ' ' + 
                            Util.getCellData(rowdata,'RL_RECV_UNIT')]}
                ></GridRow>
            )
    }

    async onScanMaterial(){
        var billForm = FormStore.getBillForm('Receipt',this.props.params.id);
        var comp = billForm.getComponent('ReceipDtl');
        if(comp.isEnable()){
            var lastRowIndex = comp.getRowCount()-1;
            await comp.setValueByKey(lastRowIndex, 'RL_MATERIAL_ID', this.state.scanMaterial, true, true);
            await comp.setValueByKey(lastRowIndex, 'RL_RECV_QTY', this.state.quantity || 0 , true, true);
        }
    }

    onBarcodeScan(data){
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: (res) =>{
                var resultStr = res.resultStr;
                console.log(resultStr);
                try{
                    var materialData = JSON5.parse(resultStr);
                    var billForm = FormStore.getBillForm('Receipt',this.props.params.id);
                    var comp = billForm.getComponent('ReceipDtl');
                    var index = comp.findRowIndex((item)=>item.getIn(['data',3,1])=="00010010 2006进口长袖工衣/0#");
                    if(comp.isEnable() && index<0){
                        this.setState({
                            scanMaterial:materialData,
                            show:true
                        })
                    }else{
                        this.setState({
                            scrollToIndex:index
                        })
                    }
                }catch(ex){
                    Util.alert('二维码内容不合法!')
                } 
            }
        });
    }

    onInputChange(e){
        this.setState({
            quantity:parseInt(e.target.value)
        })
    }

    render(){
        var buttons = [
            {
                label: '取消',
                onClick: (e)=>{
                    this.setState({show:false});
                }
            },
            {
                label: '确认',
                onClick:  (e)=>{
                    this.onScanMaterial();
                    this.setState({show:false});
                }
            }
        ];
        var scanButton = <Button onClick={()=>this.onBarcodeScan()}>扫描二维码</Button>;
        return (
            <BillForm formKey="Receipt" className="fittoparent flexbox flex-dir-col" {...this.props}>
                <Dialog.Confirm show={this.state.show} title="确认数量" buttons={buttons}>
                    <Input type="number" onChange={(v)=>this.onInputChange(v)}></Input>
                </Dialog.Confirm>
                <Nav.Navbar>
                    <Nav.NavBackItem></Nav.NavBackItem>
                    <Nav.NavTitle>收货单</Nav.NavTitle>
                    <Nav.NavToolbarItem yigoid="main_toolbar" optKey="Edit" float="right"><i className="fa fa-pencil-square-o"></i></Nav.NavToolbarItem>
                    <Nav.NavToolbarItem yigoid="main_toolbar" optKey="Cancel" float="right"><i className="fa fa-undo"></i></Nav.NavToolbarItem>
                    <Nav.NavToolbarItem yigoid="main_toolbar" optKey="Save" float="right"><i className="fa fa-floppy-o"></i></Nav.NavToolbarItem>
                </Nav.Navbar>
                <div className="flex-1 flexbox flex-dir-col">
                    <TabGroup.TabGroupControl className="buttongroup">
                        <TabGroup.TabPanel key="1" title="基本信息">
                            <Cells>
                                <Text label="单据号" yigoid="RH_RECEIPT_NO"/>
                                <Dict label="机构" yigoid="RH_ORG_ID"/>
                                <Combobox label="状态" yigoid="Status"/>
                                <Link label="物流订单" yigoid="RH_LOGISTICS_NO"/>
                                <Dict label="货主" yigoid="RH_OWNER_ID"/>
                                <Dict label="供应商" yigoid="RH_VENDOR_ID"/>
                            </Cells>
                        </TabGroup.TabPanel>
                        <TabGroup.TabPanel key="2" title="物料明细">
                            <div className="fittoparent flexbox flex-dir-col">
                                <div className="flex-1">
                                    <VirtualGrid scrollToIndex={this.state.scrollToIndex} yigoid="ReceipDtl" template={this.productTemplate}>
                                    </VirtualGrid>
                                </div>
                                {scanButton}
                            </div>
                        </TabGroup.TabPanel>
                    </TabGroup.TabGroupControl>
                </div>
            </BillForm>
            )
    }
}

export default AuthenticatedRoute(Receipt)
```
    上面这段是演示app中收货单的配置，其中
```javascript
    <Cells>
        <Text label="单据号" yigoid="RH_RECEIPT_NO"/>
        <Dict label="机构" yigoid="RH_ORG_ID"/>
        <Combobox label="状态" yigoid="Status"/>
        <Link label="物流订单" yigoid="RH_LOGISTICS_NO"/>
        <Dict label="货主" yigoid="RH_OWNER_ID"/>
        <Dict label="供应商" yigoid="RH_VENDOR_ID"/>
    </Cells>
```
    这段就是典型的单据配置，yigoid就是单据配置中的控件id,而节点的名称决定了使用哪种控件来对这个单据进行渲染。
    这张单据还支持使用摄像头进行二维码扫描，来完成明细单据的录入，在非编辑模式，可以通过扫描来快速定位指定物料所在的行，这些功能是需要开发人员自己进行开发的。