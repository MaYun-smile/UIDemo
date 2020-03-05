/*
 * @Author: gmf
 * @Date:   2016-03-17 09:22:11
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-09 09:03:20
 */

import React, { Component } from 'react';
import { Container } from 'flux/utils';
import PropTypes from 'prop-types';
import YESFormStore from '../stores/BillFormStore';
import Immutable from 'immutable';
import { UIHandler } from '../yes_ext'
// import StyleAttributeWrap from "./StyleAttributeWrap";
import layoutWrap from './LayoutWrap';
// import waitToTransitionEnd from '../waitToTransitionEnd';
import Util from '../util';
import getHistory from '../history';
import BackHandler from '../api/HardwareBackButton';
import { YIUI } from 'yes-core';
import { intlShape, FormattedMessage } from 'react-intl';

const ROWS_PER_PAGE = 50;
/**
 * 添加High Order Component
 * 主要为了包装常用的Attribute： visibale editable等
 *
 */
var ControlWrap = (BaseComponent, checkDict) => {
    class YESDictControlWrapComponent extends Component {
        static contextTypes = {
            getContextComponent: PropTypes.func,
            getContextComponentState: PropTypes.func,
            onValueChange: PropTypes.func,
            onClick: PropTypes.func,
            onDisplayValueChange: PropTypes.func,
            getBillForm: PropTypes.func,
            eval: PropTypes.func,
            intl: intlShape,
        }
        static propTypes = {
            yigoid: PropTypes.string.isRequired,
        }

        static defaultProps = {
            useCache: false,
            cacheKey: '',
            autoLoad: true,
        }

        static getStores() {
            return [YESFormStore];
        }

        // 模拟一个compState
        static virtualState = Immutable.Map({
            'enable': false,
            'visible': true,
            'editable': false,
            'required': false,
            'value': '',
            'displayValue': '',
            'items': [],
            'isVirtual': true,
        })

        static calculateState(prevState, props, context) {
            var billForm = context.getBillForm();
            if (!billForm) {
                return {
                    state: this.virtualState,
                    items: null,
                    textLoading: false,
                    displayValue: '',
                    loading: true,
                    modalVisible: false,
                };
            }
            var comp = context.getContextComponent(props.yigoid);
            if (comp == null) {
                console.warn(`field ${props.yigoid} not exist!`);
                return { state: this.virtualState };
            }
            // 当billForm，comp均存在时，停止loading
            var compState = context.getContextComponentState(props.yigoid);
            var result = {
                state: compState,
                modalVisible: false,
                items: null,
                currentPage: 0,
                hasMore: true,
                textLoading: true,
                value: prevState ? prevState.value : null,
                displayValue: prevState ? prevState.displayValue : "",
                loading: false,
            };
            let currentValue = compState.get('value');
            if (currentValue == null) {
                result.textLoading = false;
            }
            if (prevState) {
                if (prevState.value === compState.get('value')) {
                    result.textLoading = prevState.textLoading;
                }
            }
            if (prevState && prevState.modalVisible) {
                result.modalVisible = true;
            }
            if (prevState && prevState.query) {
                result.query = prevState.query;
            }
            if (prevState) {
                Object.assign(result, {
                    hasMore: prevState.hasMore,
                    loading: prevState.loading,
                    items: prevState.items,
                    currentPage: prevState.currentPage,
                    formCache: prevState.fromCache,
                });
            }
            // if (prevState && prevState.items) {
            //     if (result.state !== prevState.state) {
            //         result.items = null;
            //     } else {
            //         result.items = prevState.items;
            //         if (prevState && prevState.currentPage != null) {
            //             result.currentPage = prevState.currentPage;
            //         }
            //         if (prevState && prevState.hasMore != null) {
            //             result.hasMore = prevState.hasMore;
            //         }
            //         if (prevState && prevState.loading != null) {
            //             result.loading = prevState.loading;
            //         }
            //     }
            // }
            // if(prevState && prevState.enable){
            //     result.enable = prevState.enable;
            // }
            // if(prevState && prevState.visible){
            //     result.visible= prevState.visible;
            // }
            if (props.inline) {
                result.modalVisible = true;
            }
            return result;
        }

        getCacheProvider() {
            return this.props.cacheProvider || {
                getItem: Util.cacheGet,
                setItem: Util.cacheSet,
            };
        }
        onChange = async (v) => {
            const val = parseInt(v, 10);
            await this.context.onValueChange(this.props.yigoid, v);
            if (this.props.useCache) {
                const dt = this.state.items.find((item) => {
                    return item.OID === val;
                });
                if (dt) {
                    const provider = this.getCacheProvider();
                    let cacheData = await provider.getItem(this.props.cacheKey);
                    cacheData = cacheData || [];
                    if (!cacheData.find((item) => item.OID === val)) {
                        if (cacheData.length > 10) {
                            cacheData.shift();
                        }
                        cacheData.push(dt);
                        provider.setItem(this.props.cacheKey, cacheData);
                    }
                }
            }
            this.props.onChange && this.props.onChange(v, this.context);
        }

        onChangePopupState = (v) => {
            if (this.props.inline) {
                return;
            }
            if (v)
                this.onShowPopup();
            else
                this.onHidePopup();
        }

        /**
         * 输入过滤提条件
         */
        onQuery = async (query) => {
            var page = 0;
            var comp = this.context.getContextComponent(this.props.yigoid);
            var itemKey = comp.itemKey;
            this.setState({
                query,
                loading: true,
                currentPage: 0,
                items: null,
            });
            var result = await this.loadPage(0, query);
            this.setState({
                hasMore: result.totalRowCount > result.data.length,
                loading: false,
                items: result.data,
                fromCache: false,
            });
        }

        checkDict = async () => {
            const billform = this.context.getBillForm();
            const comp = this.context.getContextComponent(this.props.yigoid);
            if (checkDict) {
                return await checkDict(billform, comp, this.context.eval);
            }
            var filter = null;
            const itemFilters = comp.getMetaObj().itemFilters || comp.itemFilters;
            if (itemFilters) {
                const itemFilter = itemFilters[comp.itemKey];
                for (let i in itemFilter) {
                    var cond = itemFilter[i].cond;
                    if (cond && cond.length > 0) {
                        var ret = await this.context.eval(cond);
                        if (ret === true) {
                            filter = itemFilter[i];
                            break;
                        }
                    } else {
                        filter = itemFilter[i];
                        break;
                    }
                }
            }
            //取 filter的值
            if (filter) {
                var filterVal
                var paras = [];
                for (var j in filter.filterVals) {
                    filterVal = filter.filterVals[j];
                    switch (filterVal.type) {
                        case YIUI.FILTERVALUETYPE.CONST:
                            //paras += content;
                            paras.push(filterVal.refVal);
                            break;
                        case YIUI.FILTERVALUETYPE.FORMULA:
                        case YIUI.FILTERVALUETYPE.FIELD:
                            paras.push(await this.context.eval(filterVal.refVal));
                            break;
                    }
                }

                const dictFilter = {};
                dictFilter.itemKey = comp.itemKey;
                dictFilter.formKey = billform.form.formKey;
                dictFilter.fieldKey = comp.getMetaObj().key;
                dictFilter.sourceKey = dictFilter.fieldKey;
                dictFilter.filterIndex = filter.filterIndex;
                dictFilter.values = paras;
                dictFilter.dependency = filter.dependency;
                dictFilter.typeDefKey = filter.typeDefKey;
                //TODO::
                //暂时不支持前台传递过滤条件
                //$this.getDictTree().dictFilter = dictFilter;
                // options.dictFilter = dictFilter;
                return dictFilter;
            }
            return null;
        }
        async loadPage(page, query) {
            var comp = this.context.getContextComponent(this.props.yigoid);
            let { itemKey, itemFilters, stateMask, key } = comp.metaObj;
            let filter = await UIHandler.getDictFilter(comp, key, itemFilters, itemKey);
            var result = await UIHandler.getQueryData(
                itemKey,
                page * ROWS_PER_PAGE,
                ROWS_PER_PAGE,
                query || '',
                stateMask || 1,
                filter,
                { 'oid': '0', 'itemKey': itemKey, 'caption': '' }
            );
            return result;
        }
        /**
         * 输入过滤提条件
         */
        getSuggestData = async (query) => {
            if (query) {
                var comp = this.context.getContextComponent(this.props.yigoid);
                let { itemKey, itemFilters, stateMask, key } = comp.metaObj;
                let filter = await UIHandler.getDictFilter(comp, key, itemFilters, itemKey);
                let result = await UIHandler.getSuggestData(itemKey, query || '', stateMask || 1, filter);
                if (result.length > 0) {
                    this.setState({
                        loading: false,
                        items: result,
                        displayValue: result[0].caption
                    });
                }
            }
        }
        /**
         * 翻页
         */
        onLoadMore = async () => {
            var nextPage = this.state.currentPage + 1;
            if (this.state.loading)
                return;
            this.setState({
                loading: true
            })
            var result = await this.loadPage(nextPage);
            var items = [...this.state.items, ...result.data];
            let hasMore = true;
            if (items.length === result.totalRowCount) {
                hasMore = false;
            }
            this.setState({
                hasMore,
                loading: false,
                items,
                currentPage: nextPage,
                fromCache: false,
            });
        }
        /**
         * 当包含的内容发生数据变化的时候触发，传入参数v，可以有两种形式
         * string和Object,Object的话，必须包含属性label和value
         * @param  {Ojbect,String} v [description]
         * @return
         */
        onValueChange(v) {
            this.context.onValueChange(this.props.yigoid, v);
        }

        async updateDisplayValue() {
            // await waitToTransitionEnd();
            if (this.state.state.get('isVirtual')) { //如果是虚拟状态
                return;
            }
            const comp = this.context.getContextComponent(this.props.yigoid)
            const v = this.state.state.get('value');
            let lastV = this.state.value;
            const result = {
                textLoading: false,
            };
            if (v != lastV) {
                let text = await comp.calculateDisplayValue(v);
                result.value = v;
                result.displayValue = text;
                result.textLoading = false;
                // if (this.mounted) {
                //     this.setState({
                //         value: v,
                //         displayValue: text ,
                //         textLoading : false ,
                //     });
                // }
            }
            // const form = this.context.getBillForm();
            // if(comp.getMetaObj().visible){
            //     result.visible = await form.form.evalFormula(comp.getMetaObj().visible);
            // }else{
            //     result.visible = true;
            // }
            // if(comp.getMetaObj().enable){
            //     result.enable= await form.form.evalFormula(comp.getMetaObj().enable);
            // }else{
            //     result.enable = true;
            // }
            if (this.mounted) {
                this.setState(result);
            }
        }

        componentWillUnmount() {
            this.mounted = false;
            this.backHandler && this.backHandler();
        }

        async componentWillMount() {
            if (this.props.inline) {
                const provider = this.getCacheProvider();
                const filter = await this.checkDict();
                this.setState({
                    filter,
                });
                if (this.props.useCache) {
                    let cacheData = await provider.getItem(this.props.cacheKey);
                    cacheData = cacheData || [];
                    this.setState({
                        loading: false,
                        items: cacheData,
                        fromCache: true,
                        hasMore: false,
                    });
                } else if (this.props.autoLoad) { //只有autoLoad属性为true的时候才会在弹出列表的时候直接加载数据
                    this.onQuery('');
                }
            }
        }

        async componentDidMount() {
            this.mounted = true;
            if (!this.inline) {
                await this.updateDisplayValue();
            }
        }

        async componentDidUpdate() {
            if (!this.inline) {
                await this.updateDisplayValue();
            }
        }
        async onShowPopup() {
            // if (this.state.items && this.state.items.length > 0) {
            //     this.setState({
            //         modalVisible: true
            //     });
            // } else {
            this.setState({
                modalVisible: true,
            });
            const provider = this.getCacheProvider();
            const filter = await this.checkDict();
            this.setState({
                filter,
            });
            if (this.props.useCache) {
                let cacheData = await provider.getItem(this.props.cacheKey);
                cacheData = cacheData || [];
                this.setState({
                    loading: false,
                    items: cacheData,
                    fromCache: true,
                    hasMore: false,
                });
            } else if (this.props.autoLoad) { //只有autoLoad属性为true的时候才会在弹出列表的时候直接加载数据
                this.onQuery('');
            }
            // }
            getHistory().push(`#${this.props.yigoid}_popup`, false);
            this.backHandler = BackHandler.addPreEventListener(() => {
                this.onHidePopup();
            });
        }

        onHidePopup() {
            this.setState({
                modalVisible: false,
            });
            this.backHandler && this.backHandler();
        }
        getBuddyCaption() {
            const comp = this.context.getContextComponent(this.props.yigoid);
            if (!comp) {
                return '';
            }
            const buddyYigoId = comp.getMetaObj().buddyKey;
            if (buddyYigoId) {
                const buddyComp = this.context.getContextComponent(buddyYigoId);
                if (buddyComp) {
                    return buddyComp.getMetaObj().caption;
                }
            }
            return comp.getMetaObj().caption;
        }
        formatMessage = (msg) => {
            if (this.context.intl) {
                return this.context.intl.formatMessage({ id: msg });
            }
            return msg;
        }
        render() {
            const { onChange, onQuery, onChangePopupState, onLoadMore, ...others } = this.props;
            var state = this.state.state;
            const comp = this.context.getContextComponent(this.props.yigoid);
            const caption = this.getBuddyCaption();
            return (<BaseComponent
                {...comp && comp.metaObj}
                caption=""
                textLoading={this.state.textLoading}
                disabled={!this.state.enable}
                visible={!!this.state.visible}
                disabled={!state.get('enable')}
                hasMore={this.state.hasMore}
                visible={state.get('visible')}
                controlState={state}
                caption={caption}
                items={this.state.items}
                displayValue={this.state.displayValue}
                loading={this.state.loading}
                modalVisible={this.state.modalVisible}
                onChangePopupState={this.onChangePopupState}
                onChange={this.onChange}
                onQuery={this.onQuery}
                onLoadMore={this.onLoadMore}
                suggestData={this.getSuggestData}
                fromCache={this.state.fromCache}
                {...others}
            />);
        }
    }
    return YESDictControlWrapComponent;
};

var totalWrap = (BaseComponent, checkDict) => {
    return Container.create(ControlWrap(layoutWrap(BaseComponent), checkDict), { withProps: true, withContext: true });
};
export default totalWrap;
