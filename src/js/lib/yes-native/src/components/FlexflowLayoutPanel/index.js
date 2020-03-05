import React, { Component } from 'react';
import { defaultControlMapping, DynamicControl, propTypes } from 'yes'; // eslint-disable-line
import { View, Text } from 'react-native';
import LinearLayoutPanel from '../LinearLayoutPanel';

class FlexflowLayoutPanel extends LinearLayoutPanel {
    render() {
        let style = {
            flexDirection: 'column',
            justifyContent: 'flex-start',
        };
        if (this.props.layoutStyles) {
            style = Object.assign(style, this.props.layoutStyles, this.props.style);
        }
        return (
            <View
                style={style}
            >
                {this.props.items.map((item) => {
                    // console.log('linearyLayout', item.metaObj.key || item.key);
                    const styles = this.generateLayoutStyle(item);
                    return (<DynamicControl
                        layoutStyles={styles}
                        key={item.metaObj.key || item.key}
                        yigoid={item.metaObj.key || item.key}
                    />);
                })}
            </View>
        );
    }
}

export default FlexflowLayoutPanel;
