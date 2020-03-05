import React, { PureComponent } from 'react';
import { Text, Image, StyleSheet } from 'react-native'; // eslint-disable-line import/no-unresolved
// TODO eslint-import-resolver-webpack
import TouchableView from './TouchableView';

const defaultBackgroundColor = '#FFFFFF';
const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultBackgroundColor,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        flex: 1,
        textAlign: 'center',
    },
    image: {
        width: 24,
        height: 24,
    },
});

class Button extends PureComponent {
    onClick = () => {
        const { onClick } = this.props;
        if (onClick) {
            onClick();
        }
    }
    renderIcon = () => {
        const { icon } = this.props;
        if (!icon) {
            return null;
        }
        return (
            <Image
                style={styles.image}
                source={{ uri: icon }}
            />
        );
    }
    renderText = () => {
        const { caption, textStyles } = this.props;

        return caption === 'OnlyIcon' ?
            null :
            (<Text
                style={[textStyles, styles.text]}
            >
                {caption}
            </Text>);
    }
    // TODO 3, 点击动画
    render() {
        const { controlState, layoutStyles } = this.props;
        return (
            <TouchableView
                style={[
                    styles.container,
                    layoutStyles,
                ]}
                enable={controlState.get('enable')}
                onPress={this.onClick}
            >
                {this.renderIcon()}
                {this.renderText()}
            </TouchableView>

        );
    }
}

export default Button;
