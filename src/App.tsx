import * as React from "react";
import Heading from "@/components/Heading";
import SearchBar from "@/components/SearchBar";
import UserLists from "@/components/User/UserLists";
import useUserStore from "@/store/userStore";
import { fetchUsers } from "@/services/userService";

function App() {
  const { users, setUsers } = useUserStore();

  React.useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };

    getUsers();
  }, [setUsers]);

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <Heading />
      <SearchBar />
      <UserLists users={users} />
    </div>
  );
}

export default App;
