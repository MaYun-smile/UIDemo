/**
 * Created by avocado on 3/15/17.
 */
import React, { PureComponent, PropTypes } from 'react';
import {
    StyleSheet,
} from 'react-native';
import {
    Cell,
} from 'react-native-tableview-simple';
import { propTypes } from 'yes'; // eslint-disable-line

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        minHeight: 48,
        textAlign: 'center',
        paddingTop: 16,
        paddingBottom: 16,
    },
});

export default class theCell extends PureComponent {
    render() {
        const Comp = this.props.Comp;
        return (
            <Cell
                cellStyle="Basic"
                title={this.props.title}
                cellAccessoryView={<Comp
                    style={{ text: styles.text, container: styles.container }}
                    yigoid={this.props.yigoid}
                />}
            />
        );
    }
}
theCell.propTypes = propTypes.Cell;
