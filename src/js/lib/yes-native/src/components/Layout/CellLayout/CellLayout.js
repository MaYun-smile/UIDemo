import React, { PureComponent, PropTypes } from 'react';
import {
    Cell,
} from 'react-native-tableview-simple';
import { Divider } from 'react-native-material-ui';
import { View, StyleSheet, Text } from 'react-native';
class CellLayout extends PureComponent {
    static PropTypes = {
        children: PropTypes.element,
        title: PropTypes.string,
        visible: PropTypes.bool,
        disabled: PropTypes.bool,
        divider: PropTypes.bool,
        style: View.propTypes.style,
    };
    render() {
        if (!this.props.visible) {
            return null;
        }
        const AccessoryView = React.cloneElement(
            this.props.children
        );
        return (
            <View>
                <Cell
                    cellStyle="Basic"
                    title={this.props.title}
                    cellContentView={
                        (<View style={styles.contentView}>
                            <Text
                                numberOfLines={2}
                                style={styles.title}
                            >
                                {this.props.title || this.props.caption}
                            </Text>
                        </View>)
                    }
                    cellAccessoryView={
                        /* eslint-disable */
                        <View style={[styles.container, this.props.style]}>{AccessoryView}</View>
                        /* eslint-enable */
                    }
                />
                {this.props.divider ? <Divider /> : false}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexBasis: 0,
    },
    contentView: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        flexBasis: 0,
        paddingVertical: 10,
    },
    title: {
        fontSize: 16,
        letterSpacing: -0.32,
        flex: 1,
    }
});
export default CellLayout;
