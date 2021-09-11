import React from "react";
import Button from "@material-ui/core/Button";
import GithubIcon from "@material-ui/icons/GitHub";

const GithubOAuth = (props) => {
	const { submitHandler, classes } = props;
	return (
		<form onSubmit={submitHandler} className={classes.githubButton}>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="default"
				className={classes.submit}
				startIcon={<GithubIcon />}
			>
				Signup with Github
			</Button>
		</form>
	);
};

export default GithubOAuth;
