/**
 * Created by y on 17-3-3.
 */
var data = new Object();
export default {
    getItem: function (key) {
        let dt = data[key];
        return Promise.resolve(dt);
    },
    setItem: function (key, item) {
        data[key] = item;
        return Promise.resolve(true);
    }
}