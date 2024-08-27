import axios from "axios";
import { IUser } from "@/interfaces/user.interface";

export const fetchUsers = async (): Promise<IUser[]> => {
  try {
    const response = await axios.get("https://dummyjson.com/users?limit=12");
    const users = response.data?.users || [];
    return users;
  } catch (error) {
    console.error("Failed to fetch users: ", error);
    throw error;
  }
};
