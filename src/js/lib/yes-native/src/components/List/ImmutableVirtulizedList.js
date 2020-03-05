import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VirtualizedList } from 'react-native';
const VIEWABILITY_CONFIG = {
    minimumViewTime: 3000,
    viewAreaCoveragePercentThreshold: 100,
    waitForInteraction: true,
};
class YESList extends Component {
    static propTypes = {
        rowHeight: PropTypes.number,
        data: PropTypes.any,
    }
    getItem = (items, index) =>
        items.get(index);
    getItemCount = (items) => {
        if (!items) {
            return 0;
        }
        const size = items.size || 0;
        return size;
    }
    getItemLayout = (item, index) => {
        const rowHeight = this.props.rowHeight || 40;
        return {
            length: rowHeight,
            offset: rowHeight * index,
            index,
        };
    }
    keyExtractor = (items, index) =>
        String(index);
    shouldItemUpdate() {
        return this.props.shouldItemUpdate && this.props.shouldItemUpdate();
    }
    render() {
        return (<VirtualizedList
            viewabilityConfig={VIEWABILITY_CONFIG}
            data={this.props.data}
            getItem={this.getItem}
            windowSize={12}
            initialNumToRender={20}
            getItemLayout={this.props.rowHeight ? this.getItemLayout : null}
            shouldItemUpdate={this.shouldItemUpdate}
            getItemCount={this.getItemCount}
            keyExtractor={this.keyExtractor}
            {...this.props}
        />);
    }
}
export default YESList;
