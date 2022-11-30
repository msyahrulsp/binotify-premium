import { IUser } from './user';

export type AppContextProps = {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  message: string;
  setMessageContent: (message: string) => void;
};
