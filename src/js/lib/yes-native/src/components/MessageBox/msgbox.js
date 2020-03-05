import React, { PureComponent } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { Dialog, DialogDefaultActions } from 'react-native-material-ui';
import { propTypes } from 'yes'; // eslint-disable-line

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default class MessageBox extends PureComponent {
    onActionPress = (action) => {
        this.props.onActionPress(action);
    }

    render() {
        let title = this.props.title || 'Message';
        let msg = this.props.message || '';
        return (
            <Modal
                visible
                transparent
                onRequestClose={() => { }}
            >
                <View style={styles.container}>
                    <Dialog>
                        <Dialog.Title><Text>{title}</Text></Dialog.Title>
                        <Dialog.Content>
                            <Text>{msg}
                            </Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <DialogDefaultActions
                                actions={this.props.actions}
                                onActionPress={this.onActionPress}
                            />
                        </Dialog.Actions>
                    </Dialog>
                </View>
            </Modal>
        );
    }
}
MessageBox.propTypes = propTypes.MessageBox;
