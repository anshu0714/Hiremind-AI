import { useState, useMemo, useEffect } from "react";
import { AuthContext } from "./auth.context";
import { getUser } from "../services/auth.api";
import { logger } from "@/utils/logger.util";
import { setLogoutHandler } from "@/utils/auth.util";
import { useNavigate } from "react-router-dom";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setLogoutHandler(() => {
      setUser(null);
      navigate("/login");
    });

    return () => setLogoutHandler(null);
  }, [navigate]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await getUser();
        setUser(res.user);
      } catch (err) {
        setUser(null);

        if (err?.status !== 401) {
          logger.error("AUTH_INIT_ERROR", err.message);
        }
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
