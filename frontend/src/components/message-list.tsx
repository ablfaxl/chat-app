/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import useQuery from "../hook/useQuery";
import type { Message } from "../types";
import useConversation from "../store";
import MessageDialog from "./message-dialog";
import useListenMessage from "../hook/use-listen-message";

const MessageList = () => {
  const { messages, setMessages, selectedConversation } = useConversation();
  const { data } = useQuery<Message[]>(`/message/${selectedConversation?.id}`);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  useListenMessage();

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
    }, 100);
  }, [messages]);

  return (
    <div>
      {messages?.map((item: Message) => {
        return (
          <div key={item.id} ref={lastMessageRef}>
            <MessageDialog {...item} />
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
