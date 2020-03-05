import { Alert } from 'react-native'

export default function alert(title,msg) {
    if(msg){
        Alert.alert(
            title,
            msg,
        );
    }else{
        Alert.alert(
            '',
            title
        );
    }
}