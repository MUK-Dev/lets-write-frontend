import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Navbar from "../../../Components/Navbar/Navbar";

const styles = (theme) => ({
	root: {
		backgroundColor: "#263238",
	},
});

class Layout extends Component {
	componentDidMount() {
		window.history.pushState(null, document.title, window.location.href);
		window.addEventListener("popstate", function (event) {
			window.history.pushState(null, document.title, window.location.href);
		});
	}
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Navbar />
				<main>{this.props.children}</main>
			</div>
		);
	}
}

export default withStyles(styles)(Layout);
