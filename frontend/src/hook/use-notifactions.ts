/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useSocketContext } from "../contexts/socket-context";
import useConversation from "../store";
import { useUserContext } from "../contexts/user-context";

const useNotification = () => {
  const { socket } = useSocketContext();
  const { setNotifications, notifications } = useConversation();
  const { user } = useUserContext();

  useEffect(() => {
    socket?.on("notification", (newMessage) => {
      if (newMessage[0].senderId !== user?.id) {
        if (!notifications.includes(newMessage[0].senderId)) {
          setNotifications([...notifications, newMessage[0].senderId]);
        }
      }
    });

    return () => {
      socket?.off("notification");
    };
  }, [socket, setNotifications, notifications]);
};

export default useNotification;
