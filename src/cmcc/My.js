import React, { PureComponent } from 'react';
import { Components, Styles } from 'yes-native';
import { Toolbar } from 'react-native-material-ui';
const { BillForm, View, Layout,
        TextLinkList, ScrollView } = Components;
const { CellLayout } = Layout;

class My extends PureComponent {
    render() {
        return (
            <BillForm
                formKey="DispatchListMain"
                entry="DriverApp/CustomBill/DispatchListMain"
            >
                <View style={Styles.flex1}>
                    <Toolbar
                        centerElement="配送单"
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
export default My;


