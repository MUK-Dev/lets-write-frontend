import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: "50px",
		// position: "block",
		overflow: "hidden",
		zIndex: -10,
		height: "350px",
		width: "100%",
		// display: "flex",
		// margin: "auto",
		[theme.breakpoints.down("sm")]: {
			marginTop: "10px",
			height: "250px",
		},
		"-webkit-filter": "drop-shadow(1px 1px 15px rgba(145,133,118,0.8))",
		filter: "drop-shadow(1px 1px 15px rgba(145,133,118,0.8))",
	},
	ground: {
		fill: "#e8dccd",
	},
	sign: {
		transformOrigin: "center",
		// animationDirection: "alternate",
		animation: `$rotate 7s ${theme.transitions.easing.easeInOut} infinite`,
	},
	wind: {
		zIndex: -100,
		transformOrigin: "center",
		// animationDirection: "alternate",
		transform: "translateX(-100%)",
		animation: `$blow-wind 7s ${theme.transitions.easing.sharp} infinite`,
	},

	"@keyframes rotate": {
		"0%": {
			transform: "rotateY(0deg)",
		},
		"90%": {
			transform: "rotateY(359deg)",
		},
		"100%": {
			transform: "rotateY(359deg)",
		},
	},
	"@keyframes blow-wind": {
		"0%": {
			transform: "translateX(-100%)",
		},
		"42%": {
			transform: "translateX(92%)",
		},
		"50%": {
			opacity: "0",
			transform: "translateX(100%)",
		},
		"100%": {
			opacity: "0",
			transform: "translateX(100%)",
		},
	},
}));

const AnimatedSignBoard = () => {
	const classes = useStyles();
	return (
		<div>
			<svg id="Sign_Board" viewBox="0 0 208.81 224.61" className={classes.root}>
				<path
					id="Ground"
					className={classes.ground}
					d="M216.71,208.24c-3.29,18.42-63.5,24.58-102.64,20-46.73-5.5-109,9-105.95-8.87,3.29-19.08,57.34-24.07,103.93-17.47C153.83,207.8,219.9,190.35,216.71,208.24Z"
					transform="translate(-8.01 -5.07)"
				/>
				<g className={classes.sign}>
					<path
						id="Board2"
						fill="#d3c242"
						d="M110.46,50.21h-54L46.13,39.84h0L56.68,29.29h53.78Z"
						transform="translate(-8.01 -5.07)"
					/>
					<path
						id="Board1"
						className="cls-2"
						fill="#d3c242"
						d="M171.47,36.18h-53.8V15.26H171.6L182,25.65h0Z"
						transform="translate(-8.01 -5.07)"
					/>
					<path
						id="Bar"
						className="cls-3"
						fill="#754c24"
						d="M105.68,0h.72a3.26,3.26,0,0,1,3.26,3.26V207.35a.24.24,0,0,1-.24.24h-6.74a.24.24,0,0,1-.24-.24V3.23A3.23,3.23,0,0,1,105.68,0Z"
					/>
				</g>
				<g id="wind" className={classes.wind}>
					<path
						id="wind6"
						d="M47.15,55.79c-10.51,1.3-21.69.44-32.56,1.89"
						transform="translate(-7.94 -5.07)"
					/>
					<path
						id="wind5"
						d="M44.51,70.18C34,71.48,22.82,70.62,12,72.07"
						transform="translate(-7.94 -5.07)"
					/>
					<path
						id="wind4"
						d="M40.57,32.29c-10.51,1.29-21.7.43-32.56,1.89"
						transform="translate(-7.94 -5.07)"
					/>
					<path
						id="wind3"
						d="M47.15,102.17c-10.51,1.3-21.69.44-32.56,1.89"
						transform="translate(-7.94 -5.07)"
					/>
					<path
						id="wind2"
						d="M51.69,86.65c-10.5,1.29-21.69.43-32.56,1.89"
						transform="translate(-7.94 -5.07)"
					/>
					<path
						id="wind1"
						d="M47.15,10.61c-10.51,1.3-21.69.44-32.56,1.89"
						transform="translate(-7.94 -5.07)"
					/>
					<path
						id="wind7"
						d="M47.15,55.79c-10.51,1.3-21.69.44-32.56,1.89"
						transform="translate(0 -2.07)"
					/>
					<path
						id="wind8"
						d="M44.51,70.18C34,71.48,22.82,70.62,12,72.07"
						transform="translate(0 -2.07)"
					/>
					<path
						id="wind9"
						d="M40.57,32.29c-10.51,1.29-21.7.43-32.56,1.89"
						transform="translate(0 -2.07)"
					/>
					<path
						id="wind10"
						d="M47.15,102.17c-10.51,1.3-21.69.44-32.56,1.89"
						transform="translate(0 -2.07)"
					/>
					<path
						id="wind11"
						d="M51.69,86.65c-10.5,1.29-21.69.43-32.56,1.89"
						transform="translate(0 -2.07)"
					/>
					<path
						id="wind12"
						d="M47.15,10.61c-10.51,1.3-21.69.44-32.56,1.89"
						transform="translate(0 -2.07)"
					/>
				</g>
			</svg>
		</div>
	);
};

export default AnimatedSignBoard;
