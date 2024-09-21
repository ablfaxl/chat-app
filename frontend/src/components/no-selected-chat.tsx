import ChatIcon from "./icon/chat";
export const NoSelectedChat = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center mt-10">
      <ChatIcon />
      <p>Please Select A Chat from the list</p>
    </div>
  );
};
