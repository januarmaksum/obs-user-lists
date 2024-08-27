export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string | null;
}

export interface ITransformedApiResponse {
  users: IUser[];
  total: number;
  skip: number;
  limit: number;
}
