import { useState, useMemo, useEffect } from "react";
import { AuthContext } from "./auth.context";
import { getUser } from "../services/auth.api";
import { logError } from "@/utils/logger.util";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await getUser();
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
        logError("Auth init error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      loading,
      setLoading,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
