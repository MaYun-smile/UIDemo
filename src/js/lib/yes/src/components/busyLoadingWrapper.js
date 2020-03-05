import { changeBusyLoading, pauseBusyLoading, resumeBusyLoading } from 'yes-core';
import dispatcher from '../dispatchers/AppDispatcher';

function busyLoadingWrapper(originalHandler) {
    async function busyLoading() {
        let loadingShown = false;
        function showLoading() {
            const action = changeBusyLoading(true);
            dispatcher.dispatch(action);
            loadingShown = true;
        }

        function hideLoading() {
            loadingShown && dispatcher.dispatch(changeBusyLoading(false));
        }

        const busyTimeout = setTimeout(showLoading, 100);
        // showLoading();
        try {
            const result = await originalHandler.apply(this, arguments);
            clearTimeout(busyTimeout);
            return result;
        } finally {
            hideLoading();
        }
    }
    return busyLoading;
}

function pauseBusyLoadingWrapper(originalHandler) {
    return async function () {
        function pauseLoading() {
            dispatcher.dispatch(pauseBusyLoading());
        }

        function resumeLoading() {
            dispatcher.dispatch(resumeBusyLoading());
        }
        pauseLoading();
        try {
            return await originalHandler.apply(this, arguments);
        } finally {
            resumeLoading();
        }
    };
}

export default {
    busyLoadingWrapper,
    pauseBusyLoadingWrapper,
};
