import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    userData: any;
    communityData: any;
    volunteerData: any;
    adminData: any;
}

const getUserDataFromLocalStorage = (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

const initialState: AuthState = {
    userData: getUserDataFromLocalStorage('userData'),
    communityData: getUserDataFromLocalStorage('communityData'),
    volunteerData: getUserDataFromLocalStorage('volunteerData'),
    adminData: getUserDataFromLocalStorage('adminData'),
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
        setVolunteerData: (state, action: PayloadAction<any>) => {
            state.volunteerData = action.payload;
            localStorage.setItem('volunteerData', JSON.stringify(action.payload));
        },
        volunteerLogout: (state) => {
            state.volunteerData = null;
            localStorage.removeItem('volunteerData');
        },
        setAdminData: (state, action: PayloadAction<any>) => {
            state.adminData = action.payload;
            localStorage.setItem('adminData', JSON.stringify(action.payload));
        },
        adminLogout: (state) => {
            state.adminData = null;
            localStorage.removeItem('adminData');
        },
    },
});

export const { setUserData, userLogout, setCommunityData, communityLogout, setVolunteerData, volunteerLogout, setAdminData, adminLogout } = Auth.actions;
export default Auth.reducer;
