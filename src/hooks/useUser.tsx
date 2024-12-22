"use client";

import { supabase } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  username?: string;
  useUsername?: boolean;
  rank?: string;
};

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const userMetadata = session.user.user_metadata;
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          username: userMetadata?.username,
          rank: userMetadata?.rank,
          useUsername: userMetadata?.useUsername || false, // Ensure this is included
        });
      } else {
        setUser(null);
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          const userMetadata = session.user.user_metadata;
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            username: userMetadata?.username,
            rank: userMetadata?.rank,
            useUsername: userMetadata?.useUsername || false, // Ensure this is included
          });
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return { user, setUser, logout };
};
