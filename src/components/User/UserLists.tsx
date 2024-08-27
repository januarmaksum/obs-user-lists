import * as React from "react";
import { IUser } from "@/interfaces/user.interface";
import UserCard from "@/components/User/UserCard";
import UserModal from "@/components/User/UserModal";
import useUserStore from "@/store/userStore";
import { CaptionsOff } from "lucide-react";

interface UserListsProps {
  users: IUser[];
}

const UserLists: React.FC<UserListsProps> = ({ users }) => {
  const { selectedUser, setSelectedUser } = useUserStore();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClickCard = (user: IUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (users.length === 0) {
    return (
      <div className="flex pt-60 justify-center items-center flex-col gap-5">
        <CaptionsOff size={104} />
        <h2 className="text-2xl">Users Not Found</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users.map((user) => (
        <UserCard
          key={user.id}
          {...user}
          onClickCard={() => handleClickCard(user)}
        />
      ))}

      {selectedUser && (
        <UserModal
          title={`Hello, ${selectedUser.firstName}!`}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default UserLists;
