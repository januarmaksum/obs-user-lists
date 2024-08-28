// using relative path, because using @ alias it doesn't work for testing
import { IUser } from "../../interfaces/user.interface";
import useUserStore from "../../store/userStore";

interface UserCardProps extends IUser {
  onClickCard?: () => void;
}

export default function UserCard({
  firstName,
  lastName,
  username,
  avatar,
  onClickCard,
}: UserCardProps) {
  const { selectedUser } = useUserStore();
  const isActive = selectedUser?.username === username;

  return (
    <div
      className={`bg-gray-800 text-white p-4 rounded-lg shadow-lg relative cursor-pointer text-center transform transition duration-300 ${
        isActive ? "scale-105 bg-gray-700" : "hover:scale-105 hover:bg-gray-700"
      }`}
      onClick={onClickCard}
    >
      <div className="avatar">
        <div className="mask mask-squircle w-16 md:w-24">
          <img
            src={avatar ?? ""}
            alt={`${firstName} ${lastName}`}
            className="h-auto max-w-full"
          />
        </div>
      </div>
      <h3 className="text-center text-sm md:text-lg mt-2">
        {firstName} {lastName}
      </h3>
    </div>
  );
}
