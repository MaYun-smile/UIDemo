import React, { PureComponent } from 'react';
// eslint-disable-next-line import/no-unresolved
import { StyleSheet, Text, View, TextInput, Image, TouchableHighlight } from 'react-native';
// TODO eslint-import-resolver-webpack
import { propTypes } from 'yes'; // eslint-disable-line
import { Icon } from 'react-native-material-ui';
import template from 'lodash/template';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        overflow: 'hidden',
    },
    textStyle: {
        flex: 1,
        wordBreak: 'break-all',
    },
    textAreaStyle: {
        padding: 9,
    },
    focused: {
        // outline: 'none',
    },
    image: {
        width: 24,
        height: 24,
    },
});

class YESText extends PureComponent {
    constructor(props) {
        super(props);
        if (this.props.format) {
            this.formatFunc = template(this.props.format);
        }
        this.state = {
            text: this.formatDisplayValue(this.props),
            isFocused: false,
            passwordShow: false,
            secureTextEntry: this.props.password,
        };
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.changeText = this.changeText.bind(this);
    }

    handleBlur() {
        this.setState({ isFocused: false });
        this.props.onChange(this.state.text);
    }

    handleFocus() {
        this.setState({ isFocused: true });
    }

    formatDisplayValue(props) {
        if (this.formatFunc) {
            return this.formatFunc(props);
        }
        return props.displayValue;
    }

    changeText(text) {
        let { caseType } = this.props;
        let newText;
        caseType = caseType && caseType.toString();
        switch (caseType) {
            case '1': // 全部小写
                newText = text.toLowerCase();
                break;
            case '2': // 全部大写
                newText = text.toUpperCase();
                break;
            case '0': // 根据键盘输入来
            default:
                newText = text;
        }
        this.setState({ text: newText });
    }
    focusTextInput = () => {
        this.textInput.blur();
        this.textInput.focus();
    }
    togglePassword = () => {
        this.setState({
            passwordShow: !this.state.passwordShow,
            secureTextEntry: !this.state.secureTextEntry,
        }, () => {
            this.focusTextInput();
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            text: this.formatDisplayValue(nextProps),
        });
    }

    render() {
        const { promptText, embedText, preIcon, icon, maxLength, password, keyboardType } = this.props;
        const { secureTextEntry, passwordShow } = this.state;

        if (!!this.props.disabled) {
            return (
                <View
                    style={[styles.container, this.props.layoutStyles]}
                >
                    <Text style={[styles.textStyle, this.props.textStyles]}>{this.state.text}</Text>
                </View>
            );
        }

        let multiline = false;
        let maxNumberOfLines = 3;
        let numberOfLines = 1;
        if (this.props.layoutStyles && this.props.layoutStyles.height) {
            const { height } = this.props.layoutStyles;
            numberOfLines = Math.floor(height / 30);
            maxNumberOfLines = numberOfLines * 2;
            if (numberOfLines > 1) {
                multiline = true;
            }
        }

        return (
            <View
                style={[styles.container, this.props.layoutStyles]}
            >
                {
                    preIcon ?
                        <Image
                            style={styles.image}
                            source={{ uri: preIcon }}
                        />
                        : null

                }
                {/* <Text style={[styles.textStyle,this.props.textStyles]}>{embedText}</Text> */}
                <TextInput
                    ref={(input) => { this.textInput = input; }}
                    keyboardType={keyboardType}
                    size={1}
                    onChangeText={this.changeText}
                    defaultValue={this.props.displayValue}
                    value={this.state.text}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    style={[
                        styles.textStyle,
                        this.props.textStyles,
                        {
                            // outlineColor: 'transparent',
                            height: this.props.layoutStyles && this.props.layoutStyles.height,
                        },
                        styles.textAreaStyle,
                        this.state.isFocused && styles.focused,
                    ]}
                    maxLength={maxLength}
                    maxNumberOfLines={maxNumberOfLines}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    placeholder={promptText}
                    secureTextEntry={secureTextEntry}
                />
                {
                    icon ?
                        <Image
                            style={styles.image}
                            source={{ uri: icon }}
                        />
                        : null

                }
                {
                    password ? (
                        <TouchableHighlight
                            onPress={this.togglePassword}
                            underlayColor="transparent"
                        >
                            <View>
                                <Icon
                                    name={passwordShow ? 'visibility' : 'visibility-off'}
                                />
                            </View>
                        </TouchableHighlight>) :
                        null
                }
            </View>
        );
    }
}

Text.propTypes = propTypes.Text;
export default YESText;
