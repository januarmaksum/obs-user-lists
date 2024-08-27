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
    console.log('user click: ', user);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

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
