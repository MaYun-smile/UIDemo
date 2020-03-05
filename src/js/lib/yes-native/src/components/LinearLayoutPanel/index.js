import React, { Component } from 'react';
import { defaultControlMapping, DynamicControl, propTypes } from 'yes'; // eslint-disable-line
import { View, Text } from 'react-native';

class LinearLayoutPanel extends Component {
    /**
     * 生成子控件对应的布局相关属性
     * @param {*子控件} comp 
     */
    generateLayoutStyle(comp){
        //这里需要针对子控件计算高度和宽度
        //YIGO中支持 pref和auto两种 高度和宽度的规则，在react-native中不支持的需要进行转换
        //LinearLayout中需要进行处理的有一下几个属性
        //1.hAlign
        //  水品对齐方式，这个根据当前的Orientation，转换成flex中的alignItems或者justifyContent
        //2.vAlign
        //  同hAlign
        //3.width
        //  pref是根据内容大小确定你给width大小，所以可以设置width,
        //  auto对应flex:1
        //  百分比直接使用
        //  数字直接hi用
        //4.heigh
        //  同width
        let width = comp.width;
        let height = comp.height;
        let vAlign = comp.getMetaObj().vAlign;
        let hAlign = comp.getMetaObj().hAlign;
        let weight = comp.getMetaObj().weight;
        const style = {};
        if(this.props.Orientation===1){//column direction
            if(height==="auto"){
                style['flex'] = 1;
                // width = null;
            }else{
                if(height!=='pref'){
                    style['height']=height;
                }
            }
            if(width!=='auto' && width!=='pref'){
                style['width']=width;
            }

            if(weight){
                style['flex'] = weight;
            }

            // if(vAlign!=null){//设置了vAlign
            //     style['justifyContent'] = vAlign===0?'flex-start':(vAlign===1?'center':'flex-end');
            // }else{//没有设置则默认从最上往下排
            //     style['justifyContent'] = 'flex-start'
            // }
            // if(hAlign!=null){
            //     style['alignItems']= hAlign===0?'flex-start':(hAlign===1?'center':'flex-end');
            // }else{
            //     style['alignItems']='flex-start';
            // }
        }else{//row direction
            if(width==="auto"){
                style['flex'] = 1;
                // width = null;
            }else{
                if(width!=='pref'){
                    style['width']=width;
                }
            }
            if(height!=='auto' && height!=='pref'){
                style['height']=height;
            }

            if(weight){
                style['flex'] = weight;
            }
            // if(vAlign!=null){//设置了vAlign
            //     style['alignItems']= vAlign===0?'flex-start':(vAlign===1?'center':'flex-end');
            // }else{//没有设置则默认从最上往下排
            //     style['alignItems']='flex-start';
            // }
            // if(hAlign!=null){
            //     style['justifyContent'] = hAlign===0?'flex-start':(hAlign===1?'center':'flex-end');
            // }else{
            //     style['justifyContent'] = 'flex-start'
            // }
        }
        return style;
    }
    render() {
        let style = {
            flexDirection: this.props.Orientation === 1 ? 'column' : 'row',
        };
        if (this.props.layoutStyles) {
            style = Object.assign(style, this.props.layoutStyles);
        }
        return (
            <View
                style={style}
            >
                {this.props.items.map((item) => {
                    // console.log('linearyLayout', item.metaObj.key || item.key);
                    const styles = this.generateLayoutStyle(item);
                    return <DynamicControl 
                                layoutStyles = {styles}
                                key={item.metaObj.key || item.key}
                                yigoid={item.metaObj.key || item.key}
                    />
                })}
            </View>
        );
    }
}

LinearLayoutPanel.propTypes = propTypes.LinearLayoutPanel;
export default LinearLayoutPanel;
