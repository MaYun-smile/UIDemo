import React, { Component } from 'react';
import { View, Modal, Text } from 'react-native';
import { Toolbar, Divider, Button } from 'react-native-material-ui';
import SelectedItemModalList from './SelectedItemModalList';

class SelectedItemModal extends Component {
    render() {
        const { modalVisible, captionList, closeModal, styles, emptyAll } = this.props;

        return (

            <Modal
                visible={modalVisible}
                animationType={'slide'}
                onRequestClose={closeModal}
            >
                <View>
                    <View>
                        <Toolbar
                            leftElement="arrow-back"
                            centerElement={<Text>{`已选${captionList.length}项`}</Text>}
                            rightElement={
                            <Button
                                disabled={!captionList.length}
                                primary
                                text="清空"
                                onPress={emptyAll}
                            />
                        }
                            style={{
                                container: styles.container,
                                leftElement: styles.leftElement,
                                rightElement: styles.leftElement,
                                centerElementContainer: styles.centerElementContainer,
                                centerElement: styles.leftElement,
                            }}
                            onLeftElementPress={closeModal}
                        />
                        <Divider />
                        <SelectedItemModalList
                            captionList={captionList}
                        />
                    </View>
                </View>
            </Modal>
        );
    }
}

export default SelectedItemModal;
