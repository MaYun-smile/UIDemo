/*
 * @Author: gmf
 * @Date:   2016-03-14 10:29:16
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-01-03 17:28:14
 */

import React, { Component } from 'react';
import YESBillFormWrap from './YESBillFormWrap';
import YESFormStore from '../stores/BillFormStore';
import { Util } from '../yes_ext';
import History from '../history';
import { Container } from 'flux/utils';
import { YIUI } from 'yes-core';
import { lodash as $ } from 'yes-common';
import YESBillForm from './YESBillForm';
import PropTypes from 'prop-types';
require('../api/YESActionHandler');

export default (BaseComponent, LoadingComp) => {
    class YESWorkitem extends Component {
        static propTypes = {
            className: PropTypes.string,
            workItemId: PropTypes.string,
            params: PropTypes.object,
        }

        state = {
            loading: true,
        }

        async componentWillMount() {
            const workitemInfo = await YIUI.BPMService.loadWorkitemInfo(this.props.workitemId);
            if (workitemInfo) {
                this.setState({
                    loading: false,
                    workitemInfo,
                });
            }
        }

        render() {
            if (this.state.loading) {
                if (this.props.hideLoading) {
                    return null;
                }
                return <LoadingComp />;
                // return null;
            }
            let formKey = this.state.workitemInfo.FormKey;
            if (this.state.workitemInfo.TemplateKey) {
                formKey = `${formKey}|${this.state.workitemInfo.TemplateKey}`;
            }
            const oid = this.state.workitemInfo.OID ? this.state.workitemInfo.OID : -1;
            const expVals = {};
            expVals[YIUI.BPMConstants.WORKITEM_INFO] = this.state.workitemInfo;
            let status = 'VIEW';
            if (this.state.workitemInfo.State === 1 && this.props.loadInfo === 'true') {
                if (this.state.workitemInfo.IgnoreFormState) {
                    status = 'EDIT';
                }
            } else {
                expVals[YIUI.BPMKeys.WORKITEM_INFO] = null;
                expVals[YIUI.BPMKeys.LOAD_WORKITEM_INFO] = false;
            }
            return (<BaseComponent
                formKey={formKey}
                oid={oid}
                status={status}
                expVals={expVals}
                {...this.props}
            >{this.props.children}
            </BaseComponent>);
        }
    }
    return YESWorkitem;
};
