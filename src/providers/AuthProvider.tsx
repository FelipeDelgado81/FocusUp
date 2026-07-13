import React, { createContext, useContext, useEffect, useState } from 'react';
import { Linking } from 'react-native';
import type { Session } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

interface AuthContextValue {
  session: Session | null;
  loading: boolean;
  passwordRecovery: boolean;
  completePasswordRecovery: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [passwordRecovery, setPasswordRecovery] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return undefined;
    }

    const handleAuthUrl = async (url: string) => {
      const query = url.includes('#') ? url.split('#')[1] : url.split('?')[1];
      if (!query) return;

      const params = new URLSearchParams(query);
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      if (params.get('type') === 'recovery') {
        setPasswordRecovery(true);
      }

      if (accessToken && refreshToken) {
        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
      }
    };

    Linking.getInitialURL().then((url) => {
      if (url) void handleAuthUrl(url);
    });

    const urlSubscription = Linking.addEventListener('url', ({ url }) => {
      void handleAuthUrl(url);
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === 'PASSWORD_RECOVERY') {
        setPasswordRecovery(true);
      }
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      data.subscription.unsubscribe();
      urlSubscription.remove();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        passwordRecovery,
        completePasswordRecovery: () => setPasswordRecovery(false),
        signOut: async () => {
          await supabase.auth.signOut();
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider.');
  return context;
}
