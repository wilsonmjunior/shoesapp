import { useEffect, useState } from 'react';
import { useTheme } from 'native-base';
import { DefaultTheme, LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { NotificationWillDisplayEvent, OneSignal, OSNotification } from 'react-native-onesignal';

import { AppRoutes } from './app.routes';
import { Notification } from '../components/Notification';

const linking = {
  prefixes: ['igniteshoesapp://', 'com.juniors.igniteshoesapp://'],
  config: {
    screens: {
      details: {
        path: '/details/:productId',
        parse: {
          productId: (productId: string) => productId
        }
      }
    }
  }
} as LinkingOptions<ReactNavigation.RootParamList> | undefined


export function Routes() {
  const [notification, setNotification] = useState<OSNotification>();

  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    function handleNotification(event: NotificationWillDisplayEvent) {
      event.preventDefault();

      const response = event.getNotification();
      setNotification(response);
    }

    OneSignal.Notifications.addEventListener("foregroundWillDisplay", handleNotification);
    
    return () => {
      OneSignal.Notifications.removeEventListener("foregroundWillDisplay", handleNotification);
    }
  }, [])

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      { notification?.title ? <Notification data={notification} onClose={() => setNotification(undefined)} /> : null }
    </NavigationContainer>
  );
}