const styles = (theme) => ({
	root: {
		display: "flex",
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "100vh",
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
	chatPaper: {
		height: "85%",
		maxHeight: "85%",
		[theme.breakpoints.down("sm")]: {
			height: "77%",
			maxHeight: "77%",
		},
		overflow: "hidden",
	},
	toolbarClassName: {
		backgroundColor: "#37474f",
		background: "#37474f",
		border: "none",
		"& *": {
			backgroundColor: "#37474f",
			background: "#37474f",
			border: "none",
		},
		"& .rdw-link-modal-input": {
			border: "1px solid #f1f1f1",
			color: "white",
		},
	},
	wrapperClassName: {
		wordWrap: "normal",
		backgroundColor: "#37474f",
		background: "#37474f !important",
		border: "none !important",
		height: "270px",
		[theme.breakpoints.down("sm")]: {
			height: "240px",
		},
	},
	fixedHeight: {
		height: "600px",

		[theme.breakpoints.down("sm")]: {
			height: "400px",
		},
	},
	editorClassName: {
		wordWrap: "normal",
		backgroundColor: "#263238",
		background: "#263238 !important",
		border: "1px solid #37474f",
		height: "100%",

		overflow: "scroll",
		[theme.breakpoints.down("sm")]: {
			maxHeight: "100px",
		},
	},
	submit: {
		marginTop: "100px",
		[theme.breakpoints.down("sm")]: {
			marginTop: "15px",
		},
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
});

export default styles;
