export interface NotificationObjI {
  recipientType?: "driver" | "passenger";
  recipientId?: string;
  message: string;
}
