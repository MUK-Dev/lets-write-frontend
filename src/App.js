import React, { Component } from "react";
import app from "./feathers-client";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "./reducers/actions";

class App extends Component {
	state = {
		redirect: false,
		error: false,
	};

	componentDidMount() {
		if (
			this.props.location.pathname !== "/" &&
			this.props.location.pathname !== "/main"
		) {
			return this.setState({ error: true });
		}
		app
			.authenticate()
			.then((res) => {
				app
					.reAuthenticate()
					.then((res) => {
						this.props.getUser(res.user, res.accessToken);
						this.setState({ redirect: true });
					})
					.catch((err) => {
						if (err.message === "No accessToken found in storage") {
							return;
						}
					});
			})
			.catch((err) => {});
	}

	render() {
		return (
			<div>
				{this.state.error ? <Redirect to="/error" /> : null}
				{this.state.redirect ? <Redirect to="/main" /> : <Redirect to="/" />}
				<main>{this.props.children}</main>
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

export default connect(null, mapDispatchToProps)(App);
