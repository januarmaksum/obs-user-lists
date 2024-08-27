export default function UserCardSkeleton() {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg relative text-center">
      <div className="avatar">
        <div className="mask mask-squircle w-16 md:w-24 h-16 md:h-24 mx-auto bg-gray-700 animate-pulse"></div>
      </div>
      <div className="mt-2 space-y-2">
        <div className="h-4 w-3/4 mx-auto bg-gray-700 animate-pulse rounded"></div>
      </div>
    </div>
  );
}
