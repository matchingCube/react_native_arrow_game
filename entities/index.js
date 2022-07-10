import Matter from "matter-js";
import Archer from "../components/Archer";
import Floor from "../components/Floor";
import Obstacle from "../components/Obstacle";
import { Dimensions } from "react-native";
import { getPipeSizePosPair } from "../utils/random";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const archerImageRight = require("../assets/img/Hero/Idle/idleArcher1.png");

export default (restart) => {
	let engine = Matter.Engine.create({
		enableSleeping: false,
	});
	let world = engine.world;
	engine.gravity.y = 0.7;

	// const pipeSizePosA = getPipeSizePosPair();
	// const pipeSizePosB = getPipeSizePosPair(windowWidth * 0.9);

	return {
		physics: { engine, world },
		Archer: Archer(
			world,
			"red",
			archerImageRight,
			{ x: 50, y: 400 },
			{ height: 53, width: 38 }
		),
		// ObstacleTop1: Obstacle(
		// 	world,
		// 	"ObstacleTop1",
		// 	"blue",
		// 	pipeSizePosA.pipeTop.pos,
		// 	pipeSizePosA.pipeTop.size
		// ),
		// ObstacleBottom1: Obstacle(
		// 	world,
		// 	"ObstacleBottom1",
		// 	"blue",
		// 	pipeSizePosA.pipeBottom.pos,
		// 	pipeSizePosA.pipeBottom.size
		// ),
		// ObstacleTop2: Obstacle(
		// 	world,
		// 	"ObstacleTop2",
		// 	"blue",
		// 	pipeSizePosB.pipeTop.pos,
		// 	pipeSizePosB.pipeTop.size
		// ),
		// ObstacleBottom2: Obstacle(
		// 	world,
		// 	"ObstacleBottom2",
		// 	"blue",
		// 	pipeSizePosB.pipeBottom.pos,
		// 	pipeSizePosB.pipeBottom.size
		// ),
		Floor1: Floor(
			world,
			"green",
			{ x: 214, y: windowHeight },
			{ height: 40, width: 440 }
		),
		Floor2: Floor(
			world,
			"green",
			{ x: windowWidth - 146, y: windowHeight },
			{ height: 40, width: 310 }
		),
		WallLeft: Floor(
			world,
			"green",
			{ x: 0, y: windowHeight / 2 },
			{ height: windowHeight, width: 30 }
		),
		WallRight: Floor(
			world,
			"green",
			{ x: windowWidth, y: windowHeight / 2 },
			{ height: windowHeight, width: 30 }
		),
		Ceil: Floor(
			world,
			"green",
			{ x: windowWidth / 2, y: 0 },
			{ height: 30, width: windowWidth }
		),
		FloatingLand1: Floor(
			world,
			"green",
			{ x: 173, y: 158 },
			{ height: 10, width: 224 }
		),
		FloatingLand2: Floor(
			world,
			"green",
			{ x: 417, y: 160 },
			{ height: 10, width: 144 }
		),
		FloatingLand3: Floor(
			world,
			"green",
			{ x: 698, y: 160 },
			{ height: 10, width: 280 }
		),
		FloatingLand4: Floor(
			world,
			"green",
			{ x: 274, y: 262 },
			{ height: 10, width: 226 }
		),
		FloatingLand5: Floor(
			world,
			"green",
			{ x: 610, y: 262 },
			{ height: 10, width: 276 }
		),
		FloatingLand6: Floor(
			world,
			"green",
			{ x: 182, y: 359 },
			{ height: 10, width: 212 }
		),
		FloatingLand7: Floor(
			world,
			"green",
			{ x: 471, y: 359 },
			{ height: 10, width: 142 }
		),
		FloatingLand8: Floor(
			world,
			"green",
			{ x: 712, y: 358 },
			{ height: 10, width: 144 }
		),
	};
};
