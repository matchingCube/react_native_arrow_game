import React from "react";
import Matter from "matter-js";
import { View, ImageBackground } from "react-native";

const Archer = (props) => {
	//console.log(props.body.bounds.max.x - props.body.bounds.min.x);
	// const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
	const widthBody = props.size.width;
	// const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;
	const heightBody = props.size.height;
	const xBody = props.body.position.x - widthBody / 2;
	const yBody = props.body.position.y - heightBody / 2;
	const color = props.color;
	const img = props.img;
	return (
		<View
			style={{
				// borderWidth: 1,
				// borderColor: color,
				// borderStyle: "solid",
				position: "absolute",
				left: xBody,
				top: yBody,
				width: widthBody,
				height: heightBody,
			}}
		>
			<ImageBackground
				source={img}
				style={{
					height: undefined,
					width: "100%",
					aspectRatio: 0.7,
					resizeMode: "cover",
					alignSelf: "center",
				}}
			/>
		</View>
	);
};

export default (world, color, img, pos, size) => {
	const initialArcher = Matter.Bodies.rectangle(
		pos.x,
		pos.y,
		size.width,
		size.height,
		{ label: "Archer" }
	);
	Matter.World.add(world, initialArcher);

	return {
		body: initialArcher,
		color,
		img: img,
		size: size,
		renderer: <Archer />,
	};
};
