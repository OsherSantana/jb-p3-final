import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Vacation from "../models/vacation/Vacation";

interface VacationProfileState {
    vacations: Vacation[];
}

const initialState: VacationProfileState = {
    vacations: []
};

export const vacationProfileSlice = createSlice({
    name: 'vacationProfile',
    initialState,
    reducers: {
        initVacations: (state, action: PayloadAction<Vacation[]>) => {
            state.vacations = action.payload;
        },
        newVacation: (state, action: PayloadAction<Vacation>) => {
            state.vacations = [action.payload, ...state.vacations];
        },
        removeVacation: (state, action: PayloadAction<{ id: string }>) => {
            state.vacations = state.vacations.filter(v => v.id !== action.payload.id);
        },
        updateVacation: (state, action: PayloadAction<Vacation>) => {
            const index = state.vacations.findIndex(v => v.id === action.payload.id);
            if (index > -1) {
                state.vacations[index] = action.payload;
            }
        }
    }
});

export const {
    initVacations,
    newVacation,
    removeVacation,
    updateVacation,
} = vacationProfileSlice.actions;

export default vacationProfileSlice.reducer;
