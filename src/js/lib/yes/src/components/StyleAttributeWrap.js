/* 
 * @Author: gmf
 * @Date:   2016-12-28 10:55:52
 * @Last Modified by:   zjy
 * @Last Modified time: 2017-01-04 16:28:17
 */


import React, { Component } from "react";
import PropTypes from 'prop-types';
/**
 * StyleAttributeWrap
 * The second wrap for base component, just like Button Label.
 * 把 Attribute layoutSizeMode变成style
 * @param {Component} BaseComponent
 */
class StyleAttributeWrapComponent extends Component {
    generateStyle(layoutSizeMode, height, width) {
        let style;
        switch (layoutSizeMode) {
            case 'parentSize':
                style = {
                    height: '100%',
                    width: '100%',
                };
                break;
            case 'autoSize':
                break;
            case 'customSize':
                style = {};
                if (height) {
                    style.height = height;
                }
                if (width) {
                    style.width = width;
                }
                break;
            default:
                style = {};
        }
        ;
        return style;
    };

    render() {
        const { layoutSizeMode, Height, Width, style, children, ...otherProps } = this.props;
        const newStyle = this.generateStyle(layoutSizeMode, Height, Width);
        //将yigo的属性转为css
        newStyle.backgroundColor = this.props.backColor ? this.props.backColor : 'white';
        newStyle.padding = this.props.padding ? this.props.padding : '0px';
        const combinedStyle = Object.assign({}, style, newStyle, { boxSizing: 'border-box' });
        // 考虑如右情况： style本身就已经存在了，不能直接style赋值，要合并。
        if (React.Children.only(children)) {
            return React.cloneElement(children, {
                style: combinedStyle,
                ...otherProps
            });
        }
    };
}

export default StyleAttributeWrapComponent