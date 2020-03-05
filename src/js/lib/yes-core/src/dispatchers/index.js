let dispatcher = {
    dispatch() {

    },
    register() {

    },
};
let inited = null;
const promise = new Promise((resolve) => {
    inited = function () {
        resolve();
    };
});
export function injectDispatcher(disp) {
    dispatcher = disp;
    inited();
}

export default function () {
    return dispatcher;
}

export function ready(callback) {
    promise.then(callback);
}
