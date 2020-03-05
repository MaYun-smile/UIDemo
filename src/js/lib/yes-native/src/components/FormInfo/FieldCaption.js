import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { MetaControlWrap as metaControlWrap } from 'yes';

class ControlCaption extends PureComponent {
    render() {
        if (this.props.comp) {
            return (<View><Text style={this.props.style} >
                {this.props.comp.metaObj.caption || this.props.comp.caption}</Text></View>);
        }
        return null;
    }
}

export default metaControlWrap(ControlCaption);

