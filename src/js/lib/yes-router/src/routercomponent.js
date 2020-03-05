import React, { Component } from 'react';
import { DynamicBillForm, BillForm, OperationBar } from 'yes-platform';
import { ScrollView } from 'react-native';

export default (entry,BillFormComp = DynamicBillForm) => {
    class RouterComponent extends Component {
        static navigationOptions = () => ({
            title: entry.title,
            tabBarLabel: entry.title,
            headerRight: <BillForm formKey={entry.formKey}><OperationBar /></BillForm>,
            headerStyle: {
                // backgroundColor: '#2196f3',
            },
        })
        render() {
            return (
                <ScrollView>
                    <BillFormComp
                        formKey={entry.formKey}
                        status="EDIT"
                        oid="-1"
                    />
                </ScrollView>
            );
        }
    }
    return RouterComponent;
};
