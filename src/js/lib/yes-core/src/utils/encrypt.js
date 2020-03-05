const encryptImpl = {
    current: null,
};

export default encryptImpl;

export function injectEncrypt(encrypt) {
    encryptImpl.current = encrypt;
}
