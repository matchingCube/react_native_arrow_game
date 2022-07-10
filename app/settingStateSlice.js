import { createSlice } from "@reduxjs/toolkit";

export const settingStateSlice = createSlice({
	name: "settingState",
	initialState: {
		soundState: true,
		musicState: true,
		fromWhereToSettings: "",
	},
	reducers: {
		toggleSoundState: (state, action) => {
			state.soundState = !state.soundState;
		},
		toggleMusicState: (state, action) => {
			state.musicState = !state.musicState;
		},
		setFromWhereToSettings: (state, action) => {
			state.fromWhereToSettings = action.payload;
		},
	},
});

export const { toggleSoundState, toggleMusicState, setFromWhereToSettings } =
	settingStateSlice.actions;
export default settingStateSlice.reducer;
