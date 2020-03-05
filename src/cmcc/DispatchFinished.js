import React, { PureComponent } from 'react';
import { Components, Styles } from 'yes-native';
import { Toolbar } from 'react-native-material-ui';
const { BillForm, View, Layout,
        TextLinkList, ScrollView } = Components;
const { CellLayout } = Layout;

class DispatchFinished extends PureComponent {
    render() {
        return (
            <BillForm
                formKey="DispatchListMain"
                entry="DriverApp/CustomBill/DispatchFinished"
            >
                <View style={Styles.flex1}>
                    <Toolbar
                        centerElement="已完成配送单"
                    />
                    <ScrollView
                        style={Styles.flex1}
                    >
                        <TextLinkList
                            yigoid="list"
                            primaryKey="RH_RECEIPT_NO_LV"
                            secondKey={["RH_OWNER_ID_LV"]}
                        />
                    </ScrollView>
                </View>
            </BillForm>
        );
    }
}
export default DispatchFinished;


