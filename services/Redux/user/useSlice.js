import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "status",
  initialState: {
    uid: null,
    role: null,
    accessToken: null,
    login: false,
    favorites: [],
    cartList: [],
  },
  reducers: {
    setUID: (state, action) => {
      state.uid = action.payload;
    },
    setAdmin: (state, action) => {
      state.role = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setLogin: (state) => {
      state.login = true;
    },
    setLogout: (state) => {
      state.role = null;
      state.accessToken = null;
      state.uid = null;
      state.login = false;
      state.favorites = [];
      state.cartList = [];
    },
    addFavorite: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item !== action.payload
      );
    },
    addCard: (state, action) => {
      if (!state.cartList.includes(action.payload)) {
        state.cartList.push(action.payload);
      }
    },
    removeCard: (state, action) => {
      state.cartList = state.cartList.filter((item) => item !== action.payload);
    },
  },
});

export const {
  setUID,
  setAdmin,
  setAccessToken,
  setLogin,
  setLogout,
  addFavorite,
  removeFavorite,
  addCard,
  removeCard,
} = userSlice.actions;

export const selectAdmin = (state) => state.user.role;
export const selectAccessToken = (state) => state.user.accessToken;
export const selectUid = (state) => state.user.uid;
export const selectIsLoggedIn = (state) => state.user.login;
export const selectFavorites = (state) => state.user.favorites;
export const selectCard = (state) => state.user.cartList;

export default userSlice.reducer;
