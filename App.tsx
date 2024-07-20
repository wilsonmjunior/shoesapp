import { Platform, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { OneSignal } from 'react-native-onesignal';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { addTagInfo, createNotificationTagEmail } from './src/notifications/tags';

const oneSignalAppId = Platform.OS === 'android' 
  ? process.env.EXPO_PUBLIC_ONESIGNAL_ID_ANDROID 
  : process.env.EXPO_PUBLIC_ONESIGNAL_ID_IOS

OneSignal.initialize(oneSignalAppId)
OneSignal.Notifications.requestPermission(true);

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  addTagInfo();

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}