/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useQuery from "../hook/useQuery";
import useConversation from "../store";
import { User } from "../types";
import { UserCard } from "./user-card";

export const UserList = () => {
  const { data } = useQuery<User[]>("/user");
  const { setUsers, users, notifications } = useConversation();

  useEffect(() => {
    if (data) setUsers(data);
  }, [data]);
  console.log("notifications", notifications);
  return (
    <div className="flex flex-col gap-2 py-4 bg-gray-700 rounded-s-md min-w-[300px]">
      {users?.map((item: User) => {
        return (
          <div key={item.id}>
            <UserCard {...item} />
          </div>
        );
      })}
    </div>
  );
};
