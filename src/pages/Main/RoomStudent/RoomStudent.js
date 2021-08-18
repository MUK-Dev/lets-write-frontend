import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
	Container,
	CircularProgress,
	Grid,
	Paper,
	Typography,
} from "@material-ui/core";

import app, { socket } from "../../../feathers-client";

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

class RoomStudent extends Component {
	state = {
		room: null,
		showSpinner: false,
	};

	componentDidMount() {
		console.log(this.props.match.params.id);
		this.setState({ showSpinner: true });
		app
			.service("rooms")
			.get(this.props.match.params.id)
			.then((res) => {
				console.log(res);
				this.setState({ room: res, showSpinner: false });
			})
			.catch((err) => {
				this.setState({ showSpinner: false });

				console.log(err);
			});
	}

	render() {
		const { classes } = this.props;
		const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
		return (
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="lg" className={classes.container}>
					<Grid
						container
						alignItems="center"
						alignContent="center"
						justifyContent="center"
						spacing={3}
					>
						<Grid item xs={12} md={8} lg={9}>
							<Paper className={fixedHeightPaper}>
								<Grid
									container
									direction="row"
									alignItems="center"
									justifyContent="center"
								>
									{this.state.showSpinner ? (
										<CircularProgress />
									) : this.state.room ? (
										<Typography>Room Name: {this.state.room.name}</Typography>
									) : null}
								</Grid>
							</Paper>
						</Grid>
						<Grid item xs={12} md={4} lg={3}>
							<Paper className={fixedHeightPaper}>
								<Grid
									container
									direction="row"
									alignItems="center"
									justifyContent="center"
								>
									{this.state.showSpinner ? (
										<CircularProgress />
									) : this.state.room ? (
										<Typography>
											Room Question: {this.state.room.question}
										</Typography>
									) : null}
								</Grid>
							</Paper>
						</Grid>
						<Grid item xs={12}>
							<Paper className={classes.paper}>
								<Grid
									container
									direction="row"
									alignItems="center"
									justifyContent="center"
								>
									{this.state.showSpinner ? (
										<CircularProgress />
									) : this.state.room ? (
										<Typography>Owner: {this.state.room.owner.name}</Typography>
									) : null}
								</Grid>
							</Paper>
						</Grid>
					</Grid>
				</Container>
			</main>
		);
	}
}

export default withStyles(styles)(RoomStudent);
