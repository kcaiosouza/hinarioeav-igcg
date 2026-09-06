import { Platform, ToastAndroid, Alert } from 'react-native';

export const Toast = {
  show: (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('', message, [{ text: 'OK' }]);
    }
  },
};
