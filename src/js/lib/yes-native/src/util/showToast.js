import Toast from 'react-native-root-toast';

const showToast = (message, duration) => {
    Toast.show(message, {
        duration: Toast.durations[duration],
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
    });
}

export default showToast;
