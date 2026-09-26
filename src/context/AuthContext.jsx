import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

const USERS_KEY = "freshfind-users";
const SESSION_KEY = "freshfind-user";

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage(SESSION_KEY, null);
  const [users, setUsers] = useLocalStorage(USERS_KEY, []);

  const isAuthenticated = Boolean(user);

  const login = (username, password) => {
    const match = users.find(
      (u) => u.username === username && u.password === password
    );
    if (!match) return false;
    setUser({ username: match.username });
    return true;
  };

  const register = (username, password) => {
    if (users.some((u) => u.username === username)) return false;
    const newUser = { username, password };
    setUsers((current) => [...current, newUser]);
    setUser({ username });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
