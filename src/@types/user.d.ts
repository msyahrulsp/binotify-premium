export type IUser = {
  user_id?: number;
  name?: string;
  isAdmin?: boolean;
};

export type IAuth = {
  user: string;
  password: string;
};
