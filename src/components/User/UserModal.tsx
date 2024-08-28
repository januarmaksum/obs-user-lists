import * as React from "react";
import { ImageUp, X } from "lucide-react";
import useUserStore from "@/store/userStore";
import { IUser } from "@/interfaces/user.interface";
import { Toastr } from "@/components/Toast";

interface UserModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ title, isOpen, onClose }) => {
  const { selectedUser, setUsers } = useUserStore();
  const dialog = React.useRef<HTMLDialogElement>(null);
  const [userDetails, setUserDetails] = React.useState<Partial<IUser>>({
    firstName: "",
    lastName: "",
    username: "",
    avatar: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          avatar: reader.result as string, // base64
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    if (
      selectedUser &&
      window.confirm("Are you sure you want to delete this user?")
    ) {
      const updatedUsers = useUserStore
        .getState()
        .users.filter((user) => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      Toastr.success('User deleted successfully.');
      onClose();
    }
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedUser) {
      const updatedUsers = useUserStore
        .getState()
        .users.map((user) =>
          user.id === selectedUser.id ? { ...user, ...userDetails } : user
        );
      setUsers(updatedUsers);
      Toastr.success('User updated successfully.');
    }
    onClose();
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  React.useEffect(() => {
    if (isOpen && dialog.current) {
      dialog.current.showModal();
    } else if (!isOpen && dialog.current) {
      dialog.current.close();
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (selectedUser) {
      setUserDetails({
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        username: selectedUser.username,
        avatar: selectedUser.avatar || "",
      });
    }
  }, [selectedUser]);

  return (
    <dialog id="modalDialog" className="modal modal-bottom sm:modal-middle" ref={dialog}>
      <div className="modal-box">
        <label
          htmlFor="modalDialog"
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          <X />
        </label>
        <div className="border-b pb-2 border-gray-600">
          <h3 className="font-bold text-lg text-white">{title}</h3>
        </div>
        <form className="mt-5" onSubmit={handleSave}>
          <div className="flex justify-center mb-3">
            <div
              className="avatar cursor-pointer relative"
              onClick={() => document.getElementById("fileInputEdit")?.click()}
            >
              <div className="mask mask-squircle w-24 relative">
                <img
                  src={userDetails.avatar ?? ""}
                  alt={`${userDetails.firstName} ${userDetails.lastName}`}
                  className="w-16 h-16"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 md:hover:opacity-100 transition-opacity duration-300">
                  <ImageUp className="text-white" size={36} />
                </div>
              </div>
            </div>
          </div>
          <input
            type="file"
            id="fileInputEdit"
            className="file-input hidden"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                name="firstName"
                value={userDetails.firstName || ""}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </label>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                name="lastName"
                value={userDetails.lastName || ""}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </label>
          </div>
          <div className="flex mt-6 justify-between gap-2">
            <div className="text-xs font-normal text-slate-300 flex items-end text-balance">
              * You can edit and delete user
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="btn btn-error btn-outline"
                onClick={handleDelete}
              >
                DELETE
              </button>
              <button type="submit" className="btn btn-accent ">
                SAVE
              </button>
            </div>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UserModal;
