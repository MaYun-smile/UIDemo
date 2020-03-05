'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import ImmutableVirtualizedList from './ImmutableVirtulizedList';
import { ListRowWrap as listRowWrap, DynamicControl } from 'yes';
import TimelineTime from './TimelineTime'; 
import Icon from 'react-native-vector-icons/FontAwesome';

const defaultCircleSize = 16;
const defaultCircleColor = '#007AFF';
const defaultLineWidth = 2;
const defaultTimeWidth = 80;
const defaultLineColor = '#007AFF';
const defaultTimeTextColor = 'black';
const defaultDotColor = 'white';
const defaultInnerCircle = 'none';

export default class Timeline extends Component {
    constructor(props, context) {
        super(props, context);

        this._renderRow = this._renderRow.bind(this);
        this.renderTime = (this.props.renderTime
            ? this.props.renderTime
            : this._renderTime
        ).bind(this);
        this.renderDetail = (this.props.renderDetail
            ? this.props.renderDetail
            : this._renderDetail
        ).bind(this);
        this.renderCircle = (this.props.renderCircle
            ? this.props.renderCircle
            : this._renderCircle
        ).bind(this);
        this.renderEvent = this._renderEvent.bind(this);

        this.state = {
            x: 0,
            width: 0,
        };
    }

    NewListItem = listRowWrap(View, this.props.yigoid)

    render() {
        const { controlState, layoutStyles } = this.props;
        if (controlState && controlState.get('isVirtual')) {
            return (
                <View style={[styles.flex1, styles.centerchildren, layoutStyles]}>
                    <ActivityIndicator size="large" color="cadetblue" />
                </View>
            );
        }
        return (
            <View style={[styles.container, this.props.style]}>
                <ImmutableVirtualizedList
                    style={[styles.listview, this.props.listViewStyle]}
                    data={controlState.get('data')}
                    renderItem={this._renderRow}
                    {...this.props.options}
                />
            </View>
        );
    }

    _renderRow({ item, index }/* rowData, sectionID, rowID*/) {
        let content = null;
        const NewListItem = this.NewListItem;
        switch (this.props.columnFormat) {
            case 'single-column-left':
                content = (
                    <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
                        {this.renderTime(item, index)}
                        {this.renderEvent(item, index)}
                        {this.renderCircle(item, index)}
                    </View>
                );
                break;
            case 'single-column-right':
                content = (
                    <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
                        {this.renderEvent(item, index)}
                        {this.renderTime(item, index)}
                        {this.renderCircle(item, index)}
                    </View>
                );
                break;
            case 'two-column':
                content =
                    rowID % 2 == 0 ? (
                        <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
                            {this.renderTime(item, index)}
                            {this.renderEvent(item, index)}
                            {this.renderCircle(item, index)}
                        </View>
                    ) : (
                            <View style={[styles.rowContainer, this.props.rowContainerStyle]}>
                                {this.renderEvent(item, index)}
                                {this.renderTime(item, index)}
                                {this.renderCircle(item, index)}
                            </View>
                        );
                break;
        }
        return (<NewListItem
            key={index}
            rowIndex={index}
        >{content}</NewListItem>);
    }

    _renderTime(rowData, sectionID, rowID) {
        if (!this.props.showTime) {
            return null;
        }
        var timeWrapper = null;
        switch (this.props.columnFormat) {
            case 'single-column-left':
                timeWrapper = {
                    alignItems: 'flex-end',
                };
                break;
            case 'single-column-right':
                timeWrapper = {
                    alignItems: 'flex-start',
                };
                break;
            case 'two-column':
                timeWrapper = {
                    flex: 1,
                    alignItems: rowID % 2 == 0 ? 'flex-end' : 'flex-start',
                };
                break;
        }
        return (
            <View style={timeWrapper}>
                <View style={[styles.timeContainer, this.props.timeContainerStyle]}>
                    {this.renderTimeControl()}
                </View>
            </View>
        );
    }

    renderTimeControl() {
        if (typeof this.props.timeColumn === 'string') {
            return <TimelineTime yigoid={this.props.timeColumn} />;
        }
        return this.props.timeColumn;
    }

    _renderEvent(rowData, index) {
        const lineWidth = this.props.lineWidth;
        const isLast = this.props.renderFullLine
            ? !this.props.renderFullLine
            : this.props.controlState.get('data').size === index + 1;
        const lineColor = isLast
            ? 'rgba(0,0,0,0)'
            : this.props.lineColor;
        let opStyle = null;

        switch (this.props.columnFormat) {
            case 'single-column-left':
                opStyle = {
                    borderColor: lineColor,
                    borderLeftWidth: lineWidth,
                    borderRightWidth: 0,
                    marginLeft: 20,
                    paddingLeft: 20,
                };
                break;
            case 'single-column-right':
                opStyle = {
                    borderColor: lineColor,
                    borderLeftWidth: 0,
                    borderRightWidth: lineWidth,
                    marginRight: 20,
                    paddingRight: 20,
                };
                break;
            case 'two-column':
                opStyle =
                    rowID % 2 == 0
                        ? {
                            borderColor: lineColor,
                            borderLeftWidth: lineWidth,
                            borderRightWidth: 0,
                            marginLeft: 20,
                            paddingLeft: 20,
                        }
                        : {
                            borderColor: lineColor,
                            borderLeftWidth: 0,
                            borderRightWidth: lineWidth,
                            marginRight: 20,
                            paddingRight: 20,
                        };
                break;
        }

        return (
            <View
                style={[styles.details, opStyle]}
            >
                <TouchableOpacity
                    disabled={this.props.onEventPress == null}
                    style={[this.props.detailContainerStyle]}
                    onPress={() =>
                        this.props.onEventPress ? this.props.onEventPress(rowData) : null
                    }
                >
                    <View style={styles.detail}>
                        {this.renderDetail(rowData, index)}
                    </View>
                    {this._renderSeparator()}
                </TouchableOpacity>
                {/* {this._renderCircle(rowData, index)} */}
            </View>
        );
    }

