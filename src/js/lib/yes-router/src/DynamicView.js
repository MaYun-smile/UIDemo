/*
 * @Author: gmf
 * @Date:   2016-11-25 14:04:34
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-11-25 14:32:28
 */

'use strict';

import React, { PureComponent } from 'react';
import { DynamicBillForm, BillForm } from 'yes-platform';
import { ScrollView } from 'react-native';
import FormInfo from '../../yes-native/src/components/FormInfo';

export default class DynamicView extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        let formKey = navigation.state.params != null ? navigation.state.params.metaKey : null;
        if (formKey) {
            return {
                headerTitle: (
                    <BillForm
                        formKey={formKey}
                        oid={navigation.state.params ? navigation.state.params.id : -1}
                        status={navigation.state.params.status || 'VIEW'}
                    >
                        <FormInfo.FormCaption style={{ fontSize: 14 }} formKey={formKey} />
                    </BillForm>
                )
            }
        }
        return null;
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <DynamicBillForm
                    formKey={this.props.navigation.state.params.metaKey}
                    status="EDIT"
                    oid={this.props.navigation.state.params ? this.props.navigation.state.params.id : -1}
                    {...this.props}
                    style={{
                        flex: 1,
                    }}
                />
            </ScrollView>
        );
    }
}
