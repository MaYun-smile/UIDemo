export default function fetchWithTimeout(fetchPromise, timeout) {
    let abortFn = null;

    //这是一个可以被reject的promise
    const abortPromise = new Promise((resolve, reject) => {
        abortFn = () => {
            reject(new Error('fetch timeout'));
        };
    });

    const timeoutId = setTimeout(() => {
        abortFn();
    }, timeout);

    //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
    const abortablePromise = Promise.race([
        fetchPromise.then((data) => {
            clearTimeout(timeoutId);
            return data;
        }),
        abortPromise,
    ]);

    return abortablePromise;
}
