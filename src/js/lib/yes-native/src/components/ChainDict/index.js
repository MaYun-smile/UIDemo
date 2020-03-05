import React, { Component } from 'react';
import ModalContent from './ModalContent';
import {propTypes} from 'yes'; // eslint-disable-line

class ChainDict extends Component {
    static defaultProps = {
        caption: '',
    };

    render() {
        const {
            controlState,
            modalVisible,
            loading,
            items, onChangePopupState, onQuery, onChange, allowMultiSelection, caption, onLoadMore,
        } = this.props;
        let value = controlState.get('value') || '';
        return (
            <ModalContent
                value={value}
                modalVisible={modalVisible}
                modalLoading={loading}
                items={items}
                onChangePopupState={onChangePopupState}
                onQuery={onQuery}
                onChange={onChange}
                isMultipleChoice={allowMultiSelection}
                caption={caption}
                onLoadMore={onLoadMore}
            />
        );
    }
}

ChainDict.propTypes = propTypes.ChainDict;
export default ChainDict;
