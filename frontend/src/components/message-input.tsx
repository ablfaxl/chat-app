/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import SendIcon from "./icon/send";
import useConversation from "../store";
import { Message } from "../types";
import { useMutation } from "../hook/useMutation";

export const MessageInput = () => {
  const [messageValue, setMessageValue] = useState("");
  const { selectedConversation, messages, setMessages } = useConversation();

  const { execute, data } = useMutation<Message>();

  const onSendMessage = () => {
    if (messageValue.length) {
      execute({
        url: `message/send/${selectedConversation?.id}`,
        body: { content: messageValue },
        method: "post",
      });
    }
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessageValue(value);
  };

  const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "NumpadEnter") onSendMessage();
  };

  useEffect(() => {
    if (data) {
      setMessages([...messages, data]);
      setMessageValue("");
    }
  }, [data]);

  return (
    <div className="flex w-full mt-4 gap-2">
      <label className="input input-bordered flex items-center gap-2 w-full bg-white text-gray-600">
        <input
          type="text"
          className=" "
          placeholder="Type Here ..."
          value={messageValue}
          onChange={onChangeInput}
          onKeyDown={onPressEnter}
        />
      </label>
      <button className="btn btn-square btn-ghost " onClick={onSendMessage}>
        <SendIcon />
      </button>
    </div>
  );
};
