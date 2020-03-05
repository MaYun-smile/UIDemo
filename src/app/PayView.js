import React, {Component, PropTypes} from "react";
import {WebComponents, MuiComponents} from "../js";
const {DynamicBillForm} = WebComponents;
const {FullScreenLayout, FlexLayout, Flex} = MuiComponents;
class PayView extends Component {
    render() {
        return (
            <FullScreenLayout>
                <DynamicBillForm
                    entry="SCM/CustomBill/PayTest"
                    {...this.props}
                />
            </FullScreenLayout>
        );
    }
}
export default PayView;
