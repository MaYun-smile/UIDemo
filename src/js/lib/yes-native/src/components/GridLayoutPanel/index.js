import React, { Component } from 'react';
import { View } from 'react-native';
import {DynamicControl, propTypes} from 'yes'; // eslint-disable-line
class GridLayoutPanel extends Component {
    static getArraySum(arr) {
        const reducer = (sum, value) => {
            if (value && typeof value === 'string' && value.match(/%/)) {
                return value;
            }
            return (sum + value);
        };
        return arr.reduce(reducer, 0);
    }
    static getRealWidthList(widths, containerLength) {
        // widths有可能是, "auto", | number(20) | percent(50%)
        // 对于gridLayoutPanle,来说只有可能 number(20) | percent(50%)。陈志盛语。
        const numberList = [];
        widths.forEach((item) => {
            if (typeof item === 'number') {
                numberList.push(item);
            }
        });
        const occupiedLength = GridLayoutPanel.getArraySum(numberList);
        const remainingLength = containerLength - occupiedLength;

        const percentReg = /[0-9]*\.?[0-9]+%/i;
        const realWidthList = widths.map((item) => {
            if (percentReg.test(item)) {
                return remainingLength * parseFloat(item) / 100.0;
            }
            return item;
        });
        return realWidthList;
    }
    static renderItem(items, realWidthList, realHeightList, rowGap, columnGap) {
        const element = items.map((item) => {
            const { x, y, colspan, rowspan } = item;
            // width
            const widthArray = realWidthList.slice(x, x + colspan);
            const width = GridLayoutPanel.getArraySum(widthArray);

            // left
            const leftLenghtArray = realWidthList.slice(0, x);
            const left = GridLayoutPanel.getArraySum(leftLenghtArray) + x * columnGap;

            // height
            const heightArray = realHeightList.slice(y, y + rowspan);
            const height = GridLayoutPanel.getArraySum(heightArray);

            // top
            const topLenghtArray = realHeightList.slice(0, y);
            let top = GridLayoutPanel.getArraySum(topLenghtArray);
            top = top + rowGap * y;

            return (
                <DynamicControl
                    yigoid={item.metaObj.key}
                    layoutStyles={{
                        width,
                        height,
                        left,
                        top,
                        position: 'absolute',
                    }}
                    key={item.metaObj.key}

                />
            );
        });
        return element;
    }
    constructor(props) {
        super(props);
        this.handleLayout = this.handleLayout.bind(this);
        this.state = {
            width: 320,
        };
    }
    handleLayout(e) {
        this.setState({
            width: e.nativeEvent.layout.width,
        });
    }
    // TODO 不能使用props.comp,以后会删除comp。
    render() {
        const {widths, miniWidth, columnGap} = this.props.comp; // eslint-disable-line
        let { height, heights, rowGap } = this.props.comp;
        let { padding } = this.props.comp;
        const { items } = this.props.comp;
        const realWidthList = GridLayoutPanel.getRealWidthList(widths, this.state.width);
        const realHeightList = heights;
        const renderedItemElement = GridLayoutPanel.renderItem(items, realWidthList, realHeightList, rowGap, columnGap); // eslint-disable-line

        padding = parseInt(padding, 10);
        if (isNaN(padding)) {
            padding = 0;
        }
        // if height === 'pref'
        const boxSizing = height === 'pref' ? 'content-box' : 'border-box';
        if (height === 'pref') {
            height = GridLayoutPanel.getArraySum(heights);
            height += (heights.length - 1) * rowGap;

            height += padding * 2;
        }

        let style = {
            height,
            width: '100%',
            position: 'static',
            padding,
        };
        if (this.props.layoutStyles) {
            style = Object.assign(style, this.props.layoutStyles);
        }
        return (
            <View
                style={{
                    width: '100%',
                    position: 'relative',
                    flexDirection: 'row',
                    ...style,
                }}
                onLayout={this.handleLayout}

            >
                {renderedItemElement}
            </View>
        );
    }

}
GridLayoutPanel.propTypes = propTypes.GridLayoutPanel;
export default GridLayoutPanel;
