import { useContext } from "react";
import AuthContext from "./auth-context";

// Custom hook to access AuthContext
const useAuth = () => useContext(AuthContext);

export default useAuth;