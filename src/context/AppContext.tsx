import { createContext, Dispatch, SetStateAction } from 'react';

import { AppContextProps } from '../@types/context';

export const AppContext = createContext<AppContextProps | null>(null);
