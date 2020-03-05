// export { default as default } from 'yes-native/dist/components/WebBrowser';
import React, { Component } from 'react';
import { View } from "react-native";

export default class WebBrowser extends Component {
    render() {
        const { sourceType, displayValue, layoutStyles } = this.props
        if (sourceType == "Html") {
            return (
                <View
                    style={[layoutStyles]}
                    dangerouslySetInnerHTML={{ __html: displayValue }} />
            )
        } else {
            return <iframe src={this.props.displayValue}
                scrolling='yes'
                style={{
                    ...layoutStyles,
                    height: '500',
                    border: "1",
                    backgroundColor: '#f8f8f8'
                }}
            />
        }
    }
}