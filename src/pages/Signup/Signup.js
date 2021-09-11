import React, { Component } from "react";

import { Typography, Fade, Grid, Paper, CssBaseline } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import * as actionTypes from "../../reducers/actions";

import SignupForm from "../../Components/SignupForm/SignupForm";
import GithubOAuth from "../../Components/GithubOAuth/GithubOAuth";
import app from "../../feathers-client";
import serverIP from "../../serverIP";
import FloatingLoadingSpinner from "../../Components/FloatingLoadingSpinner/FloatingLoadingSpinner";
import AnimatedSignBoard from "../../Components/AnimatedSignBoard/AnimatedSignBoard";
import styles from "../../Styles/Signup-Styles";

class Signup extends Component {
	state = {
		redirect: false,
		email: "",
		password: "",
		name: "",
		registerPage: false,
		errorMessage: "",
		showSpinner: false,
	};

	loginSubmitHandler = (event) => {
		event.preventDefault();
		if (this.state.email !== "" && this.state.password !== "") {
			this.setState({ showSpinner: true });
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
					this.setState({ redirect: true, showSpinner: false });
				})
				.catch((err) => {
					console.log(err);
					this.setState({ errorMessage: err.message, showSpinner: false });
				});
		}
	};

	registerSubmitHandler = async (event) => {
		event.preventDefault();
		if (
			this.state.email !== "" &&
			this.state.password !== "" &&
			this.state.name !== ""
		) {
			this.setState({ showSpinner: true });
			const credentials = {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
			};
			try {
				await app.service("users").create(credentials);
			} catch (err) {
				this.setState({ errorMessage: err.message, showSpinner: false });
				return;
			}
			app
				.authenticate({
					strategy: "local",
					...credentials,
				})
				.then((res) => {
					this.props.getUser(res.user, res.accessToken);
					this.setState({ redirect: true, showSpinner: false });
				})
				.catch((err) => {
					console.log(err);
					this.setState({
						errorMessage: err.message,
						showSpinner: false,
					});
				});
		}
	};

	receiveMessage(event) {
		if (event.origin === `${serverIP}3030`) {
			console.log("[should login here]");
			app
				.authenticate({
					strategy: "jwt",
					accessToken: event.data.token,
				})
				.then((res) => {
					this.props.getUser(res.user, res.accessToken);
					this.setState({ redirect: true, showSpinner: false });
				})
				.catch((err) => {
					this.setState({ errorMessage: err.message, showSpinner: false });
				});
		}
	}

	githubSubmitHandler = (event) => {
		event.preventDefault();
		this.setState({ showSpinner: true });
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
		const {
			email,
			errorMessage,
			name,
			password,
			redirect,
			registerPage,
			showSpinner,
		} = this.state;

		if (redirect) {
			return <Redirect to="/main" />;
		}

		const image = (
			<Fade in timeout={1500}>
				<Grid item xs={false} sm={4} md={7} className={classes.image} />
			</Fade>
		);
		const form = (
			<Fade in timeout={700}>
				<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
					<SignupForm
						classes={classes}
						loginSubmitHandler={this.loginSubmitHandler}
						registerSubmitHandler={this.registerSubmitHandler}
						emailVal={email}
						passVal={password}
						nameVal={name}
						emailChanger={(event) => this.emailValueHandler(event)}
						nameChanger={(event) => this.nameValueHandler(event)}
						passwordChanger={(event) => this.passwordValueHandler(event)}
						pageType={registerPage}
						changePage={this.switchPage}
					/>
					<Typography component="h2" className={classes.errorMessage}>
						{errorMessage !== "" ? errorMessage : null}
					</Typography>
					<GithubOAuth
						classes={classes}
						submitHandler={this.githubSubmitHandler}
					/>
					<AnimatedSignBoard />
				</Grid>
			</Fade>
		);
		const spinner = showSpinner ? <FloatingLoadingSpinner /> : null;

		return (
			<div>
				<Grid container component="main" className={classes.root}>
					<CssBaseline />

					{image}

					{form}
				</Grid>

				{spinner}
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
