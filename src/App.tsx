import * as React from "react";
import { UserSearch } from "lucide-react";
import Heading from "@/components/Heading";
import UserLists from "@/components/User/UserLists";
import UserCardSkeleton from "@/components/User/UserCardSkeleton";
import AddUserModal from "@/components/User/AddUserModal";
import useUserStore from "@/store/userStore";
import { fetchUsers } from "@/services/userService";
import { IUser } from "@/interfaces/user.interface";
import { generateRandomId } from "@/utils";

function App() {
  const { users, setUsers } = useUserStore();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch {
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [setUsers]);

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (userDetails: {
    firstName: string;
    lastName: string;
    avatar?: File;
  }) => {
    try {
      const newUserId = generateRandomId();

      const newUser: IUser = {
        id: newUserId,
        username: `${userDetails.firstName.toLowerCase()}${userDetails.lastName.toLowerCase()}`,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        avatar: userDetails.avatar
          ? URL.createObjectURL(userDetails.avatar)
          : "",
      };

      setUsers([...users, newUser]);
    } catch (error) {
      console.error("Failed to save user", error);
    } finally {
      handleCloseModal();
    }
  };

  return (
    <div className="p-4 min-h-screen container mx-auto">
      <Heading onAddUser={handleAddUser} error={error} loading={loading} />
      <AddUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
      {loading && !error ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <UserCardSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="flex pt-60 justify-center items-center flex-col gap-5">
          <UserSearch size={104} />
          <h2 className="text-2xl">{error}</h2>
        </div>
      ) : (
        <UserLists users={users} />
      )}
    </div>
  );
}

export default App;
