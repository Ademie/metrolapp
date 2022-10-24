import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  check_InputChange: false,
  secureTextEntry: true,
  isValidUser: true,
  isValidPassword: true,
};

const splashSlice = createSlice({
  name:"splashed",
  initialState,
  reducers: {
    PasswordChange: (state, action) => {
      state.password = action.payload;
    },
    updateSecureTextEntry: (state, action) => {
      state.secureTextEntry = action.payload;
    },
  },
});

export const {InputChange, PasswordChange, updateSecureTextEntry} =
  splashSlice.actions;

// SELECTORS
export const selectEmail = (state) => state.splashed.email
export const selectPassword = (state) => state.splashed.password
export const selectCheck_InputChange = (state) => state.splashed.check_InputChange
export const selectSecureTextEntry = (state) => state.splashed.secureTextEntry
export const selectIsValidUser = (state) => state.splashed.isValidUser
export const selectIsValidPassword = (state) => state.splashed.isValidPassword


export default splashSlice.reducer;
