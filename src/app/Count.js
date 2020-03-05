/*
 * @Author: gmf
 * @Date:   2016-03-15 13:56:25
 * @Last Modified by:   zjy
 * @Last Modified time: 2016-10-26 14:18:33
 */
'use strict';
import React, {Component, PropTypes} from "react";
import IconButton from "material-ui/IconButton";
import {Cells} from "react-weui";
import {WebComponents, MuiComponents, Util} from "../js";
import NavigationBack from "material-ui/svg-icons/navigation/chevron-left";
import Divider from "material-ui/Divider";
const {
    BillForm, AuthenticatedRoute,
    MaterialUI
} = WebComponents;
const {
    MuiToolBar,
    MuiNavbar,
    MuiText,
    MuiToggle,
    MuiCheckbox,
    MuiTabGroup,
    MuiTabPanel,
    MuiGrid,
    MuiGridRow,
    HistoryBackWrap,
    FullScreenLayout,
    FlexLayout,
    Flex,
} = MuiComponents;
const HistoryBackWrapButton = HistoryBackWrap(IconButton);

class Count extends Component {
    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
    }
    state = {
        scrollToIndex: 0,
    }

    productTemplate(rowdata, index) {
        return (
            <MuiGridRow
                yigoid="ReceipDtl"
                rowIndex={index}
                primaryText={Util.getCellData(rowdata, 'KRL_SPEC')}
                secondaryTextLines={1}
            />
        );
    }

    render() {
        const iconStyle = {
            color: this.context.muiTheme.appBar.textColor,
            fill: this.context.muiTheme.appBar.textColor,
        };
        return (
            <FullScreenLayout>
                <BillForm formKey="Count" {...this.props}>
                    <FlexLayout>
                        <MuiNavbar
                            title="盘点单"
                            zDepth={0}
                            iconElementLeft={<HistoryBackWrapButton
                                iconStyle={iconStyle}><NavigationBack /></HistoryBackWrapButton>}
                            iconElementRight={<MuiToolBar iconStyle={iconStyle} yigoid="main_toolbar"/>}
                        />
                        <Flex flex="1">
                            <MuiTabGroup>
                                <MuiTabPanel key="0" label="基本信息">
                                    <Cells>
                                        <MuiText label="单据号" yigoid="NO"/>
                                        <Divider />
                                        <MaterialUI.Combobox label="盘点方式" yigoid="CH_COUNT_METHOD"/>
                                        <Divider />
                                        <MaterialUI.Combobox label="状态" yigoid="Status"/>
                                        <Divider />
                                        <MaterialUI.Dict label="货主" yigoid="CH_OWNER_ID"/>
                                        <Divider />
                                        <MaterialUI.ChainDict label="物料" yigoid="CH_MATERIAL_ID"/>
                                        <Divider />
                                        <MuiToggle label="动态盘点" yigoid="CH_IS_DYNAMIC"/>
                                        <Divider />
                                        <MuiCheckbox label="需要复盘" yigoid="CH_NEED_SECOND"/>
                                        <Divider />
                                    </Cells>
                                </MuiTabPanel>
                                <MuiTabPanel key="1" label="流通加工领料明细">
                                    <MuiGrid
                                        scrollToIndex={this.state.scrollToIndex}
                                        yigoid="KITTING_RAW_DetailGrid"
                                        template={this.productTemplate}
                                    >
                                        <Cells>
                                            <MuiText label="非敏感属性" yigoid="KRL_SPEC"/>
                                            <Divider />
                                        </Cells>
                                    </MuiGrid>
                                </MuiTabPanel>
                            </MuiTabGroup>
                        </Flex>
                    </FlexLayout>
                </BillForm>
            </FullScreenLayout>
        );
    }
}
export default AuthenticatedRoute(Count, WebComponents.Login);
