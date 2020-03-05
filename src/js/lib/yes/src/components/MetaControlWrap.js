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
    class YESControlWrapComponent extends PureComponent {
        static contextTypes = {
            getContextComponent: PropTypes.funrec,
        }
        static propTypes = {
            yigoid: PropTypes.string.isRequired,
        }
        static getStores() {
            return [YESFormStore];
        }
        static calculateState(prevState, props, context) {
            return {
                comp: context.getContextComponent(props.yigoid),
            };
        }
        render() {
            const comp = this.context.getContextComponent(this.props.yigoid);
            return (<BaseComponent
                comp={comp}
            />);
        }
    }
    return YESControlWrapComponent;
};

const totalWrap = (BaseComponent) =>
    Container.create(controlWrap(BaseComponent), {
        withProps: true,
        withContext: true,
    });
export default totalWrap;
