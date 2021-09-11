import SideImage from "../assets/sampleimg3.jpg";

const styles = (theme) => ({
	root: {
		height: "100vh",
	},
	image: {
		backgroundImage: `url(${SideImage})`,
		backgroundRepeat: "no-repeat",
		backgroundColor:
			theme.palette.type === "light"
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: "cover",
		backgroundPosition: "center",
	},
	paper: {
		margin: theme.spacing(5, 4, 0, 4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		transition: "height 1s linear",
	},
	githubButton: {
		margin: theme.spacing(2, 4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.default,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 0, 0),
	},
	errorMessage: {
		textAlign: "center",
		fontWeight: "700",
		marginTop: "20px",
	},
});

export default styles;
