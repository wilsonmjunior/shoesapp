export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_ONESIGNAL_ID: string;
    }
  }
}
