const styles = (theme) => ({
	"@global": {
		"*::-webkit-scrollbar": {
			width: "0.4em",
		},
		"*::-webkit-scrollbar-track": {
			"-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
		},
		"*::-webkit-scrollbar-thumb": {
			backgroundColor: "#37474f",
			outline: "none",
		},
	},
	root: {
		backgroundColor: "#263238",
		color: "white",
		minHeight: "100vh",
		maxHeight: "100vh",
		width: "100%",
		padding: "0 10px 0 0",
	},
	columnSearch: {
		textAlign: "center",
		minHeight: "10vh",
	},
	column: {
		textAlign: "center",
		minHeight: "10vh",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, "auto", 0, "auto"),
		maxWidth: "150px",
		display: "flex",
		color: "white",
		backgroundColor: "#263238",
		"&:hover": {
			backgroundColor: "#1f292e",
		},
		"&:active": {
			backgroundColor: "#1f292e",
		},
	},
	changer: {
		color: "white",
		backgroundColor: "#37474f",
		margin: "5px",
		padding: "0 10px",
	},
	avatar: {
		maxHeight: "40px",
		maxWidth: "40px",
		borderRadius: "50%",
		display: "flex",
		margin: "auto",
	},
	username: {
		marginTop: "40px",
		textAlign: "center",
	},
	navigation: {
		padding: "30px 10px",
		top: "0",
		left: "0",
		backgroundColor: "#37474f",
		minHeight: "100vh",
		overflow: "hidden",
		width: "200px",
		position: "sticky",
		display: "inline-block",
		verticalAlign: "top",
	},
	rooms: {
		maxHeight: "125px",
		overflowY: "scroll",
		[theme.breakpoints.up("md")]: {
			marginTop: "10px",
			maxHeight: "250px",
		},
	},
	searchedRooms: {
		maxHeight: "125px",
		overflowY: "scroll",
		[theme.breakpoints.up("md")]: {
			marginTop: "10px",
			maxHeight: "250px",
		},
	},
	scrollableCol: {
		display: "inline-block",
		verticalAlign: "bottom",
	},
});

export default styles;
