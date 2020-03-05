import React, { Component } from 'react';
import login from '../api/checkLogin';
// import AppDispatcher from '../dispatchers/AppDispatcher';
// import { Logining as logining } from '../actions/AppStatusAction';

export default function ppHOC(WrappedComponent, mode = 2) {
    return class PP extends Component {
        handleClickLogin = (user, password, params, md) => {
            login({
                user,
                password,
                mode: md || mode,
            }, params);
            // AppDispatcher.dispatch(logininm(
            //     {
            //         user,
            //         password,
            //         mode,
            //     }
            // ));
        }
        render() {
            return (
                <WrappedComponent
                    handleClickLogin={this.handleClickLogin}
                    {...this.props}
                />
            );
        }
    };
}
