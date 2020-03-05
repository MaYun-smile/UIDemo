/*
 * @Author: gmf
 * @Date:   2016-06-22 14:36:38
 * @Last Modified by:   gmf
 * @Last Modified time: 2016-06-22 14:56:03
 */

import React, {Component, PropTypes} from "react";
import FullScreenView from "../FullScreenView/";
import Nav from "../Navbar/";
import NavigationBack from "material-ui/svg-icons/navigation/chevron-left";
import IconButton from "material-ui/IconButton";
import empty from "empty";
import YESFormStore from "../../../yes/stores/BillFormStore";

class MUIGridEditorWrap extends Component {
    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
        formKey: PropTypes.string,
        oid: PropTypes.string,
        gridId: PropTypes.string,
        gridRow: PropTypes.number,
    }
    static childContextTypes = {
        getContextComponent: PropTypes.func,
        getContextComponentState: PropTypes.func,
        onValueChange: PropTypes.func,

    }

    getChildContext() {
        return {
            getContextComponent: (yigoid) => this.getContextComponent(yigoid),
            getContextComponentState: (yigoid) => this.getContextComponentState(yigoid),
            onValueChange: (yigoid, v) => this.onValueChange(yigoid, v),

        };
    }

    getContextComponent(yigoid) {
        var billForm = YESFormStore.getBillForm(this.context.formKey, this.context.oid);
        var comp = billForm.getCellComponent(this.context.gridId, this.context.gridRow, yigoid);
        return comp;
    }

    getContextComponentState(yigoid) {
        var billForm = YESFormStore.getBillForm(this.context.formKey, this.context.oid);
        var state = billForm.getCellState(this.context.gridId, this.context.gridRow, yigoid);
        return state;
    }

    onValueChange(yigoid, v) {
        var billForm = YESFormStore.getBillForm(this.context.formKey, this.context.oid);
        billForm.emit('cellvaluechange', this.context.gridId, this.context.gridRow, yigoid, v.value != null ? v.value : v);
    }

    static defaultProps = {
        onClose: empty.func,
    }

    onDetailBack() {
        this.props.onClose();
    }

    render() {
        const iconStyle = {
            color: this.context.muiTheme.appBar.textColor,
            fill: this.context.muiTheme.appBar.textColor,
        };
        return (
            <FullScreenView>
                <Nav
                    iconElementLeft={<IconButton onTouchTap={() => this.onDetailBack()}
                                                 iconStyle={iconStyle}><NavigationBack /></IconButton>}
                    title={this.props.title}
                />
                <div className="flex-1 flexbox flex-dir-col">
                    {this.props.children}
                </div>
            </FullScreenView>
        );
    }
}
MUIGridEditorWrap.propType = {
    // onClose: React.PropTypes.function,
    // title: React.PropTypes.string,
};
export default MUIGridEditorWrap;
