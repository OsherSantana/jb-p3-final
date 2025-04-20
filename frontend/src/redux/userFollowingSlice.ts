import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import User from "../models/user/User";

interface FollowingState {
    userFollowing: User[];
}

const initialState: FollowingState = {
    userFollowing: []
};

export const userFollowingSlice = createSlice({
    name: 'following',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<User[]>) => {
            state.userFollowing = action.payload;
        },
        unfollow: (state, action: PayloadAction<{ userId: string }>) => {
            state.userFollowing = state.userFollowing.filter(f => f.id !== action.payload.userId);
        },
        follow: (state, action: PayloadAction<User>) => {
            state.userFollowing.push(action.payload);
        }
    }
});

export const { init, unfollow, follow } = userFollowingSlice.actions;

export default userFollowingSlice.reducer;
