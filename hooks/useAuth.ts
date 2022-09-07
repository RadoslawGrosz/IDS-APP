import AuthContext from "../components/AuthContexts";
import { useContext } from "react";

export const useAuth = () => useContext(AuthContext);
