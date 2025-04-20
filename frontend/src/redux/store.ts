import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import vacationFeedReducer from "./vacationFeedSlice";
import vacationProfileReducer from "./vacationProfileSlice";
import userFollowingReducer from "./userFollowingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, 
    vacationFeed: vacationFeedReducer,
    vacationProfile: vacationProfileReducer,
    userFollowing: userFollowingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
