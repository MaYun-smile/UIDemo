import React, { Component } from 'react';
import { AppStatusStore as AppStatus } from 'yes';
import { Container } from 'flux/utils';
import LoadingComp from '../LoadingComp/';
import { Modal } from 'react-native';

class BusyLoading extends Component {
    static getStores() {
        return [AppStatus];
    }
    static calculateState() {
        return {
            state: AppStatus.getState(),
        };
    }
    render() {
        const busyLoading = this.state.state.get('busyLoading') > 0;
        console.log(`busyloading visible=${busyLoading}`);
        return (
            <Modal
                animationType="fade"
                transparent
                visible={busyLoading}
                onRequestClose={() => {
                    alert('Modal has been closed.');
                }}
            >
                <LoadingComp />
            </Modal>

        );
    }
}

export default Container.create(BusyLoading);
