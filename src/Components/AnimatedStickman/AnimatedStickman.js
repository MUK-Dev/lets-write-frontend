import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	stickman: {
		height: "400px",
		width: "100%",
		"-webkit-filter": "drop-shadow(1px 1px 20px rgba(0,0,0,0.5))",
		filter: "drop-shadow(1px 1px 20px rgba(0,0,0,0.5))",
	},
	rightArm: {
		// animationDirection: "alternate",
		animation: `$moveArm 5s ${theme.transitions.easing.easeInOut} infinite`,
	},
	leftArm: {
		// animationDirection: "alternate",
		animation: `$moveArm 5s ${theme.transitions.easing.easeInOut} infinite`,
	},
	face: {
		transformOrigin: "center",
		// animationDirection: "alternate",
		animation: `$tiltFace 5s ${theme.transitions.easing.easeInOut} infinite`,
	},
	"@keyframes moveArm": {
		"0%": {
			transform: "translateY(0)",
		},
		"24%": {
			transform: "translateY(-3%)",
		},
		"50%": {
			transform: "translateY(0)",
		},
		"100%": {
			transform: "translateY(0)",
		},
	},
	"@keyframes tiltFace": {
		"0%": {
			transform: "rotateZ(0)",
		},
		"24%": {
			transform: "rotateZ(3deg)",
		},
		"50%": {
			transform: "rotateZ(0)",
		},
		"100%": {
			transform: "rotateZ(0)",
		},
	},
}));

