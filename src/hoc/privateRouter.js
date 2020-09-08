import { useAuth } from "../hooks";
import { useEffect } from "react";
import Cookies from "js-cookie";

export function ProtectRoute(Component) {
  return (props) => {
    const { isAuthenticated, logout, loadUserFromCookies } = useAuth();
    useEffect(() => {
      const token = Cookies.get("token");
      if (token) {
        loadUserFromCookies();
      } else {
        loadUserFromCookies();
        if (!isAuthenticated) logout();
      }
    }, []);

    return <Component {...props} />;
  };
}
