import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    userData: any; 
}

const userDataString = localStorage.getItem('userData');
const initialState: AuthState = {
    userData: userDataString ? JSON.parse(userDataString) : null
};

const Auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<any>) => { 
            state.userData = action.payload;
            localStorage.setItem('userData', JSON.stringify(action.payload));
        },
        userLogout: (state) =>{
            state.userData = null;
            localStorage.removeItem('userData')
        }
    },
});

export const { setUserData,userLogout } = Auth.actions;

export default Auth.reducer;
