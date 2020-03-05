import { AuthenticatedRouteWrap } from 'yes';
import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { propTypes } from 'yes';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
class LoadingComp extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="cadetblue" />
                <Text>{this.props.children}</Text>
            </View>
        );
    }
}
LoadingComp.propTypes = propTypes.AuthenticatedRoute;
export default function AuthenticatedRoute(BaseComponent, LoginComponent, key) {
    return AuthenticatedRouteWrap(BaseComponent, LoginComponent, LoadingComp, key);
}
