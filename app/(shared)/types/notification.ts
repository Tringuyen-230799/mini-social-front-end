import { NOTIFICATION_TYPE } from "../constant/notification";

export type NotificationType = typeof NOTIFICATION_TYPE[keyof typeof NOTIFICATION_TYPE];

export interface Notification {
  user: {
    id: number | string;
    username: string;
    avatar_url: string | null;
  };
  entityId: number;
  message: string;
  type: NotificationType
}