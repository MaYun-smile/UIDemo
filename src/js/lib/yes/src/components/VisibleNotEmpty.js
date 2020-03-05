/*
 * @Author: gmf
 * @Date:   2016-03-17 09:22:11
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-09 09:03:20
 */

import React, { PureComponent } from 'react';
import YESFormStore from '../stores/BillFormStore';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';
/**
 * 添加High Order Component
 * 主要为了包装常用的Attribute： visibale editable等
 *
 */
const controlWrap = (BaseComponent) => {
    class YESControlNotEmptyVisibleWrapComponent extends PureComponent {
        static contextTypes = {
            getContextComponentState: PropTypes.func,
        }
        static propTypes = {
            relatedId: PropTypes.string.isRequired,
        }
        static getStores() {
            return [YESFormStore];
        }
        static calculateState(prevState, props, context) {
            const compState = context.getContextComponentState(props.relatedId);
            if (!compState) {
                return {
                    vislble: false,
                };
            }
            let v = compState.get('value');
            if (typeof v === 'string') {
                v = v.trim();
            }
            return {
                visible: !!v,
            };
        }
        render() {
            if (this.state.visible) {
                return (<BaseComponent {...this.props} />);
            }
            return null;
        }
    }
    return YESControlNotEmptyVisibleWrapComponent;
};

const totalWrap = (BaseComponent) =>
    Container.create(controlWrap(BaseComponent), {
        withProps: true,
        withContext: true,
    });
export default totalWrap;
