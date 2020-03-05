import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { propTypes } from 'yes';

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: 24,
        height: 24
    }
});

function Label(props) {
    return (
        <View
            style={[styles.container, props.layoutStyles]}
        >
            {
                props.icon ? <Image
                    style={styles.image}
                    source={{ uri: props.icon }}
                /> : null
            }
            <Text style={[props.textStyles]}>{props.displayValue}</Text>
        </View>
    );
}
Label.propTypes = propTypes.Label;
export default Label;
