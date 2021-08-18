import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = (theme) => ({
	root: {
		display: "flex",
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "100vh",
		overflow: "auto",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
	fixedHeight: {
		height: 240,
	},
});

class RoomAdmin extends Component {
	render() {
		const { classes } = this.props;
		const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
		return (
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={8} lg={9}>
							<Paper className={fixedHeightPaper}>Item 1</Paper>
						</Grid>
						<Grid item xs={12} md={4} lg={3}>
							<Paper className={fixedHeightPaper}>Item 2</Paper>
						</Grid>
						<Grid item xs={12}>
							<Paper className={classes.paper}>Item 3</Paper>
						</Grid>
					</Grid>
				</Container>
			</main>
		);
	}
}

export default withStyles(styles)(RoomAdmin);
