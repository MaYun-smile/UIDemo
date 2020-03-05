import React, { Component } from 'react';
import { Components, Styles } from 'yes-native';
import { Toolbar } from 'react-native-material-ui';
const { BillForm, View, ChainDict, ComboBox, Layout , NavToolbar, TextLinkList, ScrollView } = Components;
const { CellLayout } = Layout;
// TODO
//
// ChainDict combobox,
//
// TextLinkList
//
// ToolbarAction NavToolbar
class ReceiptView extends Component {
    state = {
        showFilter: false,
    }
    onFilterToggle = () => {
        this.setState({
            showFilter: !this.state.showFilter,
        });
    }
    render() {
        return (
            <BillForm
                formKey="ReceiptView"
                entry="SCM/InboundNoticeManager/ReceiptView"
            >
                <View style={Styles.flex1}>
                    <Toolbar
                        centerElement="收货单"
                        rightElement={
                            <View style={{ flexDirection: 'row' }}>
                                {/* <ToolbarAction name='filter' onPressed = { this.onFilterToggle }/>*/}
                                <NavToolbar yigoid="main_toolbar" />
                            </View>
                        }
                    />
                    {/*<ChainDict*/}
                        {/*yigoid="RH_OWNER_ID"*/}
                        {/*layout={<CellLayout divider visible title="机构" />}*/}
                    {/*/>*/}
                     {/*{this.state.showFilter ?*/}
                         {/*<View />*/}
                         <ScrollView
                            style={Styles.flex1}
                         >
                             <TextLinkList
                                 yigoid="list"
                                 primaryKey="RH_RECEIPT_NO_LV"
                                 secondKey={["RH_OWNER_ID_LV"]}
                                // initialNumToRender={5}
                             />
                         </ScrollView>
                     {/*}*/}
                </View>
            </BillForm>
        );
    }
}
export default ReceiptView;
