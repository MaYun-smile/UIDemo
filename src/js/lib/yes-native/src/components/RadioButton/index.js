import React, { PureComponent } from 'react';
import empty from 'empty';
import { RadioButton } from 'react-native-material-ui';
import { propTypes } from 'yes'; // eslint-disable-line

const style = {
    label: {
        marginLeft: 0,
    },
};
export default class MUIRadioButton extends PureComponent {
    onCheck=(checked) => {
        this.props.onChange(this.props.metaValue);
    }
    render() {
        return (<RadioButton
            label={this.props.caption}
            checked={this.props.metaValue === this.props.displayValue}
            onCheck={this.onCheck}
            style={{ label: style.label }}
            {...this.props}
        ></RadioButton>);
    }
}
