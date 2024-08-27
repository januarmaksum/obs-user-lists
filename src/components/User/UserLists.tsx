import * as React from "react";
import { IUser } from "@/interfaces/user.interface";
import UserCard from "@/components/User/UserCard";
import UserModal from "@/components/User/UserModal";
import useUserStore from "@/store/userStore";

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
    return <p>No users available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
