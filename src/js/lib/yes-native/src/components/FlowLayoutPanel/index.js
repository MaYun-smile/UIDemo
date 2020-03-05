import React, { Component } from 'react';
import { DynamicControl } from 'yes'; // eslint-disable-line
import { View, Image } from 'react-native';

class FlowLayoutPanel extends Component {
    /**
    * 
    * @param {算数组里每个数相加} arr 
    */
    static getArraySum(arr) {
        const reducer = (sum, value) => {
            if (value && typeof value === 'string' && value.match(/%/)) {
                return value;
            }
            return (sum + value);
        };
        return arr.reduce(reducer, 0); // 累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
    }
    /**
   * 生成子控件对应的布局相关属性
   * @param {*子控件} comp 
   */
    generateLayoutStyle(comp) {
        let height = comp.height;   //获取子类的高度
        let parentWidth = this.props.comp.width;   // 获取相对子类上一层的宽度
        let parentHeight = this.props.comp.height;  // 获取相对子类上一层来的高度
        let items = this.props.items;
        const style = {};
        style['width'] = '100%'
        if ((parentWidth == 'pref' || parentWidth == 'auto' || typeof (parentWidth) == "number") && parentHeight == 'pref') {
            if (String(height).indexOf('%') !== -1) {
                style['height'] = 0;
            } else {
                style['padding'] = 10;
            }
        } else if (parentWidth == "auto" && typeof (parentHeight) === "number") {
            if (height == 'auto') {
                style['height'] = "100%";
            } else if (String(height).indexOf('%') !== -1 == true) {
                let number = items.map((item) => {
                    return typeof (item.height) == "number" ? item.height : 0;
                });
                let num = FlowLayoutPanel.getArraySum(number);
                style['height'] = parseInt(height) / 100 * parseInt(parentHeight - num);
            } else if (this.props.comp.overflowY == "Scroll") {
                style['height'] = height;
            } else {
                style['height'] = height;
                style['padding'] = 10;
            }
        } else {
            style['height'] = height;
        }
        return style;
    }

    render() {
        const { overflowY, overflowX } = this.props.comp;
        let style = {
            flexDirection: 'column',
            overflowX: overflowX == 'Visible' ? 'hidden' : overflowX,
            overflowY: overflowY == 'Visible' ? 'hidden' : overflowY,
        };
        if (this.props.layoutStyles) {
            style = Object.assign(style, this.props.layoutStyles);
        }
        return (
            <View
                style={style}
            >
                {this.props.items.map((item) => {
                    const styles = this.generateLayoutStyle(item);
                    return <DynamicControl
                        layoutStyles={styles}
                        key={item.metaObj ? item.metaObj.key : item.key}
                        yigoid={item.metaObj ? item.metaObj.key : item.key}
                    />
                })}
            </View>
        );
    }
}

export default FlowLayoutPanel;
