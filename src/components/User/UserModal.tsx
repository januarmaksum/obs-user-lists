import * as React from "react";
import { X } from "lucide-react";
import useUserStore from "@/store/userStore";
import { IUser } from "@/interfaces/user.interface";

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
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    if (selectedUser && window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = useUserStore
        .getState()
        .users.filter((user) => user.id !== selectedUser.id);
      setUsers(updatedUsers);
    }
    onClose();
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
    }
    onClose();
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
        email: selectedUser.email,
      });
    }
  }, [selectedUser]);

  return (
    <dialog className="modal" ref={dialog}>
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            <X />
          </button>
        </form>
        <div className="border-b pb-2">
          <h3 className="font-bold text-lg">{title}</h3>
        </div>
        <form className="mt-5" onSubmit={handleSave}>
          <div className="grid grid-cols-2 gap-4">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                name="firstName"
                value={userDetails.firstName || ""}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                name="lastName"
                value={userDetails.lastName || ""}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div className="modal-action">
            <button type="button" className="btn btn-error" onClick={handleDelete}>
              Delete
            </button>
            <button type="submit" className="btn btn-accent btn-outline">
              Save
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UserModal;
