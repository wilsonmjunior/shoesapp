import { OneSignal } from "react-native-onesignal";

export function createNotificationTagEmail(email: string) {
    OneSignal.User.addTag("user_email", email);
    // OneSignal.User.removeTag("user_email");
}

export function addTagInfo() {
    OneSignal.User.addTags({
        user_name: "John Doe",
        user_email: "jonh.doe@email.com"
    });
}

export function tagCartUpdate(itemsCount: string) {
    OneSignal.User.addTag("cart_items_count", itemsCount);
}
