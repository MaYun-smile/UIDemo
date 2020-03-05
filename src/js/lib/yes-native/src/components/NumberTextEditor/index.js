import React, { PureComponent } from 'react';
import YESText from '../Text';

const ppHOC = (WrappedComponent) => { // eslint-disable-line arrow-body-style
    return class PP extends PureComponent {
        onChange = (v) => {
            const newV = Number(v);
            this.props.onChange(newV);
        }
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    onChange={this.onChange}
                    keyboardType="numeric"
                />
            );
        }
    };
};

const PasswordTextEditor = ppHOC(YESText);
export default PasswordTextEditor;
