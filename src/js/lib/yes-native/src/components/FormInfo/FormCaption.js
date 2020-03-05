import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { MetaBillFormWrap as metaBillFormWrap } from 'yes';

class FormCaption extends PureComponent {
    render() {
        if (this.props.billform) {
            return <View><Text style={this.props.style} >{this.props.billform.form.caption}</Text></View>;
        }
        return null;
    }
}

export default metaBillFormWrap(FormCaption);

