# Getting Started
> 程序整体构架使用webpack+ES6+react来实现

## 准备

- npm&node.js

  请参考[链接](https://docs.npmjs.com/getting-started/installing-node),进行安装

## Debug

* Get dependencies

  ```sh 
  npm install
  ```

### 生成`control.js`

```
node generateControl.js
```



* Run webpackserver

  ```sh
  npm start
  ```

* Open link [地址](http://localhost)

## Release

* Get dependencies

  ```sh 
  npm install
  ```

* Run webpackserver

  ```sh
  npm build
  ```
* Run ExpressServer

  ```sh
  npm run startrelease
  ```
  
  
## 引入yes-common

1. 对yes-common进行打包

```
cd js/lib/yes-common &&  npm install && webpack

```
2. 更新yes-common
```
cd ../../.. &&  npm rm yes-common && npm install yes-common
```

## react-native-material-ui库的改动

> 删除node_modules/react-native-material-ui/src/styles/getTheme.js文件中,包含minWidth的行 

- 复制文件`yesdemo/src/node_modules/react-native-material-ui/src/styles/getPlatformElevation.web.js`到`yesdemo/src/node_modules/react-native-material-ui/src/styles/getPlatformElevation.js`
    ```bash
    cp node_modules/react-native-material-ui/src/styles/getPlatformElevation.web.js node_modules/react-native-material-ui/src/styles/getPlatformElevation.js
    cp node_modules/react-native-material-ui/src/RippleFeedback/index.web.js node_modules/react-native-material-ui/src/RippleFeedback/index.js

    ```

## react-native修改

> 由于在0.42.0版本中并不包含VirtulizedList控件，这个控件在0.43.0版本中才会被加入，所以需要把这个控件从43中复制过来。
  [https://raw.githubusercontent.com/facebook/react-native/master/Libraries/CustomComponents/](https://raw.githubusercontent.com/facebook/react-native/master/Libraries/CustomComponents)从这个目录下找到Lists目录，下面说的List目录就是代表这个目录

### 操作步骤 

1. 在本文档所在目录下有一个Lists目录，将这个目录复制到node_modules/react-native/Libraries/CustomeComponents目录下，带目录一起复制过去
2. 复制Lists目录下的ViewabilityHelper.js文件到node_modules/react-native/Libraries/Experimental目录下，覆盖原有文件

## 引入字体库

> 需要引入react-native-vector-icons这个库，这个库在引入react-native-material-ui之后会自动引入 
ios下需要注意，默认安装的是vector-icons,3.0的版本，这个版本在ios下编译会出现问题，需要手动升级到4.0

```
$ react-native link react-native-vector-icons
```


## native -> web

Add package `react-navigation` in `src` project.
```
npm install github:jefferscn/react-navigation
```
## Production

```bash
npm run start:production
```
