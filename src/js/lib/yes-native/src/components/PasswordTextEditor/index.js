import React, { PureComponent } from 'react';
import YESText from '../Text';

const ppHOC = (WrappedComponent) => { // eslint-disable-line arrow-body-style
    return class PP extends PureComponent {
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    password
                />
            );
        }
    };
};

const PasswordTextEditor = ppHOC(YESText);
export default PasswordTextEditor;
