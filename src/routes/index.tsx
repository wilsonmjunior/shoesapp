import { useEffect, useState } from 'react';
import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { NotificationWillDisplayEvent, OneSignal, OSNotification } from 'react-native-onesignal';

import { AppRoutes } from './app.routes';
import { Notification } from '../components/Notification';

export function Routes() {
  const [notification, setNotification] = useState({} as OSNotification);

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
    <NavigationContainer theme={theme}>
      <AppRoutes />

      { notification?.title ? <Notification title={notification.title} onClose={() => setNotification(undefined)} /> : null }
    </NavigationContainer>
  );
}