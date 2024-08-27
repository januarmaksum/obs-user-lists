import { IUser } from "@/interfaces/user.interface";

interface UserCardProps extends IUser {
  onClickCard: () => void;
}

export default function UserCard({
  firstName,
  lastName,
  username,
  onClickCard,
}: UserCardProps) {
  return (
    <div
      className="bg-gray-800 text-white p-4 rounded-lg shadow-lg relative cursor-pointer"
      onClick={onClickCard}
    >
      <img
        src={`https://i.pravatar.cc/250?u=${username}`}
        alt={`${firstName} ${lastName}`}
        className="w-16 h-16 rounded-full mx-auto"
      />
      <h3 className="text-center text-lg mt-2">{firstName} {lastName}</h3>
    </div>
  );
}
