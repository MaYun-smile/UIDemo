# native转web的一些注意事项
> 代码中的调整已经提交，所以这里不赘述，下面会描述一些对于第三方库的一些改动

## react-native-vector-icons

* lib\create-icon-set.js

    在createIconSet这个函数的前面部分，判断平台的代码中增加如下一段

```javascript
if (Platform.OS === 'web') {
    var css = '@font-face {\nfont-family: \'' + fontFamily + '\';\nsrc: url(./node_modules/react-native-vector-icons/Fonts/' + fontFile + ') format(\'truetype\');\n}';
    var styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    if (styleElement.styleSheet){
      styleElement.styleSheet.cssText = css;
    } else {
      styleElement.appendChild(document.createTextNode(css));
    }
    (document.head || document.getElementsByTagName('head')[0]).appendChild(styleElement);
  }
```

## react-navigation

* lib\react-navigation.web.js

    在Navigators注释的下方加入如下一段

```javascript
  get StackNavigator() {
    return require('./navigators/StackNavigator').default;
  },
  get TabNavigator() {
    return require('./navigators/TabNavigator').default;
  },
  get DrawerNavigator() {
    return require('./navigators/DrawerNavigator').default;
  },
```

## react-native-scrollable-tab-view

* Buttons.js

    在根目录下复制一个Button.ios.js文件，文件名为Button.js