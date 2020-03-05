# 模版开发方案介绍
## 目的
* 提供手动配置界面布局的能力
* 提供可扩展的模版方案，提升界面布局开发的简便性
## 实现
> 基于已有的h5解决方案，提供一个模版解析层，其实是在单据最外面增加了一组模版解析控件。
## 环境
* webpack
* npm
## 开发环境准备
1. 安装npm
2. 将本文档同目录下的tempalte1.0.rar解压到任何目录下
    > 这个文件后续会在特定网站上提供更新
3. 进入解压缩的目标目录
4. 执行npm install
    >这个过程时间比较长，最好是翻墙之后执行，建议可以使用公司的npm缓存，
    'npm install --registry http://dev.bokesoft.com:28080/',
    如果还是有问题可以将文档同目录下的node_modules.rar文件，解压到目标目录的node_modules目录下.
## 开发
1. 修改项目目录中的配置文件
2. 执行npm start
3. 在浏览器中输入[地址](http://localhost)
## 调试
> 使用google chrome developer tools可以进行调试，最好安装react开发插件，可以在chrome 市场中下载（需要翻墙）
## 打包
### H5
>在项目目录中执行npm run build，会在项目目录总产生一个build目录，将这个目录中的内容复制到一个app server的目录下就可以进行访问。
### Native
>开发中。。。
