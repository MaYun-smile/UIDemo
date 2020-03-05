// export { default as default } from 'yes-native/dist/components/Label';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, PixelRatio } from 'react-native';
import { propTypes } from 'yes';
import MarqueeLabel from "./marqueelabel";
// import BadgeView from "../Badge";
import LineBreakMode from "./linebreakmode";

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        overflow: "hidden"
    },
    //换行定义的styles
    lineFeedStyles: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
    }
})
class Label extends Component {
    state = {
        iconHeight: 12,
        iconWidth: 12
    }
    componentWillReceiveProps(nextProps) {
        //获取图片的尺寸大小
        nextProps.icon && Image.getSize(nextProps.icon, (width, height) =>
            this.setState({
                iconHeight: height / PixelRatio.get(),
                iconWidth: width / PixelRatio.get()
            }))
    }
    getStyles = () => {
        const { textStyles, icon, MaxLines, singleLine } = this.props;
        let parentStyle = {}
        if (textStyles && !icon) {
            if (textStyles.hAlign === 0) {
                parentStyle.justifyContent = 'flex-start';
            } else if (textStyles.hAlign === 1) {
                parentStyle.justifyContent = 'center';
            } else if (textStyles.hAlign === 2) {
                parentStyle.justifyContent = 'flex-end';
            }
            if (textStyles.vAlign === 0) {
                parentStyle.alignItems = 'flex-start';
            } else if (textStyles.vAlign === 1) {
                parentStyle.alignItems = 'center';
            } else if (textStyles.vAlign === 2) {
                parentStyle.alignItems = 'flex-end';
            }
        }
        //这里是设置了不止显示一行.应该是左上角开始显示内容
        if (singleLine == false) {
            parentStyle.alignItems = 'flex-start';
        }
        //当遇到最大的行数的时候默认是居中显示
        if (MaxLines) {
            parentStyle.alignItems = "center"
        }
        return parentStyle
    }
    render() {
        const { textStyles, icon, MaxLines, layoutStyles, lineBreakType, displayValue } = this.props;
        let iconStyles = { height: this.state.iconHeight, width: this.state.iconWidth }
        let parentStyle = this.getStyles();
        //这里设置displayValue存在特殊符号的时候显示
        if (displayValue && String(displayValue).indexOf("\\n") != -1) {
            let text = displayValue.replace(/\\n/g, `<br/>`)
            return (
                <View style={[layoutStyles, textStyles, styles.lineFeedStyles]}
                    dangerouslySetInnerHTML={{ __html: text }} />
            )
        }
        //最大行的存在或者lineBreakType操作类型.
        if ((lineBreakType || MaxLines) && lineBreakType !== 'Marquee') {
            return (<LineBreakMode {...this.props}
                parentStyle={parentStyle}
                container={styles.container}
                iconStyles={iconStyles}
            />)
        }
        return (
            <View style={[styles.container, layoutStyles, parentStyle]} >
                {icon && <Image style={iconStyles} source={{ uri: icon }} />}
                {lineBreakType === 'Marquee' ?
                    <MarqueeLabel animateAirection={"level"} duration={15000} {...this.props} />
                    : <Text style={textStyles}>{displayValue}</Text>
                }
            </View >
        );
    }
}
Label.propTypes = propTypes.Label;
export default Label;

