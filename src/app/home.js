/*
 * @Author: gmf
 * @Date:   2016-03-09 11:25:39
 * @Last Modified by:   zjy
 * @Last Modified time: 2016-10-26 14:27:03
 */
'use strict';
import React, {Component} from "react";
// import {MuiComponents} from "../js";
import IconButton from "./img/icon_nav_button.png";
import IconMsg from "./img/icon_nav_msg.png";
import { Components } from 'yes-native';

const { FitParentLayout,TabLayout } =  Components;
// const {MuiDrawerView, MuiTabLayout, FullScreenLayout} = MuiComponents;
class Home extends Component {
    render() {
        const tabs = [{
            to: '/home/ReceiptView', label: '收货', icon: <img src={IconButton} alt="收货"/>,
        }, {
            to: '/home/PutawayView', label: '上架', icon: <img src={IconMsg} alt="上架"/>,
        }, {
            to: '/home/CountView', label: '盘点', icon: <img src={IconMsg} alt="盘点"/>,
        }, {
            to: '/home/PayView', label: '支付', icon: <img src={IconMsg} alt="支付"/>,
        }];
        return (
            <FitParentLayout>
                <TabLayout tabs={tabs} {...this.props} />
                {/*<MuiDrawerView menuItems={tabs}/>*/}
            </FitParentLayout>
        );
    }
}
Home.key = 'home';
export default Home;
