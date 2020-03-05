/*
 * @Author: gmf
 * @Date:   2016-03-17 09:22:11
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-09 09:03:20
 */
'use strict';
import React, { Component } from 'react';
import Immutable from 'immutable';
import { RadioButton } from 'material-ui/RadioButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 16,
    },
    paper: {
        padding: 16
    },
};
/**
 * 添加High Order Component
 * 主要为了包装常用的Attribute： visibale editable等
 *
 */
const ControlWrap = (BaseComponent, comp ,title ) => {
    class YESControlWrapComponent extends Component {
        static virtualState = Immutable.fromJS({
            enable: false,
            visible: true,
            editable: false,
            required: false,
            value: '',
            displayValue: '',
            items: [],
            isVirtual: true,
        })
        state = {
            modalVisible: false,
            status: 'virtual', // virtual,textloading,complete
            state: YESControlWrapComponent.virtualState,
        }
        async componentDidMount() {
            this.mounted = true;
            await this.updateDisplayValue();
        }
        async componentDidUpdate() {
            await this.updateDisplayValue();
        }
        onControlClick = () => {
            // this.context.onControlClick(this.props.yigoid, action);
            alert('clicked');
        }
        onChangePopupState = (v) => {
            if (v) {
                this.onShowPopup();
            } else {
                this.onHidePopup();
            }
        }
        onShowPopup() {
            this.setState({
                modalVisible: true,
            });
        }
        onHidePopup() {
            this.setState({
                modalVisible: false,
            });
        }
        onChange = (v) => {
            alert(v);
            comp.setValue(v);
            this.setState({
                state: comp.getState(),
            });
        }
        async updateDisplayValue() {
            if (this.state.state.get('isVirtual')) { // 如果是虚拟状态
                return;
            }
            if (this.state.status !== 'normal') {
                return;
            }
            const v = this.state.state.get('value');
            const lastV = this.state.value;
            if (v !== lastV) {
                const text = await comp.calculateDisplayValue(v);
                if (this.mounted) {
                    this.setState({
                        value: v,
                        displayValue: text,
                        textLoading: false,
                    });
                }
            }
        }
        render() {
            const state = comp.getState();
            const textLoading = this.state.status === 'textloading' ? true : this.state.textLoading;
            return (<MuiThemeProvider><Paper style={styles.paper}>
                <Subheader>{title}</Subheader>
                <div>
                    <RadioButton
                        label="virtual"
                        onClick={() => this.setState({
                            status: 'virtual',
                            state: YESControlWrapComponent.virtualState,
                        })}
                        style={styles.radioButton}
                        checked={this.state.status === 'virtual'}
                    />
                    <RadioButton
                        label="textloading"
                        onClick={() => this.setState({
                            status: 'textloading',
                            state: comp.getState(),
                        })}
                        style={styles.radioButton}
                        checked={this.state.status === 'textloading'}
                    />
                    <RadioButton
                        label="normal"
                        onClick={() => this.setState({
                            status: 'normal',
                            state: comp.getState(),
                        })}
                        style={styles.radioButton}
                        checked={this.state.status === 'normal'}
                    />
                </div>
                <BaseComponent
                    {...comp && comp.metaObj}
                    disabled={!state.get('enable')}
                    textLoading={textLoading}
                    controlState={state}
                    onChange={this.onChange}
                    onClick={this.onClick}
                    displayValue={this.state.displayValue}
                    onChangePopupState={this.onChangePopupState}
                    modalVisible={this.state.modalVisible}
                    {...this.props}
                /></Paper></MuiThemeProvider>);
        }
    }
    return YESControlWrapComponent;
};
export default ControlWrap;
