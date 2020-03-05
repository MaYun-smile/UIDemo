import React, { Component } from 'react';
import { View, Animated, Easing, StyleSheet, Text } from 'react-native';


const styles = StyleSheet.create({
    bgViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'scroll',
    }
});

export default class MarqueeLabel extends Component {

    componentWillMount() {
        this.animateAirection = this.props.animateAirection;
        if (this.animateAirection == 'level') { // 水平方向滚动
            this.levelInitStatus();
        }
        this.duration = 0;
        this.shouldFinish = false;
    }

    levelInitStatus() {
        this.animatedTransformX = new Animated.Value(0);
        this.bgVieWidth = 0;
        this.containerWidth = 0;
        this.animateAirectionLevel = true;
        this.animateType = this.animatedTransformX;
    }

    componentWillUnmount() {
        this.shouldFinish = true;
    }

    containerWOnLayout(e) { // 当组件的布局发生变动的时候，会自动调用下面的方法
        this.containerWidth = e.nativeEvent.layout.width;
        if (this.bgViewWidth) {
            this.prepareToAnimate();
        }
    }

    bgViewWOnLayout(e) {
        this.bgViewWidth = e.nativeEvent.layout.width;
        if (this.containerWidth) {
            this.prepareToAnimate();
        }
    }

    prepareToAnimate() { // 开始动画
        const { duration, speed } = this.props; // 一次动画的持续时间 和 速度
        if (duration !== undefined) {
            this.duration = duration;
        } else if (speed !== undefined) {
            this.duration = ((this.bgVieWidth + this.containerWidth) / speed) * 1000;
        }
        this.animate(0);
    }

    animate(bgViewWidth) {
        this.animatedTransformX.setValue(bgViewWidth);
        this.levelAnimated();
    }

    levelAnimated() { // 水平滚动动画
        Animated.timing(this.animateType, {
            toValue: -this.containerWidth,
            duration: this.duration,
            useNativeDriver: true,
            easing: Easing.linear
        }).start(() => {
            if (!this.shouldFinish) {
                this.animate(this.bgViewWidth)
            }
        });
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
    render() {
        const { displayValue, layoutStyles, MaxLines } = this.props;
        let marqueelabelStyles = {}
        let marqueelabelSize = this.getStrSize(displayValue)
        document.body.removeChild(document.getElementById("pdom"))
        if (MaxLines) {
            marqueelabelStyles["width"] = marqueelabelSize.width / MaxLines
            marqueelabelStyles["height"] = marqueelabelSize.height * MaxLines
        }
        return (
            <View
                style={[styles.bgViewStyle, { width: layoutStyles.width, height: layoutStyles.height }]}
                onLayout={(event) => { return this.bgViewWOnLayout(event) }} >
                <View>
                    <Animated.Text
                        style={[{ transform: [{ translateX: this.animatedTransformX }] }, marqueelabelStyles]}
                        onLayout={(event) => { return this.containerWOnLayout(event) }}
                    >{displayValue}</Animated.Text>
                </View>
            </View>
        );
    }
}
