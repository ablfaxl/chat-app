import { ChangeEvent, useState } from "react";
import { useUserContext } from "../contexts/user-context";
import { useMutation } from "../hook/useMutation";
import LogoutIcon from "./icon/logout";
import SearchIcon from "./icon/search";
import useConversation from "../store";
import { User } from "../types";

export const RoomHeader = () => {
  const { execute } = useMutation();
  const { user, setUser } = useUserContext();

  const { users, setSelectedConversation } = useConversation();
  const [search, setSearch] = useState("");

  const onLogout = () => {
    execute({ url: `user/signout`, method: "post" });
    setUser(null);
    localStorage.removeItem("user");
  };

  const onSearch = () => {
    const findUser = users.filter(
      (item: User) =>
        item.firstName.startsWith(search) || item.lastName.startsWith(search)
    );
    if (findUser) {
      setSearch("");
      setSelectedConversation(findUser[0]);
    }
  };

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  return (
    <div className="flex justify-between py-4 items-center">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered min-w-[250px]"
          value={search}
          onChange={onChangeSearch}
        />
        <button className="btn btn-square btn-ghost " onClick={onSearch}>
          <SearchIcon />
        </button>
      </div>
      <div className="flex items-center">
        <div className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="my avatar" src={user?.avatar as string} />
          </div>
        </div>
        <button className="btn btn-square btn-ghost" onClick={onLogout}>
          <LogoutIcon />
        </button>
      </div>
    </div>
  );
};
