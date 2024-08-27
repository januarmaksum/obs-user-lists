import { ImageUp, X } from "lucide-react";
import * as React from "react";
import { UserPlus } from "lucide-react";

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userDetails: {
    firstName: string;
    lastName: string;
    avatar?: File;
  }) => void;
}

export default function AddUserModal({
  isOpen,
  onClose,
  onSave,
}: AddUserModalProps) {
  const dialog = React.useRef<HTMLDialogElement>(null);
  const [userDetails, setUserDetails] = React.useState<{
    firstName: string;
    lastName: string;
    avatar?: File;
  }>({
    firstName: "",
    lastName: "",
  });
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUserDetails((prev) => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();
    onSave(userDetails);
    onClose();
    setUserDetails({
      firstName: "",
      lastName: "",
      avatar: undefined,
    });
    setImagePreview(null);
  };

  React.useEffect(() => {
    if (isOpen && dialog.current) {
      dialog.current.showModal();
    } else if (!isOpen && dialog.current) {
      dialog.current.close();
    }
  }, [isOpen]);

  return (
    <dialog className="modal" ref={dialog}>
      <div className="modal-box relative">
        <form method="dialog" onKeyDown={handleKeyPress}>
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            <X />
          </button>
        </form>
        <div className="border-b pb-2 border-gray-600">
          <h3 className="font-bold text-lg text-white">Add user</h3>
        </div>
        <form className="mt-5" onSubmit={handleSave}>
          <div className="flex justify-center mb-3">
            <div
              className="avatar cursor-pointer relative"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              <div className="mask mask-squircle w-24 relative">
                {!imagePreview && (
                  <div className="flex w-full h-24 justify-center items-center bg-gray-900">
                    <UserPlus size={36} />
                  </div>
                )}
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="new user"
                    className="w-16 h-16"
                  />
                )}
                <div className="absolute inset-0 bg-black flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <ImageUp className="text-white" size={36} />
                </div>
              </div>
            </div>
          </div>
          <input
            type="file"
            id="fileInput"
            className="file-input hidden"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
          />
          <div className="grid grid-cols-2 gap-4">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                name="firstName"
                placeholder="Type here"
                value={userDetails.firstName}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                name="lastName"
                placeholder="Type here"
                value={userDetails.lastName}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>
          </div>
          <div className="flex mt-6 justify-end">
            <button type="submit" className="btn btn-accent">
              Save
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
