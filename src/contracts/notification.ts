export interface NotificationObjI {
  recipientType: "driver" | "passenger";
  multipleRecipient: boolean;
  recipientId: string;
  message: string;
}
