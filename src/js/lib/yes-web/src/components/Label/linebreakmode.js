import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default class LineBreakMode extends Component {
    state = {
        defaultExpand: false // 展开,收缩
    }
    //这里做了创建文本后再那文本的显示长度,之后会将在body下创建的元素移除,最后不会保留
    getStrSize = (str) => {
        let pdom = document.createElement("p")
        pdom.id = "pdom"
        pdom.style.display = "inline-block"
        pdom.style.whiteSpace = "nowrap"
        pdom.innerHTML = str
        document.body.appendChild(pdom)
        const pText = document.getElementById("pdom");
        return { width: pText.clientWidth, height: pText.clientHeight }
    }
    //这里做了计算str的显示长度值.当文本需要加上前后中的省略号后去计算.只显示与父类控件大小,
    //所以这个里做了这样的计算
    getNewCaption = () => {
        const { lineBreakType, displayValue, layoutStyles, icon, iconStyles } = this.props;
        let strWidth = this.getStrSize("..." + displayValue).width;
        document.body.removeChild(document.getElementById("pdom"))
        let str = displayValue, i = 1;
        let residueWidth = layoutStyles.width;
        if (icon) residueWidth = layoutStyles.width - iconStyles.width;
        if (lineBreakType == "Head") {
            while (strWidth > residueWidth) {
                str = "..." + displayValue.substr(i); //删除第一个字
                strWidth = this.getStrSize(str).width;
                document.body.removeChild(document.getElementById("pdom"))
                i++
            }
        } else if (lineBreakType == "Middle") {
            let beforeStr = displayValue.substring(0, parseInt(displayValue.length / 2));
            let afterStr = displayValue.substr(parseInt(displayValue.length / 2));
            while (strWidth > residueWidth) {
                if (i % 2 == 0) {
                    beforeStr = beforeStr.substring(0, beforeStr.length - 1)
                } else {
                    afterStr = afterStr.substr(1)
                }
                str = beforeStr + "..." + afterStr;
                strWidth = this.getStrSize(str).width;
                document.body.removeChild(document.getElementById("pdom"))
                i++
            }
        } else if (lineBreakType == "Tail") {
            while (strWidth > residueWidth) {
                str = displayValue.substring(0, displayValue.length - i) + "...";
                strWidth = this.getStrSize(str).width;
                document.body.removeChild(document.getElementById("pdom"))
                i++
            }
        }
        return str
    }
    //获取展开收缩文本,最大三行+"..."+"展开"返回的字符串
    getExpandCaption = (defaultExpand) => {
        const { displayValue, layoutStyles, MaxLines } = this.props;
        let str = displayValue + defaultExpand
        let textWidth = this.getStrSize(str).width;
        document.body.removeChild(document.getElementById("pdom"));
        let tdefaultExpandtWidth = this.getStrSize(defaultExpand).width;
        document.body.removeChild(document.getElementById("pdom"));
        let residueWidth = layoutStyles.width * MaxLines - tdefaultExpandtWidth;
        let i = 0
        while (textWidth > residueWidth) {
            str = displayValue.substring(0, displayValue.length - i) + "..." + defaultExpand;
            textWidth = this.getStrSize(str).width;
            document.body.removeChild(document.getElementById("pdom"))
            i++
        }
        return str
    }
    //当有最大行的时候,设置对应的style,有的需要换行,有的需要换行后加上省略号的
    getMaxLinesStyles = () => {
        const { displayValue, layoutStyles, MaxLines, lineBreakType, ExpandCaption } = this.props;
        let textHeight = this.getStrSize(displayValue).height;
        let maxlinesStyles = {}
        maxlinesStyles["overflow"] = "hidden";
        maxlinesStyles["height"] = textHeight * MaxLines;
        maxlinesStyles["width"] = layoutStyles.width;
        if (lineBreakType === 'Tail' || ExpandCaption) {
            maxlinesStyles["display"] = "-webkit-box"
            maxlinesStyles["WebkitBoxOrient"] = "vertical"
            maxlinesStyles["WebkitLineClamp"] = MaxLines
            maxlinesStyles["wordBreak"] = "break-all";
        }
        document.body.removeChild(document.getElementById("pdom"));
        return maxlinesStyles
    }
    onClick = () => {
        this.setState({ defaultExpand: !this.state.defaultExpand })
    }
    render() {
        const { textStyles, container, displayValue, layoutStyles, parentStyle, iconStyles, icon, MaxLines, ExpandCaption } = this.props;
        let newCaption = this.getNewCaption();
        let maxlinesStyles = {}, defaultExpand;
        if (MaxLines) {
            newCaption = displayValue
            maxlinesStyles = this.state.defaultExpand ? {} : this.getMaxLinesStyles()
        }
        //展开与收缩设置显示
        if (ExpandCaption) {
            defaultExpand = ExpandCaption.split(",")[0];
            newCaption = this.getExpandCaption(defaultExpand);
            newCaption = newCaption.split("...")[0] + "...";
            if (this.state.defaultExpand) {
                newCaption = displayValue;
                defaultExpand = ExpandCaption.split(",")[1]
            }
        }
        return (
            <View style={[container, layoutStyles, parentStyle]} >
                {icon && <Image style={iconStyles} source={{ uri: icon }} />}
                <Text style={[textStyles, maxlinesStyles]}>{newCaption}
                    {ExpandCaption && <Text onClick={this.onClick} style={[textStyles, { color: "66ccff" }]}>{defaultExpand}</Text>}
                </Text>
            </View >
        );
    }
}