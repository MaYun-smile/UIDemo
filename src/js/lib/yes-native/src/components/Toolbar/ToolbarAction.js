
import React , { Component , PropTypes } from 'react';
import { StyleSheet , View } from 'react-native';
import { IconToggle } from 'react-native-material-ui';

function getStyles(props, context) {
    const { isSearchActive } = props;
    const { toolbar, toolbarSearchActive } = context.uiTheme;

    return {
        rightElement: [
            toolbar.rightElement,
            isSearchActive && toolbarSearchActive.rightElement,
            props.style.rightElement,
        ],
    };
}

class ToolbarAction extends Component {
    static contextTypes = {
        uiTheme: PropTypes.object.isRequired,
    }

    static defaultProps = {
        style: {},
    }

    render() {
        const styles = getStyles(this.props, this.context, this.state);
        const flattenRightElement = StyleSheet.flatten(styles.rightElement);
        return (<IconToggle
                        name={ this.props.name }
                        onPress={this.props.onPressed}
                        size={this.props.size}
                        color={flattenRightElement.color}
                        style={flattenRightElement}
                        >
            </IconToggle>);
    }
}

export default ToolbarAction;