import { FC } from "react";
import { useUserContext } from "../contexts/user-context";
import useConversation from "../store";
import { Message } from "../types";
import { ConvertDate } from "../utils";

const MessageDialog: FC<Message> = (props) => {
  const { user } = useUserContext();
  const { selectedConversation } = useConversation();
  const isMe = props.senderId === user?.id;
  const avatar = isMe ? user.avatar : selectedConversation?.avatar;

  return (
    <div className={`chat ${isMe ? "chat-start" : "chat-end"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="avatar" src={avatar!} />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs text-gray-800">
          {ConvertDate(props.createdAt)}
        </time>
      </div>
      <div className={`chat-bubble text-white ${isMe && "bg-primary "}`}>
        {props.content}
      </div>
    </div>
  );
};

export default MessageDialog;
