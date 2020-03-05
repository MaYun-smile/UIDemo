import { Dispatcher } from 'flux';
import getDispatcher, { injectDispatcher } from '../dispatchers';

let previousDispatcher;
let dispatchToken;
let lastPayload;
const tempDispatcher = new Dispatcher();

async function startChangeLock(fn) {
    // 仅处理actionType为'change'的消息
    previousDispatcher = getDispatcher();
    const isDispatching = previousDispatcher.isDispatching();
    if (isDispatching) {
        return;
    }
    injectDispatcher(tempDispatcher);
    dispatcher = getDispatcher();
    // 如果action type为'change'，堆积起来，如果不是'change'， 原样发出。
    dispatchToken = dispatcher.register((payload) => {
        switch (payload.actionType) {
            case 'change':
                lastPayload = payload;
                break;
            default:
                previousDispatcher.dispatch(payload);
        }
    });
    try {
        await fn();
    } finally {
        stopChangeLock();
    }
}

function stopChangeLock() {
    tempDispatcher.unregister(dispatchToken);
    injectDispatcher(previousDispatcher);
    getDispatcher().dispatch(lastPayload);
}
export {
    startChangeLock,
    stopChangeLock,
};
export default {
    startChangeLock,
    stopChangeLock,
};
