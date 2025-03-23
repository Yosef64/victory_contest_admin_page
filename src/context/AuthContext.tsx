import { loginUser, registerUser } from "@/lib/utils";
import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: {
    email: string;
    password: string;
    name: string;
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();
  if (!user) {
    navigate("/");
  }
  const login = async (email: string, password: string) => {
    try {
      const res = await loginUser(email, password);
      const {
        message,
      }: { message: null | { isApproved: boolean; auth: boolean } } = res;
      console.log(message);
      if (message === null) {
        throw new Error("user not found");
      }

      if (message.auth == false) {
        throw new Error("Wrong password!");
      }
      if (message.isApproved == false) {
        throw new Error(
          "Your are not approve by another admin. Please wait until you approved!"
        );
      }
      localStorage.setItem("user", JSON.stringify(message));

      setUser(message);
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("Connection issue");
      }
    }
  };
  const register = async (data: {
    email: string;
    password: string;
    name: string;
  }) => {
    try {
      await registerUser(data);
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("Connection issue");
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
