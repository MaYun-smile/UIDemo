import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Toolbar, Divider } from 'react-native-material-ui';
import SelectedItemModal from './SelectedItemModal';

const styles = {
    container: {
        backgroundColor: '#FFFFFF',
    },
    leftElement: {
        color: '#000000',
    },
    centerElementContainer: {
        textAlign: 'center',
        marginLeft: 0,
    },
};

class SelectedItem extends Component {
    state = {
        modalVisible: false,
    };

    openModal = () => {
        if (this.props.item.length !== 0) {
            this.setState({ modalVisible: true });
        }
    }

    closeModal = () => {
        this.setState({ modalVisible: false });
    }
    render() {
        const { item, captionList, emptyAll } = this.props;
        const { modalVisible } = this.state;

        return (
            <View>
                <Toolbar
                    centerElement={<Text>{`已选${item.length}项`}</Text>}
                    rightElement="keyboard-arrow-right"
                    style={{
                        container: styles.container,
                        leftElement: styles.leftElement,
                        rightElement: styles.leftElement,
                        centerElement: styles.leftElement,
                    }}
                    onPress={this.openModal}
                />
                <Divider />

                <SelectedItemModal
                    captionList={captionList}
                    modalVisible={modalVisible}
                    closeModal={this.closeModal}
                    emptyAll={emptyAll}
                    styles={styles}
                />
            </View>
        );
    }
}

export default SelectedItem;
