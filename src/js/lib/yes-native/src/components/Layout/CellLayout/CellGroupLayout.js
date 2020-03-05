import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DynamicControl } from 'yes'; // eslint-disable-line import/no-unresolved
import { View } from '../../View';
import CellLayout from './CellLayout';

const styles = {
    textStyle: {
        color: 'gray',
    },
};
class CellGroupLayout extends Component {  // eslint-disable-line
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
            tagName: PropTypes.string,
            key: PropTypes.number,
            caption: PropTypes.string,
        })),
    };
    render() {
        return (
            <View style={this.props.containerStyle}>
                {
                    this.props.items.map((item) =>
                        (
                            <DynamicControl
                                yigoid={item.key}
                                isCustomLayout
                                layoutStyles={{ minHeight: 44, justifyContent: 'flex-end', alignItems: 'center', textAlign: 'right' }}
                                layout={<CellLayout divider titleStyle={styles.textStyle} title={item.caption} />}
                            />
                        )
                    )
                }
            </View>
        );
    }
}

export default CellGroupLayout;
