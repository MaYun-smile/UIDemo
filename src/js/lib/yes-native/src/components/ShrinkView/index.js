import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import {defaultControlMapping, propTypes, DynamicControl,} from 'yes'; // eslint-disable-line
import { YIUI } from 'yes-core';
import LinearLayoutPanel from '../LinearLayoutPanel';
import { RefreshControl as RNRefreshControl, ScrollView } from 'react-native';
// refreshControl只有一个item。这个item必须是listview类似的组件
class YigoShrinkView extends Component {
    constructor(props, context) {
        super(props);
        this.state = {
            refreshing: false,
        };
        const { getContextComponent, getMappedComponent } = context;
        const comp = getContextComponent(this.props.yigoid);

        const subViewList = ['toolBarExpand', 'collapseView', 'toolBarCollapse', 'root'];
        this.compList = {};
        for (let i = 0; i < subViewList.length; i++) {
            this.loadComp( YIUI.create(comp.metaObj[subViewList[i]]) );// 对所有的控件进行一次索引，便于之后直接调用

        }
    }
    loadComp(comp) {
        console.log(comp)
        this.compList[comp.metaObj.key] = comp;
        if (comp.items) {
            comp.items.forEach(item => {
                this.loadComp(item);
            });
        }
    }
    onRefresh = async () => {
        const { headerScript, handleScript } = this.props;
        const sleep = () => new Promise((resolve) => {
            setTimeout(() => { resolve(); }, 2 * 1000);
        });
        try {
            // await sleep();
            await handleScript(headerScript);
        } finally {
            this.setState({ refreshing: false });
        }
    };
    static contextTypes = {
        getBillForm: PropTypes.func,
        getContextComponent: PropTypes.func,
        getContextComponentState: PropTypes.func,
    }

    // toolBarExpand collapseView toolBarCollapse
    getContextComponent(key) {
        /*const { getContextComponent, getMappedComponent } = this.context;
        const comp = getContextComponent(this.props.yigoid);

        const subViewList = ['toolBarExpand', 'collapseView', 'toolBarCollapse'];

        for (let i = 0; i < subViewList.length; i++) {
            const subView = comp[subViewList[i]];
        }

        console.log(comp);
        return comp[subYigoId];
        // 返回shrinkview1的一部分*/


        const comp = this.compList[key];
        const form = this.context.getBillForm();
        comp.ofFormID = form.form.formID;
        // if(!comp.getMetaObj().enable){
        //     comp.getMetaObj().enable = "false";//默认不可编辑
        // }
        return comp;
    }
    getContextComponentState(yigoid) {
        // var list = this.context.getContextComponent(listId);
        // let data = list.state.get('data');
        // let vv = data.getIn(path);

        const comp = this.compList[yigoid];
        if(!comp || !comp.state){
            return Immutable.Map({
                        value: v != null ? v.get('value') : '',
                        displayValue: v != null ? v.get('displayValue') : '',
                        'enable': false,
                        'visible': true,
                        'editable': false,
                        'required': false
                    });
        }
        return comp.state;
    }
    static childContextTypes = {
        getContextComponent: PropTypes.func,
        getContextComponentState: PropTypes.func,
    }
    getChildContext() {
        return {
            getContextComponent: (yigoid) => this.getContextComponent(yigoid),
            getContextComponentState: (yigoid) => this.getContextComponentState(yigoid),
        };
    }
    render() {
        const { layoutStyles, toolBarExpand, collapseView, toolBarCollapse } = this.props;
        // let styles = this.generateLayoutStyle(item);
        const styles = {
            // ...styles,
            ...layoutStyles,
            width: '100%',
            flex: 1,
            position: 'relative',
            touchAction: 'none', //任何触摸事件都不会产生默认行为，但是 touch 事件照样触发。
        };

        return (
            <ScrollView
                style={styles}
                contentContainerStyle={styles}
                refreshControl={
                    <RNRefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                        progressViewOffset={0}
                    />
                }
            >
                <DynamicControl
                    layoutStyles={styles}
                    key={toolBarExpand.metaObj.key || toolBarExpand.key}
                    yigoid={toolBarExpand.metaObj.key || toolBarExpand.key}
                />
                <DynamicControl
                    layoutStyles={styles}
                    key={collapseView.metaObj.key || collapseView.key}
                    yigoid={collapseView.metaObj.key || collapseView.key}
                />
                <DynamicControl
                    layoutStyles={styles}
                    key={toolBarCollapse.metaObj.key || toolBarCollapse.key}
                    yigoid={toolBarCollapse.metaObj.key || toolBarCollapse.key}
                />

            </ScrollView>
        );
    }
}

YigoShrinkView.propTypes = propTypes.RefreshControl;

export default YigoShrinkView;
