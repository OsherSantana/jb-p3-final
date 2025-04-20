import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
}

interface AuthState {
  user: User | null;
  jwt: string | null;
}

const initialState: AuthState = {
  user: null,
  jwt: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ Expect both user and jwt in the payload
    login: (state, action: PayloadAction<{ user: User; jwt: string }>) => {
      state.user = action.payload.user;
      state.jwt = action.payload.jwt;
      localStorage.setItem("token", action.payload.jwt); // optional if you're persisting
    },
    logout: (state) => {
      state.user = null;
      state.jwt = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
