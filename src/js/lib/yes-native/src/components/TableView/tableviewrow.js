import React, { PropTypes, PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { TableViewRowWrap } from 'yes';
import TableViewRowItem from './tableviewrowitem';

class TableViewRow extends PureComponent {
    removePx(v){
        if(!v){
            return '';
        }
        return Number(v.replace('px',''));
    }
    removePercent(v){
        if(!v){
            return '';
        }
        return Number(v.replace('%',''));
    }
    isPercent(v){
        return /\d+\%/.test(v);
    }
    generateRowLayout(){
        let layoutStyles = {};
        this.props.backColor && (layoutStyles['backgroundColor'] = this.props.backColor);
        this.props.padding && (layoutStyles['padding'] = this.removePx(this.props.padding));
        this.props.leftPadding && (layoutStyles['paddingLeft'] = Number(this.removePx(this.props.leftPadding)));
        this.props.rightPadding && (layoutStyles['paddingRight'] = this.removePx(this.props.rightPadding));
        this.props.topPadding && (layoutStyles['paddingTop'] = this.removePx(this.props.topPadding));
        this.props.bottomPadding && (layoutStyles['paddingBottom'] = this.removePx(this.props.bottomPadding));
        this.props.margin && (layoutStyles['margin'] = this.removePx(this.props.margin));
        this.props.leftMargin && (layoutStyles['marginLeft'] = this.removePx(this.props.leftMargin));
        this.props.rightMargin && (layoutStyles['marginRight'] = Number( this.removePx(this.props.rightMargin) ) );
        this.props.topMargin && (layoutStyles['marginTop'] = this.removePx(this.props.topMargin));
        this.props.bottomMargin && (layoutStyles['marginBottom'] = this.removePx(this.props.bottomMargin));
        this.props.borderColor && (layoutStyles['borderColor'] = this.borderColor);
        this.props.borderColor && (layoutStyles['borderWidth'] = 1);
        this.props.borderRadius && (layoutStyles['borderRadius'] = this.borderRadius);
        return layoutStyles;
    }
    generateRowItems(){
        const data = this.props.data;
        const layoutStyles = this.generateRowLayout();
        return data.map((row,index)=>{
            return <TableViewRowItem
                onPress={this.props.onPress}
                layoutStyles={layoutStyles}
                hasRowClickEvent={!!this.props.metaObj.RowClick}
                rootYigoId={this.props.root.metaObj.key}
                TableKey={this.props.TableKey}
                data={row}
                rowIndex={index}
                key={index}
            />
        });
    }
    render(){
        return (
            <View>
                { this.generateRowItems() }
            </View>
        )
    }
}

export default TableViewRowWrap(TableViewRow);