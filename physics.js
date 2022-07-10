import Matter from "matter-js";
import { Dimensions } from "react-native";
import { getPipeSizePosPair } from "./utils/random";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const archerImageRight = require("./assets/img/Hero/Run/runArcher1.png");
const archerImageRight1 = require("./assets/img/Hero/Run/runArcher2.png");
const archerImageLeft = require("./assets/img/Hero/Run/runArcher3.png");
const archerImageLeft1 = require("./assets/img/Hero/Run/runArcher4.png");
const idleState = require("./assets/img/Hero/Idle/idleArcher1.png");
const idleState1 = require("./assets/img/Hero/Idle/idleArcher2.png");
const idleState2 = require("./assets/img/Hero/Idle/idleArcher3.png");
const idleState3 = require("./assets/img/Hero/Idle/idleArcher4.png");
const jumpUpImage = require("./assets/img/Hero/Jump/jumpUp.png");
const jumpFallImage = require("./assets/img/Hero/Jump/jumpFall.png");
const jumpUpLeftImage = require("./assets/img/Hero/Jump/jumpUpLeft.png");
const jumpFallLeftImage = require("./assets/img/Hero/Jump/jumpFallLeft.png");
const shootImgList = [
	require("./assets/img/Hero/Shoot/shoot_01.png"),
	require("./assets/img/Hero/Shoot/shoot_02.png"),
	require("./assets/img/Hero/Shoot/shoot_03.png"),
	require("./assets/img/Hero/Shoot/shoot_04.png"),
	require("./assets/img/Hero/Shoot/shoot_05.png"),
	require("./assets/img/Hero/Shoot/shoot_06.png"),
];
const shootImgLeftList = [
	require("./assets/img/Hero/Shoot/back/shoot_01.png"),
	require("./assets/img/Hero/Shoot/back/shoot_02.png"),
	require("./assets/img/Hero/Shoot/back/shoot_03.png"),
	require("./assets/img/Hero/Shoot/back/shoot_04.png"),
	require("./assets/img/Hero/Shoot/back/shoot_05.png"),
	require("./assets/img/Hero/Shoot/back/shoot_06.png"),
];

var isLeft = true;
var idleFlag = true;
var idleStateTrue = idleState;
var idleStateFalse = idleState1;
var moveState = true;
var archerMoveRight = archerImageRight;
var archerMoveLeft = archerImageLeft;

const Physics = (entities, { events, time, dispatch }) => {
	let engine = entities.physics.engine;

	if (events.length) {
		events.forEach((e) => {
			switch (e) {
				case "jump":
					Matter.Body.setVelocity(entities.Archer.body, {
						x: 0,
						y: -10,
					});
					return;
				case "left_move":
					Matter.Body.translate(entities.Archer.body, {
						x: -5,
						y: 0,
					});
					isLeft = true;
					entities.Archer.img = archerMoveLeft;
					idleStateTrue = idleState2;
					idleStateFalse = idleState3;
					return;
				case "right_move":
					Matter.Body.translate(entities.Archer.body, {
						x: 5,
						y: 0,
					});
					isLeft = false;
					entities.Archer.img = archerMoveRight;
					idleStateTrue = idleState;
					idleStateFalse = idleState1;
					return;
				case "move":
					moveState = !moveState;
					if (moveState) {
						archerMoveLeft = archerImageLeft;
						archerMoveRight = archerImageRight;
					} else {
						archerMoveLeft = archerImageLeft1;
						archerMoveRight = archerImageRight1;
					}
					return;
				case "idle_change":
					idleFlag = !idleFlag;
					if (idleFlag) {
						entities.Archer.img = idleStateTrue;
					} else {
						entities.Archer.img = idleStateFalse;
					}
					return;
				case "shoot":
					for (let i = 0; i < 6; i++) {
						setTimeout(() => {
							if (isLeft) {
								entities.Archer.img = shootImgLeftList[i];
							} else {
								entities.Archer.img = shootImgList[i];
							}
						}, 250);
					}
					return;
			}
		});
	}

	Matter.Engine.update(engine, time.delta);

	// for (let idx = 1; idx <= 2; idx++) {
	// 	if (
	// 		entities[`ObstacleTop${idx}`].body.bounds.max.x <= 60 &&
	// 		!entities[`ObstacleTop${idx}`].point
	// 	) {
	// 		entities[`ObstacleTop${idx}`].point = true;
	// 		dispatch({ type: "new_point" });
	// 	}
	// 	if (entities[`ObstacleTop${idx}`].body.bounds.max.x <= 0) {
	// 		const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);

	// 		Matter.Body.setPosition(
	// 			entities[`ObstacleTop${idx}`].body,
	// 			pipeSizePos.pipeTop.pos
	// 		);
	// 		Matter.Body.setPosition(
	// 			entities[`ObstacleBottom${idx}`].body,
	// 			pipeSizePos.pipeBottom.pos
	// 		);
	// 	}
	// 	Matter.Body.translate(entities[`ObstacleTop${idx}`].body, { x: -3, y: 0 });
	// 	Matter.Body.translate(entities[`ObstacleBottom${idx}`].body, {
	// 		x: -3,
	// 		y: 0,
	// 	});
	// }
	// Matter.Events.on(engine, "collisionStart", (ev) => {
	// 	dispatch({ type: "game_over" });
	// });
	if (entities.Archer.body.bounds.min.y > windowHeight) {
		dispatch({ type: "game_over" });
	}
	if (entities.Archer.body.velocity.y < -0.5) {
		if (isLeft) {
			entities.Archer.img = jumpUpLeftImage;
		} else {
			entities.Archer.img = jumpUpImage;
		}
	} else if (entities.Archer.body.velocity.y > 0.5) {
		if (isLeft) {
			entities.Archer.img = jumpFallLeftImage;
		} else {
			entities.Archer.img = jumpFallImage;
		}
	}
	return entities;
};

export default Physics;
