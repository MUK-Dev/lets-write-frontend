import React, { Component } from "react";
import Navbar from "../../../Components/Navbar/Navbar";

export default class Layout extends Component {
	componentDidMount() {
		window.history.pushState(null, document.title, window.location.href);
		window.addEventListener("popstate", function (event) {
			window.history.pushState(null, document.title, window.location.href);
		});
	}
	render() {
		return (
			<div>
				<Navbar />
				<main>{this.props.children}</main>
			</div>
		);
	}
}
