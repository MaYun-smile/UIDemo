import React, { Component, PropTypes } from "react";
import Immutable from "immutable";
import { DynamicControl } from 'yes';
import { YIUI } from "../../../yes-core/src";
import Util from '../util';

class DefaultListRow extends Component {
    constructor(props, context) {
        super();
        this.virtualState = Immutable.fromJS({}); // 模拟一个控件的状态
    }
    // 调用父类的
    static contextTypes = {
        getContextComponent: PropTypes.func,
        getContextComponentState: PropTypes.func,
        onValueChange: PropTypes.func,
        onControlClick: PropTypes.func,
        getBillForm: PropTypes.object,
    }

    //给子类用的
    static childContextTypes = {
        getContextComponent: PropTypes.func,
        getContextComponentState: PropTypes.func,
        onDisplayValueChange: PropTypes.func,
        onClick: PropTypes.func,
        onControlClick: PropTypes.func,
        onValueChange: PropTypes.func,
    }
    // 给子类调用的
    getChildContext() {
        return {
            getContextComponent: this.getContextComponent,
            getContextComponentState: this.getContextComponentState,
            onDisplayValueChange: this.onDisplayValueChange,
            onClick: this.onClick,
            onControlClick: this.onControlClick,
            onValueChange: this.onValueChange
        };
    }
    getMetaObj = (list) => {
        return function () { return list.metaObj || {} }
    }
    onControlClick = (yigoid, obj) => {
        const form = this.context.getBillForm();
        if (obj.indication) {
            let comp = this.props.list;
            comp.deleteRow(obj.indication.substring(obj.indication.length - 1))
            for (let i = 0; i < comp.columnInfo.length; i++) {
                let compp = this.getContextComponent(comp.columnInfo[i].key);
                compp.setValue("", { indication: obj.indication })
            }
            return
        }
        const comp = this.getContextComponent(yigoid);
        const script = comp.clickContent
        Util.safeExec(async () => {
            await form.form.eval(script);
        });
    }
    onValueChange = async (yigoid, v, indication) => {
        let comp = this.context.getContextComponent(yigoid);
        if (indication) {
            comp.setValue(v, { indication })
        } else {
            comp.setValue(v)
        }
    }
    /**
     * 将viewCollection 转化成panel需要的
     */
    getContextComponent = (yigoid) => {   // 返回给定id的控件对象
        const list = this.props.list;
        let row = {};
        let columnInfo = list.columnInfo; // 拿出来为了，将viewCollection里面items对应的放入到columnInfo中去
        for (let i = 0; i < columnInfo.length; i++) {
            // columnInfo[i]["height"] = list.metaObj && list.metaObj.rowHeight;
            if (yigoid == columnInfo[i].key) {
                return this.context.getContextComponent(yigoid);
            }
        }
        row['items'] = columnInfo;
        row['orientation'] = 1;
        row['tagName'] = 'linearlayoutpanel';
        return row
    }
    getContextComponentState = (yigoid) => { // 返回给定id的控件的状态
        const { list, rowIndex } = this.props;
        let comp = this.context.getContextComponent(yigoid);
        if (!comp) return list.state
        if (comp && !comp.columnKey && comp.key == yigoid) return comp.state;
        let displayValue, value;
        list.state.get("data").map((item, index) => {
            if (index == rowIndex) {
                value = item.get(comp.columnKey);
                displayValue = item.get(comp.columnKey);
            }
        })
        this.virtualState = this.virtualState.setIn([yigoid], Immutable.Map({
            'enable': false,
            'visible': true,
            'editable': false,
            'required': false,
            'value': value,
            'displayValue': displayValue,
            'loading': false
        }));
        var result = this.virtualState.getIn([yigoid]);
        return result;
    }

    render() {
        return <DynamicControl yigoid={this.props.yigoid} />
    }
}
export default DefaultListRow;
