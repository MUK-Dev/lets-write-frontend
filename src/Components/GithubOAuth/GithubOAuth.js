import Button from "@material-ui/core/Button";
import GithubIcon from "@material-ui/icons/GitHub";
import React from "react";

const GithubOAuth = (props) => {
	return (
		<form onSubmit={props.submitHandler} className={props.classes.githubButton}>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="default"
				className={props.classes.submit}
				startIcon={<GithubIcon />}
			>
				Signup with Github
			</Button>
		</form>
	);
};

export default GithubOAuth;
