import {
	StyleSheet,
	ImageBackground,
	View,
	TouchableOpacity,
	BackHandler,
} from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { setFromWhereToSettings } from "../app/settingStateSlice";

export default function MenuScreen({ navigation }) {
	const startBtnBI = require("../assets/img/startButton2.png");
	const settingBtnBI = require("../assets/img/optionsButton2.png");
	const exitBtnBI = require("../assets/img/exitButton.png");

	const dispatch = useDispatch();
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.btnContainer}
				onPress={() => navigation.navigate("PlayGame")}
			>
				<ImageBackground
					source={startBtnBI}
					style={styles.imgBackground}
				></ImageBackground>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.btnContainer}
				onPress={() => {
					navigation.navigate("Settings");
					dispatch(setFromWhereToSettings("Menu"));
				}}
			>
				<ImageBackground
					source={settingBtnBI}
					style={styles.imgBackground}
				></ImageBackground>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.btnContainer}
				onPress={() => BackHandler.exitApp()}
			>
				<ImageBackground
					source={exitBtnBI}
					style={styles.imgBackground}
				></ImageBackground>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgb(49,77,121)",
	},
	btnContainer: {
		width: "30%",
		height: "20%",
		margin: 10,
	},
	imgBackground: {
		flex: 1,
		resizeMode: "contain",
		width: "100%",
		alignItems: "center",
	},
});
