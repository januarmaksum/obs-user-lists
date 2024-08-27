import * as React from "react";
import Heading from "@/components/Heading";
import SearchBar from "@/components/SearchBar";
import UserLists from "@/components/User/UserLists";
import UserCardSkeleton from "@/components/User/UserCardSkeleton";
import useUserStore from "@/store/userStore";
import { fetchUsers } from "@/services/userService";

function App() {
  const { users, setUsers } = useUserStore();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [setUsers]);

  return (
    <div className="p-4 min-h-screen container mx-auto">
      <Heading />
      <SearchBar />
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <UserCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <UserLists users={users} />
      )}
    </div>
  );
}

export default App;