const AnimatedStickman = () => {
	const classes = useStyles();

	return (
		<div>
			<svg
				id="stickman"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 154.59 208.27"
				className={classes.stickman}
			>
				<title>not found</title>
				<rect
					fill="#505056"
					x="102.56"
					y="164.46"
					width="7.09"
					height="40"
					transform="translate(-61.73 46.73) rotate(-20.86)"
				/>
				<rect
					fill="#505056"
					x="50.24"
					y="164.46"
					width="7.09"
					height="40"
					transform="translate(35.35 372.83) rotate(-159.14)"
				/>
				<ellipse fill="#282828" cx="35.65" cy="202.27" rx="11.65" ry="6" />
				<ellipse fill="#282828" cx="118.34" cy="202.27" rx="11.65" ry="6" />
				<rect
					fill="#5b56bf"
					x="54.72"
					y="64.18"
					width="44.71"
					height="100.06"
					rx="2.75"
				/>
				<g id="right-arm" className={classes.rightArm}>
					<rect
						fill="#5b56bf"
						x="135.61"
						y="62.97"
						width="5.56"
						height="29.41"
						transform="translate(3.2 -13.27) rotate(4.29)"
					/>
					<ellipse fill="#6d6dbc" cx="143.74" cy="58.33" rx="10.85" ry="3.37" />
					<polygon
						fill="#5b56bf"
						points="137.24 89.66 99.04 92.37 98.51 85.26 136.71 82.54 137.24 89.66"
					/>
				</g>
				<g id="left-arm" className={classes.leftArm}>
					<rect
						fill="#5b56bf"
						x="18.41"
						y="64.44"
						width="5.56"
						height="29.24"
						transform="matrix(-1, 0.07, -0.07, -1, 45.22, 153.17)"
					/>
					<rect
						fill="#5b56bf"
						x="19.9"
						y="87.61"
						width="38.29"
						height="7.44"
						transform="translate(68.19 182.16) rotate(-175.73)"
					/>
					<ellipse fill="#6d6dbc" cx="10.85" cy="59.1" rx="10.85" ry="3.35" />
				</g>
				<g id="face" className={classes.face}>
					<ellipse
						fill="#6d6dbc"
						cx="80"
						cy="35.19"
						rx="32.06"
						ry="28.76"
						transform="translate(36.91 109.7) rotate(-86.44)"
					/>
					<path
						fill="#f9f9f9"
						d="M74.92,20.15c-.66.89-2,1.42-4.36,1.44-2.07,0-3.77-1.28-4.06-2.28s1.59-1.9,4.31-1.77C73,17.65,75.42,19.48,74.92,20.15Z"
						transform="translate(-2.99 -3.15)"
					/>
					<ellipse
						fill="#4c3106"
						cx="70.73"
						cy="19.58"
						rx="1.06"
						ry="1.19"
						transform="translate(43.8 85.8) rotate(-86.44)"
					/>
					<path
						fill="#f9f9f9"
						d="M88,21.07c.55,1,1.86,1.66,4.15,2,2.05.28,3.91-.81,4.31-1.77S95.08,19.2,92.35,19C90.17,18.83,87.54,20.35,88,21.07Z"
						transform="translate(-2.99 -3.15)"
					/>
					<ellipse
						fill="#4c3106"
						cx="92.18"
						cy="21.07"
						rx="1.06"
						ry="1.19"
						transform="translate(62.43 108.62) rotate(-86.44)"
					/>
					<path
						fill="#1e1e1e"
						d="M96.81,20a4.47,4.47,0,0,0-1.08-.77c-.79-.51-.7-.53-1.2-.81a9,9,0,0,0-1.25-.57,5.82,5.82,0,0,0-1-.31c-.35-.07-.87-.18-1,0s.24.36.39.49a2.19,2.19,0,0,0,.89.43s.35.11.77.28.47.22,1,.43a5.28,5.28,0,0,1,.86.34,5.39,5.39,0,0,1,.66.48c.23.18.31.2.65.46l.36.27c.27.21.33.29.36.27A1.57,1.57,0,0,0,96.81,20Z"
						transform="translate(-2.99 -3.15)"
					/>
					<path
						fill="#1e1e1e"
						d="M66.17,18.07a4.1,4.1,0,0,1,1.16-.63c.84-.41.76-.44,1.29-.66a9.65,9.65,0,0,1,1.31-.41,5.87,5.87,0,0,1,1-.18c.36,0,.89-.07,1,.1s-.27.33-.43.44a2.3,2.3,0,0,1-.95.31s-.36.07-.8.18-.48.16-1,.31a4.83,4.83,0,0,0-.89.23,5.29,5.29,0,0,0-.72.4c-.25.15-.34.16-.7.37-.16.1-.19.1-.39.23s-.36.24-.39.22S65.76,18.44,66.17,18.07Z"
						transform="translate(-2.99 -3.15)"
					/>
					<path
						fill="#020202"
						d="M73,48.37c0-.07-.14-.14.73-.47l.1,0a11.56,11.56,0,0,1,1.73-.51,9,9,0,0,1,3.18.06,10,10,0,0,1,2,.59,9.86,9.86,0,0,1,2.12,1.06,10.73,10.73,0,0,1,1.33,1.07c.6.55,1.2,1.27,1.09,1.39s-.85-.34-1.59-.89-.76-.65-1.33-1a11,11,0,0,0-1.93-.91c-.9-.37-1.35-.7-1.75-.64S77,48,75.68,48c-.74,0-.85.36-1.68.49S73,48.49,73,48.37Z"
						transform="translate(-2.99 -3.15)"
					/>
				</g>
				<path
					fill="#fcfcfc"
					d="M84.77,84.26H75.31c-.7,0-1.3-.31-1.41-.74l-4-16.2H90.26L86.09,83.57C86,84,85.43,84.26,84.77,84.26Z"
					transform="translate(-2.99 -3.15)"
				/>
				<circle fill="#070707" cx="77" cy="83.16" r="0.81" />
				<circle fill="#fdfdff" cx="77" cy="83.16" r="0.22" />
				<circle fill="#070707" cx="77" cy="86.19" r="0.81" />
				<circle fill="#fdfdff" cx="77" cy="86.19" r="0.22" />
				<circle fill="#070707" cx="77" cy="88.98" r="0.81" />
				<circle fill="#fdfdff" cx="77" cy="88.98" r="0.22" />
				<circle fill="#070707" cx="77" cy="91.78" r="0.81" />
				<circle fill="#fdfdff" cx="77" cy="91.78" r="0.22" />
				<circle fill="#070707" cx="77" cy="94.57" r="0.81" />
				<circle fill="#fdfdff" cx="77" cy="94.57" r="0.22" />
				<path
					d="M81.2,69.42H78.81a.3.3,0,0,1-.29-.21l-.6-2h4.25l-.69,2A.29.29,0,0,1,81.2,69.42Z"
					transform="translate(-2.99 -3.15)"
				/>
				<polygon points="78.37 81.12 75.73 81.12 75.87 66.22 78.22 66.22 78.37 81.12" />
			</svg>
		</div>
	);
};

export default AnimatedStickman;
