import { jwtDecode } from "jwt-decode";
import { useContext, useMemo } from "react";
import User from "../models/user/User";
import { AuthContext } from "../components/auth/auth/Auth";

export default function useUsername() {
  const { jwt } = useContext(AuthContext)!;

  const name = useMemo(() => {
    try {
      if (!jwt || jwt.split(".").length !== 3) return "";
      const { firstName, lastName } = jwtDecode<User>(jwt);
      return `${firstName} ${lastName}`;
    } catch {
      return "";
    }
  }, [jwt]);

  return name;
}
