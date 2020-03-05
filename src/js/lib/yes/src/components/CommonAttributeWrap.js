import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * StyleAttributeWrap
 * The second wrap for base component, just like Button Label.
 * 把 Attribute layoutSizeMode变成style
 * @param {Component} BaseComponent
 */
export default class CommonAttributeWrapComponent extends Component {
    static contextTypes = {
        getContextComponent: PropTypes.func,
    }
    static propTypes = {
        yigoid: PropTypes.string.isRequired,
    }
    removePx(v) {
        if (!v) {
            return '';
        }
        if (typeof v === 'number') {
            return v;
        }
        return Number(v.replace(/px|dp/, ''));
    }
    removePercent(v) {
        if (!v) {
            return '';
        }
        if (typeof v === 'number') {
            return v;
        }
        return Number(v.replace('%', ''));
    }
    isPercent(v) {
        return /\d+%/.test(v);
    }
    generateCommonStyle() {
        let layoutStyles = {};
        let textStyles = {};
        const comp = this.context.getContextComponent(this.props.yigoid);
        if (comp) {
            /* eslint-disable dot-notation, no-unused-expressions, max-len */
            comp.backColor && (layoutStyles['backgroundColor'] = comp.backColor);
            comp.foreColor && (textStyles['color'] = comp.foreColor);
            comp.format && comp.format.foreColor && (textStyles['color'] = comp.format.foreColor);
            comp.format && comp.format.highlightBackColor && (layoutStyles['highlightBackColor'] = comp.format.highlightBackColor);
            comp.format && comp.format.font && comp.format.font.bold && (textStyles['fontWeight'] = 'bold');
            comp.format && comp.format.font && comp.format.font.italic && (textStyles['fontStyle'] = 'italic');
            comp.format && comp.format.font && comp.format.font.name && (textStyles['fontFamily'] = comp.format.font.name);
            comp.format && comp.format.font && comp.format.font.size && (textStyles['fontSize'] = comp.format.font.size);
            comp.format && comp.format.hAlign != null && (textStyles['hAlign'] = comp.format.hAlign);
            comp.format && comp.format.vAlign != null && (textStyles['vAlign'] = comp.format.vAlign);
            comp.padding && (layoutStyles['padding'] = this.removePx(comp.padding));
            comp.leftPadding && (layoutStyles['paddingLeft'] = Number(this.removePx(comp.leftPadding)));
            comp.rightPadding && (layoutStyles['paddingRight'] = this.removePx(comp.rightPadding));
            comp.topPadding && (layoutStyles['paddingTop'] = this.removePx(comp.topPadding));
            comp.bottomPadding && (layoutStyles['paddingBottom'] = this.removePx(comp.bottomPadding));
            comp.margin && (layoutStyles['margin'] = this.removePx(comp.margin));
            comp.leftMargin && (layoutStyles['marginLeft'] = this.removePx(comp.leftMargin));
            comp.rightMargin && (layoutStyles['marginRight'] = Number(this.removePx(comp.rightMargin)));
            comp.topMargin && (layoutStyles['marginTop'] = this.removePx(comp.topMargin));
            comp.bottomMargin && (layoutStyles['marginBottom'] = this.removePx(comp.bottomMargin));
            comp.borderStyle && (layoutStyles['borderColor'] = this.borderColor);
            comp.borderStyle && (layoutStyles['borderWidth'] = 1);
            comp.borderRadius && (layoutStyles['borderRadius'] = this.borderRadius);
            // comp.width && (layoutStyles['width'] = comp.width);
            // comp.height && (layoutStyles['height'] = comp.height);
            // comp.width && typeof(comp.widch)==='number' && styles['width'] = comp.width);
            // comp.width && this.isPercent(comp.widch) && styles['flex'] = this.removePercent(comp.width);
            // comp.height && typeof(comp.height)==='number' && styles['height'] = comp.height;
            // comp.height && this.isPercent(comp.height) && styles['flex'] = this.removePercent(comp.height);
        }
        /* eslint-enable dot-notation, no-unused-expressions, max-len */
        layoutStyles = Object.assign(layoutStyles, this.props.layoutStyles);
        if (this.props.textStyles) {
            textStyles = Object.assign(textStyles, this.props.textStyles);
        }
        return {
            layoutStyles,
            textStyles,
        };
    }
    render() {
        const { children, layoutStyles, ...otherProps } = this.props; // eslint-disable-line no-unused-vars
        const newStyles = this.generateCommonStyle();
        // //将yigo的属性转为css
        // newStyle.backgroundColor = this.props.backColor ? this.props.backColor : 'white';
        // newStyle.padding = this.props.padding ? this.props.padding : '0px';
        // const combinedStyle = Object.assign({}, style, newStyle);
        // 考虑如右情况： style本身就已经存在了，不能直接style赋值，要合并。
        if (React.Children.only(children)) {
            return React.cloneElement(children, {
                ...newStyles,
                ...otherProps,
            });
        }
        return null;
    }
}
