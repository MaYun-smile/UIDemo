export { default as default } from 'yes-native/dist/components/GIFImage';
// import React, { Component } from 'react';
// import { propTypes } from 'yes'; // eslint-disable-line
// import { StyleSheet, View, Text, Image, PixelRatio } from 'react-native';
// import SuperGif from "./libgif"

// const pixelDensity = PixelRatio.get();
// const styles = StyleSheet.create({
// });
// class YESGIFImage extends Component {
//     state = {                                             // 定义一个父类以左上角为定点的x轴的距离
//         imageWidth: 532,
//         imageHeight: 300,
//         imageDom: ""
//     }
//     onClick() {
//         this.props.onClick && this.props.onClick();
//     }
//     componentDidMount() {
//         Image.getSize("http://1.1.8.221:8089/yigo/attach?path=fox1.gif&formKey=Image&service=DownloadImage&mode=2",
//             (width, height) => {
//                 this.setState({
//                     imageHeight: height /  PixelRatio.get(), imageWidth: width /  PixelRatio.get() // 获取的尺寸但是是px需要转换成dp来算。
//                 })
//                 let img1 = document.getElementById("img1");
//                 img1.width = width
//                 img1.height = height
//                 let sup1 = new SuperGif({ gif: img1 });
//                 this.setState({ imageDom: sup1 })
//                 sup1.load();
//             })

//     }
//     componentWillReceiveProps(nextProps) {
//         if (nextProps.controlState.get("endGif")) {
//             this.state.imageDom.pause()
//         }
//         if (nextProps.controlState.get("startGIF") == -1) {
//             this.state.imageDom.play()
//         }
//         if (typeof nextProps.controlState.get("startGIF") == "number") {
//             this.state.imageDom.play(nextProps.controlState.get("startGIF"))
//         }

//     }
//     render() {
//         const { stretch, imageScaleType, layoutStyles, displayValue, maskImage, radius, optiMode } = this.props;
//         return (
//             <View style={[layoutStyles, { flexDirection: "row", justifyContent: "center", alignItems: "center" }]}>
//                 <img id="img1" src="http://1.1.8.221:8089/yigo/attach?path=fox1.gif&formKey=Image&service=DownloadImage&mode=2" />
//             </View>
//         )
//     }
// }
// YESGIFImage.propTypes = propTypes.YESGIFImage;
// export default YESGIFImage;


