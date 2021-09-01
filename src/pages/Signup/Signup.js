import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import * as actionTypes from "../../reducers/actions";

import SignupForm from "../../Components/SignupForm/SignupForm";
import SideImage from "../../assets/sampleimg3.jpg";
import GithubOAuth from "../../Components/GithubOAuth/GithubOAuth";
import app from "../../feathers-client";
import serverIP from "../../serverIP";

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
});

class Signup extends Component {
	state = {
		redirect: false,
		email: "",
		password: "",
		name: "",
		registerPage: false,
		errorMessage: "",
	};

	loginSubmitHandler = (event) => {
		event.preventDefault();
		//!Signup user from here from feathers api
		if (this.state.email !== "" && this.state.password !== "") {
			const credentials = {
				email: this.state.email,
				password: this.state.password,
			};
			app
				.authenticate({
					strategy: "local",
					...credentials,
				})
				.then((res) => {
					this.props.getUser(res.user, res.accessToken);
					this.setState({ redirect: true });
				})
				.catch((err) => {
					this.setState({ errorMessage: "Couldn't Login" });
				});
		}
	};

	registerSubmitHandler = async (event) => {
		event.preventDefault();
		//!Signup user from here from feathers api
		if (
			this.state.email !== "" &&
			this.state.password !== "" &&
			this.state.name !== ""
		) {
			const credentials = {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
			};
			await app.service("users").create(credentials);
			app
				.authenticate({
					strategy: "local",
					...credentials,
				})
				.then((res) => {
					this.props.getUser(res.user, res.accessToken);
					this.setState({ redirect: true });
				})
				.catch((err) => {
					this.setState({ errorMessage: "Couldn't Register" });
				});
		}
	};

	receiveMessage(event) {
		if (event.origin === `${serverIP}3030`) {
			app
				.authenticate({
					strategy: "jwt",
					accessToken: event.data.token,
				})
				.then((res) => {
					this.props.getUser(res.user, res.accessToken);
					this.setState({ redirect: true });
				})
				.catch((err) => {
					this.setState({ errorMessage: "Couldn't Login" });
				});
		}
	}

	githubSubmitHandler = async (event) => {
		event.preventDefault();
		//!Signup user from here from feathers api

		window.onmessage = this.receiveMessage.bind(this);
		window.open(
			`${serverIP}3030/oauth/github`,
			"Login with Github",
			"height=640,width=960,toolbar=no,menubar=no,scrollbars=no,location=no,status=no"
		);
	};

	emailValueHandler = (event) => {
		this.setState({ email: event.target.value });
	};
	passwordValueHandler = (event) => {
		this.setState({ password: event.target.value });
	};
	nameValueHandler = (event) => {
		this.setState({ name: event.target.value });
	};
	switchPage = () => {
		this.setState({ registerPage: !this.state.registerPage });
	};

	render() {
		const { classes } = this.props;

		if (this.state.redirect) {
			return <Redirect to="/main" />;
		}
		return (
			<div>
				<Grid container component="main" className={classes.root}>
					<CssBaseline />
					<Grid item xs={false} sm={4} md={7} className={classes.image} />
					<Grid
						item
						xs={12}
						sm={8}
						md={5}
						component={Paper}
						elevation={6}
						square
					>
						<SignupForm
							classes={classes}
							loginSubmitHandler={this.loginSubmitHandler}
							registerSubmitHandler={this.registerSubmitHandler}
							emailVal={this.state.email}
							passVal={this.state.password}
							nameVal={this.state.name}
							emailChanger={(event) => this.emailValueHandler(event)}
							nameChanger={(event) => this.nameValueHandler(event)}
							passwordChanger={(event) => this.passwordValueHandler(event)}
							pageType={this.state.registerPage}
							changePage={this.switchPage}
						/>
						<h3 style={{ textAlign: "center" }}>
							{this.state.errorMessage !== "" ? this.state.errorMessage : null}
						</h3>
						<GithubOAuth
							classes={classes}
							submitHandler={this.githubSubmitHandler}
						/>
					</Grid>
				</Grid>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		getUser: (user, token) =>
			dispatch({ type: actionTypes.GET_USER, user: user, token: token }),
	};
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Signup));
