/*
 * @Author: gmf
 * @Date:   2016-03-17 09:22:11
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-09 09:03:20
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import YESFormStore from '../stores/BillFormStore';
import { Container } from 'flux/utils';
/**
 * 添加High Order Component
 * 主要为了包装常用的Attribute： visibale editable等
 *
 */
const controlWrap = (BaseComponent) => {
    class YESControlVisibleWrapComponent extends PureComponent {
        static contextTypes = {
            getContextComponent: PropTypes.funrec,
        }
        static propTypes = {
            relatedId: PropTypes.string.isRequired,
        }
        static getStores() {
            return [YESFormStore];
        }
        static calculateState(prevState, props, context) {
            const comp = context.getContextComponent(props.relatedId);
            if (!comp) {
                return {
                    vislble: false,
                };
            }
            return {
                visible: comp.getState().get('visible'),
            };
        }
        render() {
            if (this.state.visible) {
                return (<BaseComponent {...this.props} />);
            }
            return null;
        }
    }
    return YESControlVisibleWrapComponent;
};

const totalWrap = (BaseComponent) =>
    Container.create(controlWrap(BaseComponent), {
        withProps: true,
        withContext: true,
    });
export default totalWrap;
