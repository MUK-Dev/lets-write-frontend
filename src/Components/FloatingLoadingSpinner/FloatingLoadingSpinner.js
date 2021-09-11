import React from "react";
import { CircularProgress, Fab } from "@material-ui/core";

const FloatingLoadingSpinner = () => {
	const style = {
		margin: 0,
		top: "auto",
		right: 20,
		bottom: 20,
		left: "auto",
		position: "fixed",
		height: "200px",
		width: "200px",
		backgroundColor: "transparent",
	};
	return (
		<Fab disabled style={style}>
			<CircularProgress color="secondary" size="4.5rem" />
		</Fab>
	);
};

export default FloatingLoadingSpinner;
