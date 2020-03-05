/*
 * @Author: gmf
 * @Date:   2016-03-29 11:10:01
 * @Last Modified by:   zjy
 * @Last Modified time: 2016-07-14 09:18:38
 */

import React, { PureComponent } from 'react';
import { View, ActivityIndicator, Modal } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import PropTypes from 'prop-types';
import { GridRowWrap as gridRowWrap } from 'yes';
import CellLayoutRowDetail from './GridRowDetail';

function withDetail(Grid) {
    return class YESVirtualGrid extends PureComponent {
        static contextTypes = {
            getContextComponent: PropTypes.func,
        }
        static defaultProps = {
            clickMode: 'detail',
        }
        onShowDetail = (rowIndex) => {
            if (this.props.clickMode === 'detail') {
                this.props.onRowDetail(rowIndex);
            }
            if (this.props.clickMode === 'button') {
                const grid = this.context.getContextComponent(this.props.yigoid);
                grid.doOnCellClick(rowIndex, this.props.clickYigoId);
            }
        }
        onCloseModal = () => {
            this.props.onHideDetail();
        }

        defaultDetailView = () => <CellLayoutRowDetail />

        NewView = gridRowWrap(View, ActivityIndicator, this.props.yigoid)
        render() {
            let detailView = null;
            if (this.props.clickMode !== 'detail') {
                return <Grid onRowClick={this.onShowDetail} {...this.props} />;
            }
            if (this.props.detailVisible) {
                detailView = (<Modal
                    animationType={"slide"}
                    transparent={false}
                    onRequestClose={this.onCloseModal}
                    visible={this.props.detailVisible}
                >
                    <this.NewView
                        rowIndex={this.props.detailRow}
                    >
                        <Toolbar
                            leftElement="close"
                            centerElement={this.props.detailViewTitle || ''}
                            onLeftElementPress={this.onCloseModal}
                        />
                        {this.props.detailView ? this.props.detailView : this.defaultDetailView()}
                    </this.NewView>
                </Modal>);
            }
            return (
                <View style={{ flex: 1 }}>
                    <Grid onRowClick={this.onShowDetail} {...this.props} />
                    {detailView}
                </View>
            );
        }
    };
}
export default withDetail;
