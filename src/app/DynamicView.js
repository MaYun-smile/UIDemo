/* 
 * @Author: gmf
 * @Date:   2016-11-25 14:04:34
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-11-25 14:32:28
 */

'use strict';

import React, {Component, PropTypes} from "react";
import {WebComponents, MuiComponents} from "../js";
const {DynamicBillForm} = WebComponents;
const {FullScreenLayout} = MuiComponents;

export default class DynamicView extends Component {
    render() {
        return (
            <FullScreenLayout>
                <DynamicBillForm formKey={this.props.params.formKey}
                                 oid={this.props.params ? this.props.params.id : -1} {...this.props}>
                </DynamicBillForm>
            </FullScreenLayout>
        )
    }
}