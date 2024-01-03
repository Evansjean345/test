import Cookies from "js-cookie";
import { createContext, useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(Cookies.get("userId") || null);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const navigate = useNavigate();

  const login = ({ userId, token }) => {
    setUserId(userId);
    setToken(token);
    Cookies.set("userId", userId);
    Cookies.set("token", token);
    Cookies.get("jwt");
    console.log(userId, token);
  };

  const logout = () => {
    setUserId(null);
    setToken(null);
    Cookies.remove("userId");
    Cookies.remove("token");
    navigate("/");
  };

  const isAuthenticated = () => {
    const _id = userId;
    return token !== null && userId === _id ? token : undefined;
  };

  const getUserInfo = async () => {
    const response = await fetch(
      `https://tame-veil-tuna.cyclic.app/user/${userId}`
    );
    const data = await response.json();
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        userId,
        token,
        login,
        logout,
        isAuthenticated,
        getUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
