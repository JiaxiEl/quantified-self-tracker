import * as React from 'react';
import type { UserContextValue } from '@/contexts/user-context';
import { UserContext } from '@/contexts/user-context';
import { authClient } from '@/lib/auth/client';

export function useUser(): UserContextValue {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  React.useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem('custom-auth-token');
      if (token) {
        const response = await authClient.getUser();
        if (response.data) {
          context.setUser?.(response.data); // Use optional chaining in case setUser might not exist
        }
      }
    };

    checkSession();
  }, [context]); // Include context in the dependency array

  return context;
}
