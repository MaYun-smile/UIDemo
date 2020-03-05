/*
 * @Author: gmf
 * @Date:   2016-03-29 11:10:01
 * @Last Modified by:   zjy
 * @Last Modified time: 2016-07-14 09:18:38
 */

import React, {Component} from "react";
import {AutoSizer, VirtualScroll} from "react-virtualized";
import s from "react-virtualized/styles.css";
import empty from "empty";
import RefreshIndicator from "material-ui/RefreshIndicator";
class YESVirtualGrid extends Component {
    static defaultProps = {
        onRowDetail: empty.func,
    }

    onClick(rowIndex) {
        this.props.onRowDetail(rowIndex);
    }

    rowRender(index) {
        var state = this.props.controlState;
        var item = state.getIn(['dataModel', 'data', index]);
        return React.cloneElement(this.props.template(item, index), {
            rowIndex: index,
            onTouchTap: () => this.onClick(index),
        });
    }

    noRowRender() {
        return <div className="nodata"></div>;
    }

    render() {
        var state = this.props.controlState;
        if (state.get('loading')) {
            return (<div className="fittoparent flexbox flex-1 flex-just-center flex-align-center">
                <RefreshIndicator
                    size={50}
                    left={0}
                    top={0}
                    status="loading"
                    style={{position: 'relative'}}
                />
            </div>);
        }
        var rowsCount = state.getIn(['dataModel', 'data']).size;
        var scrollToIndex = this.props.scrollToIndex || 0;
        return (
            <div className="fittoparent">
                <AutoSizer>
                    {({height, width}) => (
                        <VirtualScroll
                            ref="VirtualScroll"
                            overscanRowsCount={5}
                            noRowsRenderer={() => this.noRowRender()}
                            rowsCount={rowsCount}
                            rowHeight={88}
                            height={height}
                            width={width}
                            scrollToIndex={scrollToIndex}
                            rowRenderer={(index) => this.rowRender(index)}
                        >
                        </VirtualScroll>
                    )}
                </AutoSizer>
            </div>
        );
    }
}
s._insertCss();
export default YESVirtualGrid;
