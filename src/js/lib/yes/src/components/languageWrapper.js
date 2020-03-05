import React, { Component } from 'react';
import AppStatusStore from '../stores/AppStatus';
import { Container } from 'flux/utils';

export default (BaseComponent) => {
    class LanguageWrapper extends Component {
        static getStores() {
            return [AppStatusStore];
        }
        static calculateState() {
            return {
                language: AppStatusStore.getState().get('language'),
            };
        }
        render() {
            return <BaseComponent language={this.state.language} {...this.props} />;
        }
    }

    return Container.create(LanguageWrapper);
};
