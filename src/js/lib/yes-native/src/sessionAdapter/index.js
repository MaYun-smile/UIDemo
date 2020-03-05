/* 
 * @Author: gmf
 * @Date:   2017-02-16 16:29:08
 * @Last Modified by:   gmf
 * @Last Modified time: 2017-02-17 16:58:02
 */
import JSON5 from "json5";
import { AsyncStorage } from 'react-native'

export default {
    getItem: async function (key) {
        let dt = await AsyncStorage.getItem(key);
        try {
            return JSON5.parse(dt);
        }catch (e){
            return dt;
        }
    },
    setItem: async function (key, item) {
        await AsyncStorage.setItem(key, JSON5.stringify(item));
    }
}