import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles((theme) => ({
	"@global": {
		"*::-webkit-scrollbar": {
			width: "0.4em",
		},
		"*::-webkit-scrollbar-track": {
			"-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
		},
		"*::-webkit-scrollbar-thumb": {
			backgroundColor: "#263238",
			outline: "none",
		},
	},
	chatbox: {
		width: "100%",
		height: "520px",

		[theme.breakpoints.down("sm")]: {
			height: "320px",
		},
		"& *": {
			color: "white",
		},
		overflowY: "auto",
		overflowX: "hidden",
	},
	list: {
		// overflow: "scroll",
	},
	chatMessage: {
		backgroundColor: "#263238",
		borderRadius: "25px",
		margin: "5px",
		width: "95%",
	},
	small: {
		width: theme.spacing(4),
		height: theme.spacing(4),
	},
	textfield: {
		width: "85%",
		color: "white",
		[theme.breakpoints.down("md")]: {
			width: "80%",
		},
		[theme.breakpoints.down("sm")]: {
			width: "85%",
		},
	},
}));

export default styles;
