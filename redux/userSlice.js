// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     username: {username: 'Add home'},
//     // email: null,
//     // password: null,
//     // image: null,
//     // list: [],
// }

// const userSlice = createSlice({
//     name: "userInfo",
//     initialState,
//     reducers: {
//         setUsername: (state, action) => {
//             state.username = action.payload
//         },
//         setEmail: (state, action) => {
//             state.email = action.payload
//         },
//         setPassword: (state, action) =>{
//             state.password = action.payload
//         },
//         setImage: (state, action) => {
//             state.image = action.payload
//         },
//         setList: (state, action) => {
//             state.list = action.payload
//         },
//     },
// })

// export const [setUsername, setEmail, setPassword, setImage, setList] = userSlice.actions

// export const selectUsername = (state) => state.userInfo.username;
// export const selectEmail = (state) => state.userInfo.email;
// export const selectPassword = (state) => state.userInfo.password;
// export const selectImage = (state) => state.userInfo.image;
// export const selectList = (state) => state.userInfo.list;

// export default userSlice.reducer