import { BusyLoadingUtil } from 'yes'
import { Alert } from 'react-native'
console.log(`BusyLoadingUtil=${BusyLoadingUtil}`);
export default BusyLoadingUtil.pauseBusyLoadingWrapper(function (title, content, type) {
    return new Promise(function (resolve, reject) {
        type = type || 'OK';
        const actions = [
            {
                text: 'OK',
                onPress: () => {
                    resolve('OK');
                }
            }
        ];
        if (type.startsWith('YES_NO')) {
            actions.push({
                text: 'NO',
                onPress: () => {
                    resolve('NO');
                }
            })
        }
        if (type === 'YES_NO_CANCEL') {
            actions.push({
                text: 'Cancel',
                onPress: () => {
                    resolve('CANCEL');
                }
            })
        }
        Alert.alert(
            title,
            content,
            actions,
            { cancelable: false }
        )
    })
})
