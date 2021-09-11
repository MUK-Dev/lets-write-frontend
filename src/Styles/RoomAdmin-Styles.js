const styles = (theme) => ({
	root: {
		display: "flex",
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		minHeight: "100vh",
		overflow: "auto",
		color: "white",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#37474f",
		color: "lightGrey",
		overflow: "auto",
	},
	fixedHeightOne: {
		height: "300px",
		maxHeight: "300px",
	},
	fixedHeightTwo: {
		height: "600px",

		[theme.breakpoints.down("sm")]: {
			height: "400px",
		},
	},
	submit: {
		marginTop: "15px",
		color: "white",
		backgroundColor: "#263238",
		"&:hover": {
			backgroundColor: "#1f292e",
		},
		"&:active": {
			backgroundColor: "#1f292e",
		},
	},
	list: {
		width: "100%",
	},
	chatPaper: {
		overflow: "hidden",
	},
	questionBox: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	answer: {
		backgroundColor: "#263238",
		borderRadius: "25px",
		margin: "5px",
		width: "95%",
		"& *": {
			color: "white",
		},
	},
});

export default styles;
