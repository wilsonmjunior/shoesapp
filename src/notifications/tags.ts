import { OneSignal } from "react-native-onesignal";

export function createNotificationTagEmail(email: string) {
    OneSignal.User.addTag("user_email", email);
}