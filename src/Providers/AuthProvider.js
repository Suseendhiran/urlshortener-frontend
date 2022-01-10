import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext();
function AuthProvider({ children }) {
  const [token, setToken] = useState({});
  function getUser() {
    console.log(JSON.parse(localStorage.getItem("userData")));
    return JSON.parse(localStorage.getItem("userData"));
  }
  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem("token");

    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    } else {
      setToken(false);
    }
  }, []);

  const value = useMemo(() => {
    return {
      token,
      setToken,
      getUser,
    };
  }, [token, setToken, getUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
