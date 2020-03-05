import React, { PureComponent } from 'react';
import { Text, Modal, View } from 'react-native';
import { Dialog, DialogDefaultActions } from 'react-native-material-ui';
import { propTypes } from 'yes'; // eslint-disable-line

import List from './checklist';

const styles = {
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    dialog: {
        maxHeight: 300,
    },
    radioButton: {
        marginTop: 16,
    },
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    hello: {
        fontSize: 15,
    },
};

export default class ComboboxPopup extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { value: this.props.value }; // props passed by index.js
    }

    static defaultProps = {
        showPopup: false,
    };

    renderContainer(optionNodes) {
        return <View>{optionNodes}</View>;
    }

    handleOpen = () => {
        this.props.onChangePopupState(true);
    };

    handleClose = () => {
        this.props.onChangePopupState(false);
    };

    handleCloseSubmit = () => {
        this.props.onChangePopupState(false);
        this.props.onChange(this.state.value); // 'caption'
    };

    closing = (actions) => {
        if (actions === 'Dismiss') {
            this.handleClose();
        } else {
            this.handleCloseSubmit();
        }
    }

    handleValueChange = (value) => {
        this.setState({
            value,
        });
    }

    render() {
        // const value = this.props.controlState.get('value');
        const value = this.state.value;
        return (
            <Modal
                visible={this.props.showPopup}
                transparent
                onRequestClose={this.handleClose}
            >
                <View style={styles.modal}>
                    <Dialog>
                        <Dialog.Title><Text>{this.props.title}</Text></Dialog.Title>
                        <Dialog.Content style={{ contentContainer: styles.dialog }}>
                            <List
                                style={{
                                    flex: 1,
                                }}
                                multiSelect={this.props.multiSelect}
                                value={value}
                                items={this.props.items}
                                handleValueChange={this.handleValueChange}
                            />
                        </Dialog.Content>
                        <Dialog.Actions>
                            <DialogDefaultActions
                                actions={['Dismiss', 'Keep']}
                                onActionPress={this.closing}
                            />
                        </Dialog.Actions>
                    </Dialog>
                </View>
            </Modal>
        );
    }
}

ComboboxPopup.propTypes = propTypes.Combobox;
