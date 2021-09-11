import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { gsap } from "gsap";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "absolute",
		overflow: "hidden",
		lineHeight: 0,
		top: "auto",
		bottom: 0,
		left: 0,
		zIndex: -100,
		transform: "translateY(20%)",
	},
	bubbles: {
		overflow: "Hidden",
	},
	bubble: {
		transform: "translateY(100%)",
	},
}));

const BubbleBackground = () => {
	const classes = useStyles();

	const animation = () => {
		const tl = gsap.timeline({
			onComplete: () => animation(),
			defaults: { ease: "power3.inOut" },
			repeat: -1,
			yoyo: false,
		});
		const bubbles = document.querySelectorAll(".bubble");
		bubbles.forEach((bubble) => {
			tl.fromTo(
				bubble,
				{ opacity: "1", duration: 1.3 },
				{ y: "0", opacity: "0", duration: 1.3 }
			);
		});
	};

	useEffect(() => {
		animation();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<svg
				viewBox="0 0 500 1450"
				width="100%"
				version="1.1"
				className={classes.root}
			>
				<g fill="#F50057" className={["bubbles", classes.bubbles].join(" ")}>
					<circle
						className={["bubble", classes.bubble].join(" ")}
						r="26"
						cx="200"
						cy="0"
					></circle>
					<circle
						className={["bubble", classes.bubble].join(" ")}
						r="28"
						cx="369"
						cy="0"
					></circle>
					<circle
						className={["bubble", classes.bubble].join(" ")}
						r="30"
						cx="432"
						cy="0"
					></circle>
					<circle
						className={["bubble", classes.bubble].join(" ")}
						r="32"
						cx="482"
						cy="0"
					></circle>
					<circle
						className={["bubble", classes.bubble].join(" ")}
						r="29"
						cx="631"
						cy="0"
					></circle>
					<circle
						className={["bubble", classes.bubble].join(" ")}
						r="24"
						cx="774"
						cy="0"
					></circle>
					<circle
						className={["bubble", classes.bubble].join(" ")}
						r="38"
						cx="735"
						cy="0"
					></circle>
					<circle
						className={["bubble", classes.bubble].join(" ")}
						r="22"
						cx="343"
						cy="0"
					></circle>
					<circle
						className={["bubble", classes.bubble].join(" ")}
						r="39"
						cx="790"
						cy="0"
					></circle>
				</g>
			</svg>
		</div>
	);
};

export default BubbleBackground;
