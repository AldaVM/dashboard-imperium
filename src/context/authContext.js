import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import moment from "moment";
import { useRouter } from "next/router";

//api here is an axios instance
import api from "../api";

export const AuthContext = createContext({});

//falta aplicar bien lo del loading
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    loadUserFromCookies();
  }, []);

  const login = async (email, password) => {
    const {
      data: {
        data: { token, user },
      },
    } = await api.post("/auth/signin", { email, password });
    if (token) {
      console.log("Got token");
      Cookies.set("token", token, { expires: 60 });
      api.defaults.headers.Authorization = `${token.token}`;
      setUser(user);
      console.log("Got user", user);
      return true;
    }
    return false;
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/");
  };


 const loadUserFromCookies=async()=> {
    const token = Cookies.get("token");
    if (token) {
      try {
        const { exp, user } = jwt_decode(token);
        console.log(exp, user);
        exp <= moment().unix()
          ? console.log("Token expirado")
          : setUser(user);
      } catch (error) {
        console.log(error.message);
        logout();
      }
    } else {
      setUser(null);
    }
  }








  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, logout,loadUserFromCookies }}
    >
      {children}
    </AuthContext.Provider>
  );
};
