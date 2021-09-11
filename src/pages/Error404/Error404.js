import React, { Component } from "react";
import { Grid, Typography, Button, Grow } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

import AnimatedStickman from "../../Components/AnimatedStickman/AnimatedStickman";
import styles from "../../Styles/Error404-Styles";

class Error404 extends Component {
	render() {
		const { classes } = this.props;

		const stickman = (
			<Grid item sm={6} xs={12}>
				<AnimatedStickman />
			</Grid>
		);

		const pageInfo = (
			<Grow in timeout={1200}>
				<Typography variant="subtitle1" color="initial">
					*This page is made just to showcase that 404 error are handled on this
					application although this is not necessary on this application as user
					is redirected to MAIN page if he goes to undefined route*
				</Typography>
			</Grow>
		);

		const errorBody = (
			<Grid item sm={6} xs={12}>
				<Grow in timeout={1000}>
					<Typography variant="h3" color="error">
						404
					</Typography>
				</Grow>
				<Grow in timeout={1100}>
					<Typography variant="h6" color="error">
						(Bad Request)
					</Typography>
				</Grow>
				<Grow in timeout={1200}>
					<Typography variant="h4" color="error">
						Page Not Found
					</Typography>
				</Grow>
				<Grow in timeout={1000}>
					<RouterLink to="/" className={classes.link}>
						<Button className={classes.button}>Go To Sign up page? ▶️</Button>
					</RouterLink>
				</Grow>
				{pageInfo}
			</Grid>
		);
		return (
			<div className={classes.root}>
				<Grid
					container
					justifyContent="center"
					alignItems="center"
					className={classes.container}
				>
					{stickman}
					{errorBody}
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(Error404);
