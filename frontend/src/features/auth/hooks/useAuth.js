import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
} from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  const login = async (payload) => {
    try {
      setLoading(true);

      const res = await loginApi(payload);

      setUser(res.user);

      return res;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    try {
      setLoading(true);

      const res = await registerApi(payload);

      setUser(res.data.user);

      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);

      await logoutApi();

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
  };
};
