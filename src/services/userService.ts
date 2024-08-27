import axios from "axios";
import { IUser } from "@/interfaces/user.interface";

// Function to fetch users
const fetchUserData = async (): Promise<IUser[]> => {
  const response = await axios.get("https://dummyjson.com/users?limit=12");
  const users = response.data?.users || [];
  return users.map((user: IUser) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    avatar: null, // Default avatar is null
  }));
};

// Function to fetch avatars
const fetchAvatars = async (): Promise<string[]> => {
  const response = await axios.get("https://picsum.photos/v2/list?page=1&limit=12");
  return response.data.map((image: any) => image.download_url);
};

// Combined function to fetch users and avatars
export const fetchUsers = async (): Promise<IUser[]> => {
  try {
    const [users, avatars] = await Promise.all([fetchUserData(), fetchAvatars()]);
    return users.map((user, index) => ({
      ...user,
      avatar: avatars[index] || null, // Assign avatar from fetched images
    }));
  } catch (error) {
    console.error("Failed to fetch users or avatars: ", error);
    throw error;
  }
};
