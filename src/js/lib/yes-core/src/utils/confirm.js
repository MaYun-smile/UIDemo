const confirmImpl= {
    current: null,
};

export default confirmImpl;

export function injectConfirm(confirm) {
    confirmImpl.current = confirm;
}
