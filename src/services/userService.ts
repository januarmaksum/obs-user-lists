import axios from "axios";
import { IUser } from "@/interfaces/user.interface";
import { IPicsumImage } from "@/interfaces/avatar.interface";

// fetch users
const fetchUserData = async (): Promise<IUser[]> => {
  const response = await axios.get("https://dummyjson.com/users?limit=12");
  const users = response.data?.users || [];
  return users.map((user: IUser) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    avatar: null,
  }));
};

// fetch avatars
const fetchAvatars = async (): Promise<string[]> => {
  const response = await axios.get<IPicsumImage[]>("https://picsum.photos/v2/list?page=1&limit=12");
  return response.data?.map((image: IPicsumImage) => `https://picsum.photos/id/${image.id}/100/100`);
};

// Combined fetch users and avatars
export const fetchUsers = async (): Promise<IUser[]> => {
  try {
    const [users, avatars] = await Promise.all([fetchUserData(), fetchAvatars()]);
    return users.map((user, index) => ({
      ...user,
      avatar: avatars[index] || null,
    }));
  } catch (error) {
    console.error("Failed to fetch users or avatars: ", error);
    throw error;
  }
};
