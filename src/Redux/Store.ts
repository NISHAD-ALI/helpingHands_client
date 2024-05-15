import { configureStore, combineReducers, Reducer } from "@reduxjs/toolkit";
import AuthReducer, { AuthState } from "./Slices/Auth";


export type RootState = {
    auth: AuthState;
   
};

// Combine reducers
const rootReducer: Reducer<RootState> = combineReducers({
    auth: AuthReducer,
    
});


const store = configureStore({
    reducer: rootReducer,
});

export default store;
