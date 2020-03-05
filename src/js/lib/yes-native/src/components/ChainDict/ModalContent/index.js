import React, { Component, PropTypes } from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { Toolbar } from 'react-native-material-ui';
import List from './List';
import SelectedItem from './SelectedItem';
import ActionBar from './ActionBar';

const styles = StyleSheet.create({
    modal: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    buttonWrap: {
        flexDirection: 'row',
        alignSelf: 'stretch',
    },
});
class ModalContent extends Component {
    static propTypes = {
        modalVisible: PropTypes.bool,
        items: PropTypes.object,
        onChangePopupState: PropTypes.func,
        modalLoading: PropTypes.bool,
        onQuery: PropTypes.func,
        onChange: PropTypes.func,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        isMultipleChoice: PropTypes.bool,
        caption: PropTypes.string,
        onLoadMore: PropTypes.func,
    };
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        let defaultValue = [];
        let { value } = this.props;
        value = value.toString();
        if (value.length) {
            defaultValue = value.split(',');
        }
        this.state = {
            value: defaultValue,
            captionList: [],
        };
    }
    async handleSearchSubmit(e) {
        this.props.onQuery(e.nativeEvent.text);
    }
    handleCloseSearch = () => {
        this.props.onQuery('');
    };
    handleValueChange = (oid, caption) => {
        const v = oid.toString();
        // 多选
        if (this.props.isMultipleChoice) {
            const { value, captionList } = this.state;
            if (value.indexOf(v) !== -1) {
                value.splice(value.indexOf(v), 1);
                captionList.splice(captionList.indexOf(caption), 1);
                this.setState({
                    value,
                    captionList,
                });
            } else {
                value.push(v);
                captionList.push(caption);
                this.setState({
                    value,
                    captionList,
                });
            }
        } else {
            this.setState({ value: [v] }, () => {
                this.handleSave();
            });
        }
    };

    handleClear = () => {
        this.setState({ value: [] });
    };
    handleSave = () => {
        this.closeModal();
        this.props.onChange(this.state.value.join(','));
    };
    emptyAll = () => {
        this.setState({
            value: [],
            captionList: [],
        });
    }
    handleSelectAll = (selectAll) => {
        const { items } = this.props;
        const { data } = items;
        if (selectAll) {
            // 全选
            const selectedItem = [];
            data.forEach((item) => {
                selectedItem.push(item.oid.toString());
            });
            this.setState({ value: selectedItem });
        } else {
            // 全不选
            this.emptyAll();
        }
    }
    closeModal = () => {
        this.props.onChangePopupState(false);
    };
    render() {
        const { isMultipleChoice, items, modalVisible, caption, modalLoading, onLoadMore } = this.props;
        const { value, captionList } = this.state;
        const isSelectAll = value.length === (items && items.totalRowCount);
        return (
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={modalVisible}
                onRequestClose={this.closeModal}
            >
                <View
                    style={styles.modal}
                >
                    <Toolbar
                        leftElement="close"
                        centerElement={caption}
                        searchable={{
                            autoFocus: true,
                            placeholder: '搜索',
                            onSubmitEditing: this.handleSearchSubmit,
                            onSearchClosed: this.handleCloseSearch,
                        }}
                        onLeftElementPress={this.closeModal}
                    />
                    {
                        isMultipleChoice ?
                            <SelectedItem
                                item={value}
                                captionList={captionList}
                                emptyAll={this.emptyAll}
                            /> :
                            null
                    }
                    <View
                        style={styles.content}
                    >
                        <List
                            style={{
                                flex: 1,
                            }}
                            items={items}
                            modalLoading={modalLoading}
                            handleValueChange={this.handleValueChange}
                            value={value}
                            onLoadMore={onLoadMore}
                        />
                    </View>
                    {
                        isMultipleChoice ?
                            <ActionBar
                                handleSave={this.handleSave}
                                handleSelectAll={this.handleSelectAll}
                                isSelectAll={isSelectAll}
                            /> :
                            null
                    }
                </View>
            </Modal>
        );
    }
}
export default ModalContent;
