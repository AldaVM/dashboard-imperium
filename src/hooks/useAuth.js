import { useContext } from "react";
import { AuthContext } from '../context'
export default function useAuth() {
    const context = useContext(AuthContext);
    return context;
};