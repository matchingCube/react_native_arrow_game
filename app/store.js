import { configureStore } from "@reduxjs/toolkit";
import settingStateReducer from "./settingStateSlice";

export default configureStore({
	reducer: {
		settingState: settingStateReducer,
	},
});
