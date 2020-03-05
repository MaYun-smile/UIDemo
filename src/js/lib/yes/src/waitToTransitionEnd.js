import AppDispatcher from './dispatchers/AppDispatcher';

let transitionProcessing = 0;

function waitToTransitionEnd() {
    return Promise.resolve(true);
    // return new Promise((reslove) => {
    //     const transitionProcessingInterval = setInterval(() => {
    //         if (!transitionProcessing) {
    //             clearInterval(transitionProcessingInterval);
    //             reslove();
    //         }
    //     }, 200);
    // });
}

AppDispatcher.register((action) => {
    switch (action.type) {
    case 'TRANSITIONSTART':
        transitionProcessing += 1;
        break;
    case 'TRANSITIONEND':
        transitionProcessing -= 1;
        break;
    default:
    }
});
export default waitToTransitionEnd;
