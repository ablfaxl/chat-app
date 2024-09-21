/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useConversation from "../store";
import MessageList from "./message-list";
import { NoSelectedChat } from "./no-selected-chat";

export const MessageBox = () => {
  const { setSelectedConversation, selectedConversation } = useConversation();

  //for clear conversation after loging out
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, []);

  return (
    <>
      {!selectedConversation ? (
        <NoSelectedChat />
      ) : (
        <div>
          <MessageList />
        </div>
      )}
    </>
  );
};
