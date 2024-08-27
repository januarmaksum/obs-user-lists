import { CircleUserRound } from "lucide-react";

interface HeadingProps {
  onAddUser: () => void;
}

export default function Heading({ onAddUser }: HeadingProps) {
  return (
    <div className="flex border-b-2 pb-3 justify-between items-center gap-3 mb-10">
      <div className="flex items-center gap-1 md:gap-3">
        <CircleUserRound size={30} />
        <h1 className="text-lg md:text-3xl font-bold">User Lists</h1>
      </div>
      <button
        className="btn btn-sm md:btn-md btn-primary"
        onClick={onAddUser}
        aria-label="Add user"
      >
        Add user
      </button>
    </div>
  );
}
