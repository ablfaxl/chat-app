import { MessageBox } from "../components/message-box";
import { MessageInput } from "../components/message-input";
import { RoomHeader } from "../components/room-header";
import { UserList } from "../components/user-list";
import useNotification from "../hook/use-notifactions";

export const Room = () => {
  useNotification();
  return (
    <div className="mx-0 mb-0 mt-0  lg:mx-40 lg:mb-40 lg:mt-20">
      <RoomHeader />
      <div className="flex items-stretch h-full min-h-[500px] bg-white rounded-lg">
        <UserList />
        <div className="flex flex-col w-full pl-8 my-2 justify-between">
          <div className="w-full pr-2 h-[500px] overflow-auto">
            <MessageBox />
          </div>
          <MessageInput />
        </div>
      </div>
    </div>
  );
};
