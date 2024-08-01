import { configureStore } from "@reduxjs/toolkit";
import changePassword from "./Features/Auth/ChangePasswordSlice";
import ForgetPassword from "./Features/Auth/ForgetPasswordSlice";
import loginReducer from "./Features/Auth/LoginSlice";
import registerReducer from "./Features/Auth/RegisterSlice";
import CreateAdsSlice from "./Features/Admin/Ads/CreateAdsSlice";
import CreateRoomsSlice from "./Features/Admin/Rooms/CreateRoomsSlice";
import AddToFavorite from "./Features/Portal/Favorites/AddToFavoriteSlice";
import RemoveFavoriteItemSlice from "./Features/Portal/Favorites/RemoveFavoriteItemSlice";
import GetAllFavoritesSlice from "./Features/Portal/Favorites/GetAllFavoritesSlice";
const Store = configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    ForgetPassword,
    changePassword,
    CreateAdsSlice,
    CreateRoomsSlice,
    AddToFavorite,
    GetAllFavoritesSlice,
    RemoveFavoriteItemSlice
  },
});

export default Store;
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
