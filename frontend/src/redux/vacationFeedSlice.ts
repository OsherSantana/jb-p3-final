import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Vacation from "../models/vacation/Vacation";

interface VacationFeedState {
    vacations: Vacation[];
    isNewContent: boolean;
}

const initialState: VacationFeedState = {
    vacations: [],
    isNewContent: false
};

const vacationFeedSlice = createSlice({
    name: "vacationFeed",
    initialState,
    reducers: {
        initVacations: (state: VacationFeedState, action: PayloadAction<Vacation[]>) => {
            state.vacations = action.payload;
        },
        setVacationNewContent: (state, action: PayloadAction<boolean>) => {
            state.isNewContent = action.payload;
        }
    }
});

export const { initVacations, setVacationNewContent } = vacationFeedSlice.actions;
export default vacationFeedSlice.reducer;
