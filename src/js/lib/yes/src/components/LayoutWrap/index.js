import React, { Component } from 'react';
import PropTypes from 'prop-types';

function LayoutWrap(WrappedComponent) {
    class Layout extends Component {
        static propTypes = {
            layout: PropTypes.element,
            visible: PropTypes.bool,
            disabled: PropTypes.bool,
        };
        render() {
            const { layout, ...otherProps } = this.props;
            const baseEle = (
                <WrappedComponent
                    {...otherProps}
                />
            );
            if (this.props.disabled && this.props.hideWhenEmptyValue && !this.props.isVirtual && this.props.displayValue === '') {
                return null;
            }
            if (layout) {
                return (
                    React.cloneElement(
                        layout,
                        Object.assign(
                            { visible: this.props.visible, disabled: this.props.disabled, caption: this.props.caption },
                            { ...this.props.layout.props }
                        ),
                        baseEle
                    ));
            }
            return baseEle;
        }
    }
    return Layout;
}
export default LayoutWrap;
