import { Platform, StatusBar } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NotificationClickEvent, OneSignal } from 'react-native-onesignal';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';

import { CartContextProvider } from './src/contexts/CartContext';
import { addTagInfo } from './src/notifications/tags';
import { useEffect } from 'react';

const oneSignalAppId = Platform.OS === 'android' 
  ? process.env.EXPO_PUBLIC_ONESIGNAL_ID_ANDROID 
  : process.env.EXPO_PUBLIC_ONESIGNAL_ID_IOS

OneSignal.initialize(oneSignalAppId)
OneSignal.Notifications.requestPermission(true);

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  addTagInfo();

  useEffect(() => {
    function handleNotificationClick(event: NotificationClickEvent) {
      // recebendo notificação com botões de ação
      const { actionId } = event.result
      switch (actionId) {
        case '1': 
          console.log("Ver todos");
          break; 
        case '2': 
          console.log("Ver pedido");
          break;
        default:  
          console.log("default");
      }
    }

    OneSignal.Notifications.addEventListener("click", handleNotificationClick);

    return () => {
      OneSignal.Notifications.removeEventListener("click", handleNotificationClick);
    }
  }, [])

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