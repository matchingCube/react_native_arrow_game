import {
	StyleSheet,
	ImageBackground,
	View,
	TouchableOpacity,
	Text,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSoundState, toggleMusicState } from "../app/settingStateSlice";

export default function Settings({ navigation }) {
	const speakerBtnBI = require("../assets/img/speakers.png");
	const speakerOffBtnBI = require("../assets/img/speakersOff.png");
	const musicBtnBI = require("../assets/img/music.png");
	const musicOffBtnBI = require("../assets/img/musicOff.png");
	const returnBtnBI = require("../assets/img/return-button.png");

	const isSoundEnabled = useSelector((state) => state.settingState.soundState);
	const isMusicEnabled = useSelector((state) => state.settingState.musicState);
	const fromWhere = useSelector(
		(state) => state.settingState.fromWhereToSettings
	);
	const dispatch = useDispatch();

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.btnContainer}
				onPress={() => dispatch(toggleSoundState())}
			>
				<ImageBackground
					source={isSoundEnabled ? speakerBtnBI : speakerOffBtnBI}
					style={styles.imgBackground}
				/>
				<Text>{isSoundEnabled ? "Sound on" : "Sound off"}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.btnContainer}
				onPress={() => dispatch(toggleMusicState())}
			>
				<ImageBackground
					source={isMusicEnabled ? musicBtnBI : musicOffBtnBI}
					style={styles.imgBackground}
				/>
				<Text>{isMusicEnabled ? "Music on" : "Music off"}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.btnContainer}
				onPress={() =>
					navigation.navigate(fromWhere === "Menu" ? "Menu" : "PlayGame")
				}
			>
				<ImageBackground source={returnBtnBI} style={styles.imgBackground} />
				<Text>Back</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: "rgb(49,77,121)",
	},
	btnContainer: {
		width: "15%",
		height: "25%",
		margin: 10,
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
	},
	imgBackground: {
		height: "100%",
		width: undefined,
		aspectRatio: 1,
		resizeMode: "cover",
		alignSelf: "center",
	},
});
