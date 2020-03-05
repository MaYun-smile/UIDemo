import global from 'global';

const interactionManager = {
    runAfterInteractions: (callback) => {
        if (global.requestIdleCallback) {
            global.requestIdleCallback(() => callback());
        } else {
            setTimeout(callback, 0);
        }
    },
};

export default interactionManager;

export function inject(obj) {
    Object.assign(interactionManager, obj);
}
