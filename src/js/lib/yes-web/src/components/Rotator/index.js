export { default as default } from 'yes-native/dist/components/Rotator';
// import React, {Component} from "react";
// // Slide
// import SwipeableViews from "react-swipeable-views";
// // autoPlay
// import autoPlay from "react-swipeable-views/lib/autoPlay";
// // virtualize
// import virtualize from "react-swipeable-views/lib/virtualize";
// import Pagination from "./pagination/Pagination";
// import {List,DefaultRow} from "../List";
// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const VirtualizeSwipeableViews = virtualize(SwipeableViews);
// // AutoPlay Virtualize Swipeable Views
// const AutoPlayVirtualizeSwipeableViews = autoPlay(VirtualizeSwipeableViews);

// class Rotator extends DefaultRow {
//     state = {
//         index: 0,
//     };  
//     handleChangeIndex = (index) => {
//         this.setState({
//             index,
//         });
//     };

//     slideRenderer({key, index}) {
//         const dataArrayLength = this.dataArray.length;
//         const originIndex = index;
//         //超过了长度怎么办
//         if (index >= dataArrayLength) {
//             index = index % dataArrayLength;
//         }
//         //小于0
//         if (index < 0) {
//             index = (index + dataArrayLength) % dataArrayLength;
//         }
//         var element = this.rowRender(this.dataArray[index], index);
//         return React.cloneElement(element, {key: `${this.props.comp.metaObj.key}_${originIndex}`});
//     }

//     generateWrapper(hasDivider, cls) {
//         const {
//             index,
//         } = this.state;
//         const state = this.props.controlState;
//         const data = state.get('data'); //data是一个对象
//         // 前期处理数据
//         this.dataArray = [];
//         data.forEach((item, index) => {
//             this.dataArray.push(item);
//         })
//         const dataArrayLength = this.dataArray.length;
//         hasDivider = false;
//         let realIndex = index;
//         if (index < 0) {
//             realIndex = (index + dataArrayLength) % dataArrayLength;
//         }
//         if (index >= dataArrayLength) {
//             realIndex = index % dataArrayLength;
//         }
//         return (
//             <div
//                 style={{
//                     display: 'block',
//                     width: '100%',
//                     height: '160px',
//                     position: 'relative'
//                 }}
//             >
//                 <AutoPlayVirtualizeSwipeableViews
//                     index={index}
//                     onChangeIndex={(index) => this.handleChangeIndex(index)}
//                     className={cls}
//                     overscanSlideCount={2}
//                     resistance={true}
//                     interval={this.props.interval}
//                     direction={this.props.direction}
//                     slideRenderer={this.slideRenderer.bind(this)}
//                 />
//                 <Pagination
//                     dots={this.dataArray.length}
//                     index={realIndex}
//                     onChangeIndex={this.handleChangeIndex}
//                 />
//             </div>
//         );
//     }
// }
// export default Rotator;