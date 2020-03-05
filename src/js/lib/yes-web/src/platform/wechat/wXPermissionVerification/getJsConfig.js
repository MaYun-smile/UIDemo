export default async function getJsConfig() {
    // TODO 修改url
    const url = `http://zhouzhongyuan.com/api/jsConfig?url=${location.href}`;
    try {
        let res = await fetch(url, {
            method: 'GET',
        });
        res = res.json();
        return res;
    } catch (e) {
        throw (e);
    }
}
