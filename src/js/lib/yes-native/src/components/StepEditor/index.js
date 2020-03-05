import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { propTypes } from 'yes'; // eslint-disable-line
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = {
    container: {
        flexDirection: 'row',
    },
    text: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
};

export default class StepEditor extends PureComponent {
    onMinus = () => {
        const v = this.props.controlState.get('value');
        let newV = Number(v - this.props.step);
        newV = newV < this.props.minValue ? this.props.minValue : newV;
        this.props.onChange(newV);
    }
    onAdd = () => {
        const v = this.props.controlState.get('value');
        let newV = Number(v + this.props.step);
        newV = newV > this.props.maxValue ? this.props.maxValue : newV;
        this.props.onChange(newV);
    }
    render() {
        return (
            <View
                style={{
                    ...styles.container,
                    ...this.props.layoutStyles,
                }}
            >
                <Icon
                    name="minus"
                    size={10}
                    onClick={this.onMinus}
                    style={styles.icon}
                />
                <Text
                    style={styles.text}
                >{this.props.displayValue}</Text>
                <Icon
                    name="plus"
                    onClick={this.onAdd}
                    size={10}
                    style={styles.icon}
                />
            </View>
        );
    }
}

StepEditor.propTypes = propTypes.StepEditor;
