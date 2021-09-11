import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Navbar from "../../../Components/Navbar/Navbar";
import styles from "../../../Styles/Layout-Styles";

class Layout extends Component {
	componentDidMount() {
		window.history.pushState(null, document.title, window.location.href);
		window.addEventListener("popstate", function (event) {
			window.history.pushState(null, document.title, window.location.href);
		});
	}
	render() {
		const { classes, children } = this.props;
		return (
			<div className={classes.root}>
				<Navbar />
				<main>{children}</main>
			</div>
		);
	}
}

export default withStyles(styles)(Layout);
