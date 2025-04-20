// src/services/auth.ts
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Login from "../models/user/Login";
import { AppDispatch } from "../redux/store";
import { login as loginAction } from "../redux/authSlice";

interface DecodedToken {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
}

class Auth {
  async login(loginData: Login, dispatch: AppDispatch): Promise<void> {
    const response = await axios.post<{ jwt: string }>(
      `${import.meta.env.VITE_REST_SERVER_URL}/auth/login`,
      loginData
    );

    const token = response.data.jwt;
    const decoded: DecodedToken = jwtDecode(token);

    dispatch(loginAction({
      user: {
        id: decoded.id,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email,
        role: decoded.role
      },
      jwt: token
    }));

    localStorage.setItem("token", token);
  }

  async signup(signupData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }, dispatch: AppDispatch): Promise<void> {
    const response = await axios.post<{ jwt: string }>(
      `${import.meta.env.VITE_REST_SERVER_URL}/auth/signup`,
      signupData
    );

    const token = response.data.jwt;
    const decoded: DecodedToken = jwtDecode(token);

    dispatch(loginAction({
      user: {
        id: decoded.id,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email,
        role: decoded.role
      },
      jwt: token
    }));

    localStorage.setItem("token", token);
  }
}

const auth = new Auth();
export default auth;
