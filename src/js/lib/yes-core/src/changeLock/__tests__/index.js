import { startChangeLock } from '../';
import { Dispatcher } from 'flux';
import getDispatcher, { injectDispatcher } from '../../dispatchers';

injectDispatcher(new Dispatcher()); // init dispatcher

describe('startChangeLock', () => {
    let catchedActionType;
    let dispatcher;
    let changeCount;
    let addCount;
    let minusCount;
    let defaultToken;

    function unregisterDefaultCb() {
        if (dispatcher._callbacks[defaultToken]) {
            dispatcher.unregister(defaultToken);
        }
    }

    beforeEach(() => {
        dispatcher = getDispatcher();    // 必须叫做dispatcher。
        unregisterDefaultCb();
        changeCount = 0;
        addCount = 0;
        minusCount = 0;

        defaultToken = dispatcher.register((payload) => {
            switch (payload.actionType) {
                case 'change':
                    catchedActionType = 'change';
                    changeCount++;
                    break;
                case 'add':
                    catchedActionType = 'add';
                    addCount++;
                    break;
                default:
                    catchedActionType = undefined;
            }
        });
    });
    afterEach(() => {
        unregisterDefaultCb();
    });
    test('Dispatch can be catched', () => {
        dispatcher.dispatch({
            actionType: 'change',
        });
        expect(catchedActionType).toBe('change');

        dispatcher.dispatch({
            actionType: 'add',
        });
        expect(catchedActionType).toBe('add');

        dispatcher.dispatch({
            actionType: 'minus',
        });
        expect(catchedActionType).toBe(undefined);
    });

    test('\'change\' action can be called multi times', () => {
        dispatcher.dispatch({
            actionType: 'change',
        });
        dispatcher.dispatch({
            actionType: 'change',

        });
        dispatcher.dispatch({
            actionType: 'change',
        });
        expect(changeCount).toBe(3);
    });

    test('startChangeLock will only call \'change\' once at most ', async () => {
        await startChangeLock(() => {
            dispatcher = getDispatcher();   // must have this sentence, why?
            dispatcher.dispatch({
                actionType: 'change',
            });
            dispatcher.dispatch({
                actionType: 'change',
            });
            dispatcher.dispatch({
                actionType: 'change',
            });
        });
        expect(changeCount).toBe(1);
    });

    test('Mix \'change\' and other actions work fine', async () => {
        await startChangeLock(() => {
            dispatcher = getDispatcher();   // must have this sentence. why?
            dispatcher.dispatch({
                actionType: 'change',
            });
            dispatcher.dispatch({
                actionType: 'add',
            });
            dispatcher.dispatch({
                actionType: 'add',
            });
            expect(addCount).toBe(2);

            dispatcher.dispatch({
                actionType: 'minus',
            });
            expect(minusCount).toBe(0);
        });
        expect(changeCount).toBe(1);
    });
    test('Nested use startChangeLock', async () => {
        dispatcher.unregister(defaultToken);
        dispatcher.register((payload) => {
            switch (payload.actionType) {
                case 'change':
                    changeCount++;

                    // 2级 startChangeLock
                    startChangeLock(() => {
                        dispatcher = getDispatcher();   // must have this sentence. why?
                        dispatcher.dispatch({
                            actionType: 'change',
                        });
                        dispatcher.dispatch({
                            actionType: 'change',
                        });
                    });
                    break;
                default:
            }
        });
        // 1级 startChangeLock
        await startChangeLock(() => {
            dispatcher = getDispatcher();// must have this sentence. why?
            dispatcher.dispatch({
                actionType: 'change',
            });
            dispatcher.dispatch({
                actionType: 'change',
            });
            dispatcher.dispatch({
                actionType: 'change',
            });
        });
        expect(changeCount).toBe(1);
    });
});
