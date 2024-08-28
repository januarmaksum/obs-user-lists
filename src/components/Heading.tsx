import { CircleUserRound } from "lucide-react";

interface HeadingProps {
  onAddUser: () => void;
  error: string | null;
  loading: boolean;
}

export default function Heading({ onAddUser, error, loading }: HeadingProps) {
  return (
    <div className="flex border-b-2 pb-3 justify-between items-center gap-3 mb-4">
      <a href="/" className="flex items-center gap-1 md:gap-3 hover:text-white">
        <CircleUserRound size={30} />
        <h1 className="text-lg md:text-3xl font-bold">User Lists</h1>
      </a>
      {!error && !loading && (
        <button
          className="btn btn-sm md:btn-md btn-info"
          onClick={onAddUser}
        >
          ADD USER
        </button>
      )}
      {loading && <div className="skeleton bg-gray-800 h-8 w-32 rounded"></div>}
    </div>
  );
}
