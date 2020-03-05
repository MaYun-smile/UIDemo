import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as propTypes from 'yes-prop-types'; // eslint-disable-line import/no-unresolved
import CommonAttributeWrap from '../CommonAttributeWrap';
class DynamicControl extends Component {
    static contextTypes = {
        getContextComponent: PropTypes.func,
        getMappedComponent: PropTypes.func,
    };
    render() {
        const { getContextComponent, getMappedComponent } = this.context;
        const comp = getContextComponent(this.props.yigoid);
        if (comp && comp.tagName) {
            let Control = null;
            if (this.props.control) {
                Control = this.props.control;
            } else {
                Control = getMappedComponent(comp.tagName);
            }
            if (!Control) {
                return null;
            }
            if (this.props.isCustomLayout) {
                return <Control {...this.props} />;
            }
            return (
                <CommonAttributeWrap {...this.props}>
                    <Control />
                </CommonAttributeWrap>
            );
        }
        return null;
    }
}
DynamicControl.propTypes = propTypes.DynamicControl;
export default DynamicControl;
