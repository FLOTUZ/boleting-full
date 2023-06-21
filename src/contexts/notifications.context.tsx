import { createContext, useContext, useEffect, useState } from "react";
import {
  Notification,
  useClearnotificationsMutation,
  useDeleteNotificationMutation,
  useNotificationsQuery,
} from "@/gql/generated";

export type NotificationContextType = {
  notifications: Notification[];
  removeNotification: (notification: Notification) => void;
  clearNotifications: () => void;
};

export const NotificationsContext = createContext<NotificationContextType>({
  notifications: [],
  removeNotification: () => {},
  clearNotifications: () => {},
});

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { data } = useNotificationsQuery();

  const [clearNotificationsMutation] = useClearnotificationsMutation();

  const [deleteNotificationMutation] = useDeleteNotificationMutation();

  const removeNotification = (notification: Notification) => {
    setNotifications((notifications) =>
      notifications.filter((n) => n.id !== notification.id)
    );
    deleteNotificationMutation({
      variables: {
        deleteNotificationId: notification.id,
      },
    });
  };

  const clearNotifications = () => {
    clearNotificationsMutation();
    setNotifications([]);
  };

  useEffect(() => {
    if (data?.notifications) {
      setNotifications(data.notifications as Notification[]);
    }
  }, [data]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        removeNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
