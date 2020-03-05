export { default as default } from 'yes-native/dist/components/Gallery';
// import React, {Component} from "react";
// // Slide
// import SwipeableViews from "react-swipeable-views";
// import autoPlay from "react-swipeable-views/lib/autoPlay";
// import virtualize from "react-swipeable-views/lib/virtualize";
// // Gallery
// import {GridList} from "material-ui/GridList";
// import {TextLinkList as List } from "../List/";
// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
// const VirtualizeSwipeableViews = virtualize(SwipeableViews);
// const styles = {
//     root: {
//         display: 'flex',
//         width: '100%',
//         flexWrap: 'wrap',
//         justifyContent: 'space-around',
//     },
//     gridList: {
//         display: 'flex',
//         flexWrap: 'nowrap',
//         overflowX: 'auto',
//     },
// };
// class Gallery extends List {
//     generateWrapper(hasDivider, cls) {
//         hasDivider = false;
//         let listitems = this.generateItemList(hasDivider, cls);
//         styles.root.height = this.props.galleryCellHeight + 4;
//         return (
//             <div style={styles.root}>
//                 <GridList
//                     style={styles.gridList}
//                     cellHeight={this.props.galleryCellHeight}
//                     cols={2.2}>
//                     {listitems}
//                 </GridList>
//             </div>
//         );
//     }
// }
// export default Gallery;