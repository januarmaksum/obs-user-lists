import * as React from "react";
import Heading from "@/components/Heading";
import UserLists from "@/components/User/UserLists";
import UserCardSkeleton from "@/components/User/UserCardSkeleton";
import AddUserModal from "@/components/User/AddUserModal";
import useUserStore from "@/store/userStore";
import { fetchUsers } from "@/services/userService";
import { CaptionsOff } from "lucide-react";
import { IUser } from "@/interfaces/user.interface";

// Utility function to generate a random numeric ID
const generateRandomId = () => Math.floor(Math.random() * 1_000_000);

function App() {
  const { users, setUsers } = useUserStore();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch (error) {
        console.error("Failed to fetch users", error);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [setUsers]);

  const handleAddUser = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async (userDetails: {
    firstName: string;
    lastName: string;
    avatar?: File;
  }) => {
    try {
      // Generate a random numeric ID
      const newUserId = generateRandomId();

      // Create a new user object with only the relevant fields
      const newUser: IUser = {
        id: newUserId,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        avatar: userDetails.avatar
          ? URL.createObjectURL(userDetails.avatar)
          : "",
        // Provide default values for other required fields
        image: "",
        age: 0,
        gender: "",
        email: "",
        phone: "",
        username: "",
        birthDate: "",
        bloodGroup: "",
        height: 0,
        weight: 0,
        eyeColor: "",
        hair: {
          color: "",
          type: "",
        },
        address: {
          address: "",
          city: "",
          state: "",
          stateCode: "",
          postalCode: "",
          country: "",
          coordinates: {
            lat: 0,
            lng: 0,
          },
        },
        macAddress: "",
        university: "",
        bank: {
          cardExpire: "",
          cardNumber: "",
          cardType: "",
          currency: "",
          iban: "",
        },
        company: {
          department: "",
          name: "",
          title: "",
          address: {
            address: "",
            city: "",
            state: "",
            stateCode: "",
            postalCode: "",
            country: "",
            coordinates: {
              lat: 0,
              lng: 0,
            },
          },
        },
        ein: "",
        ssn: "",
        userAgent: "",
        crypto: {
          coin: "",
          wallet: "",
          network: "",
        },
        role: "",
      };

      // Update Zustand store with new user details
      setUsers([...users, newUser]);
    } catch (error) {
      console.error("Failed to save user", error);
      // Handle error (e.g., show notification or error message)
    } finally {
      handleCloseModal();
    }
  };

  return (
    <div className="p-4 min-h-screen container mx-auto">
      <Heading onAddUser={handleAddUser} />
      <AddUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
      {loading && !error ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <UserCardSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <div className="flex pt-60 justify-center items-center flex-col gap-5">
          <CaptionsOff size={104} />
          <h2 className="text-2xl">{error}</h2>
        </div>
      ) : (
        <UserLists users={users} />
      )}
    </div>
  );
}

export default App;
