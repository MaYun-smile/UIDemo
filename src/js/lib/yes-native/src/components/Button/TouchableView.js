import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native'; // eslint-disable-line import/no-unresolved
// TODO eslint-import-resolver-webpack

const styles = {
    viewContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
};
class TouchableView extends Component {
    onPress = () => {
        const { onPress } = this.props;
        if (onPress) {
            onPress();
        }
    }

    render() {
        const { enable, style, children } = this.props;
        if (enable) {
            return (
                <TouchableHighlight
                    style={style}
                    onPress={this.onPress}
                    activeOpacity
                    underlayColor={style.highlightBackColor}
                >
                    <View
                        style={styles.viewContainer}
                    >
                        {children}
                    </View>
                </TouchableHighlight>);
        }
        return (
            <View
                style={style}
            >
                {children}
            </View>
        );
    }
}

export default TouchableView;