    renderImage(rowData, index) {
        if (!this.props.imageColumn) {
            return null;
        }
        return this.props.imageColumn;
    }

    _renderDetail(rowData, sectionID, rowID) {
        let title = this.props.descColumn || this.props.imageColumn ? (
            <View>
                {this.renderTitleControl()}
                {this.renderDescControl()}
            </View>
        ) : this.renderTitleControl();
        return <View style={styles.container}>{title}</View>;
    }

    renderTitleControl() {
        if (typeof this.props.titleColumn === 'string') {
            return (<DynamicControl
                layoutStyles={{
                    justifyContent: 'flex-start',
                    paddingBottom: 10,
                    fontWeight: 'bold',
                }} yigoid={this.props.titleColumn}
            />);
        }
        return this.props.titleColumn;
    }

    renderDescControl() {
        let desc = this.props.descColumn;
        if (typeof this.props.descColumn === 'string') {
            desc = <DynamicControl yigoid={this.props.descColumn} />;
        }
        if (!this.props.imageColumn) {
            return desc;
        }
        return (<View style={[styles.descContainer]}>
            {this.renderImage()}
            {desc}
        </View>);
    }

    _renderCircle(rowData, index) {
        var circleSize = rowData.circleSize
            ? rowData.circleSize
            : this.props.circleSize ? this.props.circleSize : defaultCircleSize;
        var circleColor = rowData.circleColor
            ? rowData.circleColor
            : this.props.circleColor ? this.props.circleColor : defaultCircleColor;
        var lineWidth = rowData.lineWidth
            ? rowData.lineWidth
            : this.props.lineWidth ? this.props.lineWidth : defaultLineWidth;

        const timeWidth = this.props.timeWidth;
        var circleStyle = null;

        switch (this.props.columnFormat) {
            case 'single-column-left':
                circleStyle = {
                    width: circleSize,
                    height: circleSize,
                    borderRadius: circleSize / 2,
                    backgroundColor: circleColor,
                    left: timeWidth + 20 - circleSize / 2 + (lineWidth) / 2,
                };
                if(this.props.innerCircle && index>0){
                    circleStyle.backgroundColor='transparent';
                }
                break;
            case 'single-column-right':
                circleStyle = {
                    width: this.state.width ? circleSize : 0,
                    height: this.state.width ? circleSize : 0,
                    borderRadius: circleSize / 2,
                    backgroundColor: circleColor,
                    left: this.state.width - circleSize / 2 - (lineWidth - 1) / 2,
                };
                break;
            case 'two-column':
                circleStyle = {
                    width: this.state.width ? circleSize : 0,
                    height: this.state.width ? circleSize : 0,
                    borderRadius: circleSize / 2,
                    backgroundColor: circleColor,
                    left: this.state.width - circleSize / 2 - (lineWidth - 1) / 2,
                };
                break;
        }

        var innerCircle = null;
        if(index>0){
            innerCircle = this.props.innerCircle;
        }
        // switch (this.props.innerCircle) {
            
            // case 'icon':
            //     let iconSource = rowData.icon ? rowData.icon : this.props.icon;
            //     let iconStyle = {
            //         height: circleSize,
            //         width: circleSize,
            //     };
            //     innerCircle = (
            //         <Icon name='home' />  
            //     );
            //     break;
            // case 'dot':
            //     let dotStyle = {
            //         height: circleSize / 2,
            //         width: circleSize / 2,
            //         borderRadius: circleSize / 4,
            //         backgroundColor: rowData.dotColor
            //             ? rowData.dotColor
            //             : this.props.dotColor ? this.props.dotColor : defaultDotColor,
            //     };
            //     innerCircle = <View style={[styles.dot, dotStyle]} />;
            //     break;
        // }
        return (
            <View style={[styles.circle, circleStyle, this.props.circleStyle]}>
                {innerCircle}
            </View>
        );
    }

    _renderSeparator() {
        if (!this.props.separator) {
            return null;
        }
        return <View style={[styles.separator, this.props.separatorStyle]} />;
    }
}

Timeline.defaultProps = {
    circleSize: defaultCircleSize,
    circleColor: defaultCircleColor,
    lineWidth: defaultLineWidth,
    lineColor: defaultLineColor,
    innerCircle: defaultInnerCircle,
    columnFormat: 'single-column-left',
    separator: false,
    showTime: true,
    timeWidth: defaultTimeWidth,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:10,
    },
    listview: {
        flex: 1,
    },
    sectionHeader: {
        marginBottom: 15,
        backgroundColor: '#007AFF',
        height: 30,
        justifyContent: 'center',
    },
    sectionHeaderText: {
        color: '#FFF',
        fontSize: 18,
        alignSelf: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        flex: 1,
        // alignItems: 'stretch',
        justifyContent: 'center',
    },
    timeContainer: {
        width: 80,
    },
    time: {
        textAlign: 'right',
        color: defaultTimeTextColor,
    },
    circle: {
        width: 16,
        height: 16,
        borderRadius: 10,
        position: 'absolute',
        left: -8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: defaultDotColor,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    details: {
        borderLeftWidth: defaultLineWidth,
        flexDirection: 'column',
        flex: 1,
    },
    detail: { paddingTop: 10, paddingBottom: 10 },
    description: {
        marginTop: 10,
    },
    descContainer: {
        flexDirection: 'row',
    },
    separator: {
        height: 1,
        backgroundColor: '#aaa',
        marginTop: 10,
        marginBottom: 10,
    },
});
