import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  origin: null,
  destination: null,
  travelTime: null,
  home: {description: 'Add home'},
  work: {description: 'Add work'},
 
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTime: (state, action) => {
      state.travelTime = action.payload;
    },
    setHome: (state, action) => {
      state.home = action.payload;
    },
    setWork: (state, action) => {
      state.work = action.payload;
    },
    setUsername: (state, action) => {
      state.Username = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTime, setHome, setWork, setUsername } = navSlice.actions;

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTime = (state) => state.nav.travelTime;
export const selectHome = (state) => state.nav.home;
export const selectWork = (state) => state.nav.work;




export default navSlice.reducer;
