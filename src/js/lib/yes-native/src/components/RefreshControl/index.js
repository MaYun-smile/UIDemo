import React from 'react';
import {defaultControlMapping, propTypes, DynamicControl,} from 'yes'; // eslint-disable-line
import LinearLayoutPanel from '../LinearLayoutPanel';
import { RefreshControl as RNRefreshControl, ScrollView } from 'react-native';
// refreshControl只有一个item。这个item必须是listview类似的组件
class YigoRefreshControl extends LinearLayoutPanel {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        };
    }
    onRefresh = async () => {
        const { headerScript, handleScript } = this.props;
        const sleep = () => new Promise((resolve) => {
            setTimeout(() => { resolve(); }, 2 * 1000);
        });
        try {
            // await sleep();
            await handleScript(headerScript);
        } finally {
            this.setState({ refreshing: false });
        }
    };

    render() {
        const { layoutStyles, items } = this.props;
        const item = items[0];
        let styles = this.generateLayoutStyle(item);
        styles = {
            ...styles,
            ...layoutStyles,
            width: '100%',
            flex: 1,
            position: 'relative',
            touchAction: 'none',
        };

        return (
            <ScrollView
                style={styles}
                contentContainerStyle={styles}
                refreshControl={
                    <RNRefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                        progressViewOffset={0}
                    />
                }
            >
                <DynamicControl
                    layoutStyles={styles}
                    key={item.metaObj.key || item.key}
                    yigoid={item.metaObj.key || item.key}
                />

            </ScrollView>
        );
    }
}

YigoRefreshControl.propTypes = propTypes.RefreshControl;

export default YigoRefreshControl;
