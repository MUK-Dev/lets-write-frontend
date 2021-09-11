const styles = (theme) => ({
	root: {
		backgroundColor: "#263238",
		color: "#757575",
		minHeight: "100vh",
		width: "100%",
		textAlign: "center",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	container: {
		margin: "auto",
		width: "70%",
	},
	link: {
		textDecoration: "none",
		"& *": {
			color: "#9e9e9e",
			fontSize: "1.2rem",
		},
	},
	button: {
		marginTop: "20px",
		padding: "10px",
		"&:hover": {
			backgroundColor: "#37474f",
			boxShadow: "1px 1px 20px rgba(0,0,0,0.2)",
			"& *": {
				color: "white",
			},
		},
	},
});

export default styles;
