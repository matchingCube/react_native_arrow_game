import {
	StyleSheet,
	ImageBackground,
	View,
	TouchableOpacity,
	Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import { GameEngine } from "react-native-game-engine";
import { useDispatch } from "react-redux";
import { setFromWhereToSettings } from "../app/settingStateSlice";
import entities from "../entities";
import Physics from "../physics";
import Matter from "matter-js";

export default function GamePlayScreen({ navigation }) {
	const backgroundImage = require("../assets/img/background.png");
	const pauseBtnImage = require("../assets/img/button_pause.png");
	const leftBtnImage = require("../assets/img/button_left.png");
	const rightBtnImage = require("../assets/img/button_right.png");
	const crossBtnImage = require("../assets/img/button_cross.png");
	const jumpBtnImage = require("../assets/img/button_jump.png");

	var interval;
	var idleInterval;
	var moveInterval;
	const dispatch = useDispatch();

	const [running, setRunning] = useState(false);
	const [gameEngine, setGameEngine] = useState(null);
	const [currentPoints, setCurrentPoints] = useState(0);

	useEffect(() => {
		setRunning(false);
	}, []);

	return (
		<View>
			<ImageBackground source={backgroundImage} style={styles.gameBackImage}>
				<GameEngine
					ref={(ref) => {
						setGameEngine(ref);
					}}
					systems={[Physics]}
					entities={entities()}
					running={running}
					onEvent={(e) => {
						switch (e.type) {
							case "game_over":
								setRunning(false);
								clearInterval(interval);
								clearInterval(idleInterval);
								clearInterval(moveInterval);
								gameEngine.stop();
								break;
							case "new_point":
								setCurrentPoints(currentPoints + 1);
								break;
						}
					}}
					style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
				></GameEngine>
				<View style={[styles.topBottomContainer, styles.header]}>
					<TouchableOpacity
						style={styles.actionBtnContainer}
						onPress={() => {
							navigation.navigate("Settings");
							dispatch(setFromWhereToSettings("PlayGame"));
						}}
					>
						<ImageBackground
							source={pauseBtnImage}
							style={styles.imgBackground}
						></ImageBackground>
					</TouchableOpacity>
					<Text style={styles.topTextContainer}>LEVEL 1</Text>
					<Text style={styles.topTextContainer}>{currentPoints}pt</Text>
				</View>
				{!running ? (
					<View
						style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
					>
						<TouchableOpacity
							style={{
								backgroundColor: "black",
								paddingHorizontal: 50,
								paddingVertical: 20,
							}}
							onPress={() => {
								setCurrentPoints(0);
								setRunning(true);
								gameEngine.swap(entities());
								idleInterval = setInterval(() => {
									gameEngine.dispatch("idle_change");
								}, 250);
							}}
						>
							<Text
								style={{ fontWeight: "bold", color: "white", fontSize: 30 }}
							>
								START GAME
							</Text>
						</TouchableOpacity>
					</View>
				) : null}
				<View style={[styles.topBottomContainer, styles.footer]}>
					<View style={styles.footerBtnGroup}>
						<TouchableOpacity
							style={styles.actionBtnContainer}
							onPressIn={() => {
								interval = setInterval(() => {
									gameEngine.dispatch("left_move");
								}, 30);
								moveInterval = setInterval(() => {
									gameEngine.dispatch("move");
								}, 300);
							}}
							onPressOut={() => {
								clearInterval(interval);
								clearInterval(moveInterval);
							}}
						>
							<ImageBackground
								source={leftBtnImage}
								style={styles.imgBackground}
							></ImageBackground>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.actionBtnContainer}
							onPressIn={() => {
								interval = setInterval(() => {
									gameEngine.dispatch("right_move");
								}, 30);
								moveInterval = setInterval(() => {
									gameEngine.dispatch("move");
								}, 300);
							}}
							onPressOut={() => {
								clearInterval(interval);
								clearInterval(moveInterval);
							}}
						>
							<ImageBackground
								source={rightBtnImage}
								style={styles.imgBackground}
							></ImageBackground>
						</TouchableOpacity>
					</View>
					<View style={[styles.footerBtnGroup, { justifyContent: "flex-end" }]}>
						<TouchableOpacity
							style={styles.actionBtnContainer}
							onPress={() => {
								gameEngine.dispatch("shoot");
							}}
						>
							<ImageBackground
								source={crossBtnImage}
								style={styles.imgBackground}
							></ImageBackground>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.actionBtnContainer}
							onPress={() => {
								gameEngine.dispatch("jump");
							}}
						>
							<ImageBackground
								source={jumpBtnImage}
								style={styles.imgBackground}
							></ImageBackground>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	gameBackImage: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
		alignSelf: "center",
	},
	topBottomContainer: {
		position: "absolute",
		width: "100%",
		height: 90,
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	header: {
		top: 0,
	},
	footer: {
		bottom: 0,
	},
	footerBtnGroup: {
		height: "100%",
		flex: 1,
		flexDirection: "row",
	},
	topTextContainer: {
		color: "#ffffff",
		fontSize: 18,
		margin: 20,
	},
	actionBtnContainer: {
		width: 80,
		height: 80,
		margin: 5,
	},
	imgBackground: {
		height: "100%",
		width: undefined,
		aspectRatio: 1,
		resizeMode: "cover",
		alignSelf: "center",
		opacity: 0.6,
	},
});
