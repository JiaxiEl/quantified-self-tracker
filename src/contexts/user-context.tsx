'use client';

import * as React from 'react';
import { User } from '@/types/user';
import { authClient } from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
  setUser: (user: User | null) => void; // Added setUser to the context value
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const [state, setState] = React.useState<{ user: User | null; error: string | null; isLoading: boolean }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const setUser = React.useCallback((user: User | null) => {
    setState((prev) => ({ ...prev, user }));
  }, []);

  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await authClient.getUser();

      if (error) {
        logger.error(error);
        setState((prev) => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
        return;
      }

      setState((prev) => ({ ...prev, user: data ?? null, error: null, isLoading: false }));
    } catch (err) {
      logger.error(err);
      setState((prev) => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
    }
  }, []);  // Dependency array is empty to avoid unnecessary re-renders

  React.useEffect(() => {
    checkSession().catch((err: unknown) => {
      logger.error(err);
    });
  }, [checkSession]);  // Ensure that the effect only runs when checkSession changes (which is stable due to useCallback)

  return (
      <UserContext.Provider value={{ ...state, checkSession, setUser }}>
        {children}
      </UserContext.Provider>
  );
}

export const UserConsumer = UserContext.Consumer;
