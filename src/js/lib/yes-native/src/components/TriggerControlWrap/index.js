// for unified loading, not for render modal
/* eslint-disable no-use-before-define */
import React, { Component } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text, ActivityIndicator, StyleSheet } from 'react-native'; // eslint-disable-line
import Icon from 'react-native-vector-icons/FontAwesome';
import { propTypes } from 'yes'; // eslint-disable-line
const styles = {
    containerStyle: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        overflow: 'hidden',
    },
    virtualStyle: {
        flex: 1,
        width: '100%',
        height: '50%',
        maxHeight: '50%',
        backgroundColor: 'lightgray',
    },
    textConainerStyle: {
        flexDirection: 'row',
    },
    textStyle: {
        display: 'flex',
        flex: 1,
        textAlign: 'right',
        // minHeight: 48,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 'auto',
        paddingBottom: 'auto',
    },
    iconContainerStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
    },
};

function TriggerControlWrap(WrappedComponent) {
    class TriggerControl extends Component {
        static contextTypes = {
            uiTheme: PropTypes.object.isRequired,
        };
        static defaultProps = {
            isVirtual: false,
            visible: true,
        };
        static propTypes = propTypes.TriggerControlWrap;
        handlePress = () => {
            if (!this.props.disabled) {
                this.props.onChangePopupState(true);
            }
        };

        render() {
            // TODO displayValue 传来的不对，如果onlyDate,那么只应该传递年月日，不应该传来时分秒
            const { visible, isVirtual, textLoading, layoutStyles, textStyles, displayValue, onlyShow, disabled } = this.props;
            if (!visible) {
                return null;
            }
            const { disabledColor } = this.context.uiTheme.palette;
            if (isVirtual) {
                return (
                    <View
                        style={styles.containerStyle}
                    >
                        <View
                            style={styles.virtualStyle}
                            onPress={this.handlePress}
                        />
                    </View>
                );
            }
            if (textLoading) {
                return (
                    <View
                        style={{
                            ...this.props.layoutStyles,
                            ...styles.containerStyle,
                        }}
                    >
                        <ActivityIndicator size="small" />
                    </View>
                );
            }
            // if onlyShow, render textElement only;
            const textElement = (
                <View
                    style={{
                        ...styles.textConainerStyle,
                        // height: '100%',
                        top: 0,
                        left: 0,
                        overflow: 'hidden',
                    }}
                >
                    <Text
                        style={{
                            ...styles.textStyle,
                            ...textStyles,
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {displayValue}
                    </Text>
                </View>
            );
            if (onlyShow) {
                return textElement;
            }
            // if not onlyShow, determine whether disabled
            let iconName;
            switch (WrappedComponent.YigoType) {
                case 'datepicker':
                    iconName = 'calendar';
                    break;
                default:
                    iconName = '';
            }
            const iconColor = onlyShow ? disabledColor : '';
            const iconElement = (
                <View
                    style={{...styles.iconContainerStyle,...this.props.layoutStyles}}
                >
                    <Icon
                        name={iconName}
                        style={{
                            color: iconColor,
                        }}
                    />
                </View>
            );

            const wrappedElement = (
                <View
                    style={styles.containerStyle}
                >
                    <WrappedComponent {...this.props} />
                    {textElement}
                    {/* Delete icon temporarily for the color of icon and the color of text are not unified.{iconElement}*/}
                </View>
            );

            if (disabled) {
                return (
                    <View
                        style={{...styles.containerStyle,...this.props.layoutStyles}}
                    >
                        {textElement}
                    </View>
                );
            }
            return (
                <TouchableOpacity
                    onPress={this.handlePress}
                    style={{
                        ...layoutStyles,
                        ...styles.containerStyle,
                    }}
                    textStyles={{
                        ...textStyles,
                        ...styles.textStyle,
                    }}
                    fakeProps
                >
                    {wrappedElement}
                </TouchableOpacity>
            );
        }
    }

    return TriggerControl;
}

export default TriggerControlWrap;

