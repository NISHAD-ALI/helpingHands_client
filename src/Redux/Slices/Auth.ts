import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    userData: any;
    communityData: any;
}

const initialState: AuthState = {
    userData: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData') as string) : null,
    communityData: localStorage.getItem('communityData') ? JSON.parse(localStorage.getItem('communityData') as string) : null,
}

const Auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<any>) => {
            state.userData = action.payload;
            localStorage.setItem('userData', JSON.stringify(action.payload));
        },
        userLogout: (state) => {
            state.userData = null;
            localStorage.removeItem('userData');
        },
        setCommunityData: (state, action: PayloadAction<any>) => {
            state.communityData = action.payload;
            localStorage.setItem('communityData', JSON.stringify(action.payload));
        },
        communityLogout: (state) => {
            state.communityData = null;
            localStorage.removeItem('communityData');
        },
    },
});

export const { setUserData, userLogout, setCommunityData, communityLogout } = Auth.actions;
export default Auth.reducer;
