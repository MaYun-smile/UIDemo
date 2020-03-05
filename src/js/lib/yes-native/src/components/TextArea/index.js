import React, { PureComponent } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { propTypes } from 'yes'; // eslint-disable-line

const styles = StyleSheet.create({
    style: {
        // color: 'red',
    },
});
class YESTextArea extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { text: '' };
    }
    onBlur= () => {
        this.props.onChange(this.state.text);
    }
    onChange= (text) => {
        this.setState({ text });
    }
    render() {
        const { ...others } = this.props;
        return (
            <TextInput
                multiline
                editable={!this.disabled}
                style={[this.props.style, styles.style]}
                onBlur={this.onBlur}
                onChangeText={this.onChange}
                {...others}
            >
                {this.props.displayValue}
            </TextInput>
        );
    }
}
YESTextArea.propTypes = propTypes.TextArea;
export default YESTextArea;

