export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_ONESIGNAL_ID_ANDROID: string;
      EXPO_PUBLIC_ONESIGNAL_ID_IOS: string;
    }
  }
}
