import { Linking } from 'react-native'; // eslint-disable-line import/no-unresolved
// TODO eslint-import-resolver-webpack
import Button from '../Button';
/*
HyperLink有两种行为:
    url
    onClick
*/
class HyperLink extends Button {
    onClick = () => {
        const { onClick, url } = this.props;
        if (url) {
            Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                    console.log('Can\'t handle url: $[url}');
                } else {
                    return Linking.openURL(url);
                }
            }).catch(err => console.error('An error occurred', err));
        }
        if (onClick) {
            onClick();
        }
    }
}

export default HyperLink;
