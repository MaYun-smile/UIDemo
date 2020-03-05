/* 
 * @Author: gmf
 * @Date:   2017-02-16 16:29:08
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-17 16:58:02
 */
import JSON5 from "json5";
export default {
    getItem: function (key) {
        let dt = localStorage.getItem(key);
        try {
            return JSON5.parse(dt);

        }catch (e){
            return dt;
        }
    },
    setItem: function (key, item) {
        localStorage.setItem(key, JSON5.stringify(item));
    }
}