import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ControlWrap as controlWrap } from 'yes';
import dateformat from 'dateformat';
import { View } from '../View';

class DateText extends PureComponent {
    render() {
        const v = this.props.controlState.get('value');
        const t = new Date(v);
        const year = t.getYear();
        const currentYear = (new Date()).getYear();
        let formatOfDate = 'yy-mm-dd';
        if (year === currentYear) {
            formatOfDate = 'mm-dd';
        }
        const formatOfTime = 'HH:MM';
        return (
            <View
                style={[
                    styles.container, this.props.containerStyle,
                ]}
            >
                <Text>{v ? dateformat(t, formatOfDate) : ''}</Text>
                <Text>{v ? dateformat(t, formatOfTime) : ''}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
});

export default controlWrap(DateText);
