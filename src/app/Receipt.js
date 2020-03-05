import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Components, History } from 'yes-native';
import { Toolbar } from 'react-native-material-ui';
import { TableView } from 'react-native-tableview-simple';
const { BillForm, ChainDict, ComboBox, TextGrid, NavToolbar, Layout, TabView, View, DatePicker } = Components;
const { CellLayout } = Layout;
class Receipt extends Component {
    static propTypes = {
        navigation: PropTypes.object,
    };
    state = {
        show: false,
        scrollToIndex: 0,
    };
    onInputChange(e) {
        this.setState({
            quantity: parseInt(e.target.value, 10),
        });
    }
    render() {
        return (
            <BillForm
                formKey="Receipt"
                oid={this.props.navigation.state.params.id}
                status={this.props.navigation.state.params.status || 'VIEW'}
            >
                <View style={{ flex: 1 }}>
                    {/* <Dialog.Confirm show={this.state.show} title="确认数量" buttons={buttons}>
                     <Input type="number" onChange={(v) => this.onInputChange(v)} />
                     </Dialog.Confirm>*/}
                    <Toolbar
                        leftElement="arrow-back"
                        onLeftElementPress={() => History.goBack()}
                        centerElement="收货单"
                        rightElement={
                            <NavToolbar yigoid="main_toolbar" />
                        }
                        style={{
                            container: {
                                elevation: 0,
                            },
                        }}
                    />
                    <TabView style={{ flex: 1 }}>
                        <TableView key="0" tabLabel="基本信息">
                            <ChainDict
                                yigoid="RH_ORG_ID"
                                layout={<CellLayout divider visible title="机构" />}
                            />
                            <DatePicker
                                yigoid="RH_RECV_DATE"
                                layout={<CellLayout divider visible title="收货日期" />}
                            />
                            <DatePicker
                                yigoid="RH_MIGRATE_RECV_DATE"
                                layout={<CellLayout divider visible title="入库日期" />}
                            />
                            <ComboBox
                                yigoid="Status"
                                layout={<CellLayout divider visible title="状态" />}
                            />
                        </TableView>
                        <TextGrid
                            key="1"
                            tabLabel="物料明细"
                            yigoid="ReceipDtl"
                            primaryKey="RL_MATERIAL_ID"
                            secondKey={["RL_RECV_QTY"]}
                            detailViewTitle="物料明细"
                            detailView={() =>
                                (
                                    <TableView>
                                        <ChainDict
                                            yigoid="RL_MATERIAL_ID"
                                            layout={<CellLayout divider visible title="商品" />}
                                        />
                                        <ComboBox
                                            yigoid="RL_RECV_UNIT"
                                            layout={<CellLayout divider visible title="单位" />}
                                        />
                                    </TableView>
                                )
                            }
                        />
                    </TabView>
                </View>
            </BillForm>
        );
    }
}
export default Receipt;
