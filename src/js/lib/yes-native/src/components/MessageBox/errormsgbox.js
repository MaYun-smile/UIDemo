import React, { PureComponent } from 'react';
import MessageBox from './msgbox';
import { Svr, YESException } from 'yes-core';
import { View, ActivityIndicator } from 'react-native';
import styles from '../../style';

console.log(YESException);
export default class ErrorMessageBox extends PureComponent {
    state = {
        message: '',
    }

    isYESError() {
        return this.props.error.code;
    }

    async componentWillMount() {
        if (this.state.message === '' && this.isYESError()) {
            const message = await Svr.SvrMgr.getErrorMsg(this.props.error.code, this.props.error.args);
            this.setState({
                message,
            });
            // YIUI.ViewException.throwException(YIUI.ViewException.NO_COMPONENT, config.tagName);
        } else {
            this.setState({
                message: this.props.error.message,
            });
        }
    }

    render() {
        let msg = this.state.message;
        if (this.state.message === '') {
            msg = (<View style={[styles.flex1, styles.centerchildren]}>
                <ActivityIndicator size="small" color="cadetblue" />
            </View>);
        }
        return (<MessageBox {...this.props} message={msg} />);
    }
}
