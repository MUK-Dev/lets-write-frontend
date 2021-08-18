import React, { Component } from "react";
import { Grid, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";
import { connect } from "react-redux";

import RoomForm from "../../Components/RoomForm/RoomForm";
import YourRooms from "../../Components/YourRooms/YourRooms";
import LatestRooms from "../../Components/LatestRooms/LatestRooms";
import app, { socket } from "../../feathers-client";

const styles = (theme) => ({
	"@global": {
		"*::-webkit-scrollbar": {
			width: "0.4em",
		},
		"*::-webkit-scrollbar-track": {
			"-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
		},
		"*::-webkit-scrollbar-thumb": {
			backgroundColor: "#37474f",
			outline: "none",
		},
	},
	root: {
		backgroundColor: "#263238",
		color: "white",
		minHeight: "100vh",
		width: "100%",
		padding: "0 10px 0 0",
	},
	columnSearch: {
		textAlign: "center",
		minHeight: "10vh",
	},
	column: {
		textAlign: "center",
		minHeight: "10vh",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, "auto", 0, "auto"),
		maxWidth: "150px",
		display: "flex",
	},
	changer: {
		color: "white",
		backgroundColor: "#37474f",
		margin: "5px",
		padding: "0 10px",
	},
	avatar: {
		maxHeight: "40px",
		maxWidth: "40px",
		borderRadius: "50%",
		display: "flex",
		margin: "auto",
	},
	username: {
		textAlign: "center",
	},
	navigation: {
		padding: "30px 10px",
		top: "0",
		left: "0",
		backgroundColor: "#37474f",
		minHeight: "100vh",
		width: "200px",
		position: "sticky",
		display: "inline-block",
		verticalAlign: "top",
	},
	rooms: {
		maxHeight: "125px",
		overflowY: "scroll",
		[theme.breakpoints.up("md")]: {
			marginTop: "10px",
			maxHeight: "250px",
		},
	},
	searchedRooms: {
		maxHeight: "125px",
		overflowY: "scroll",
		[theme.breakpoints.up("md")]: {
			marginTop: "10px",
			maxHeight: "250px",
		},
	},
	scrollableCol: {
		display: "inline-block",
		verticalAlign: "bottom",
	},
});

class Main extends Component {
	state = {
		joinRoomForm: true,
		name: "",
		question: "",
		redirect: false,
		message: "",
		recentRooms: [],
		searchOptions: [],
	};

	componentDidMount() {
		app
			.service("rooms")
			.find({
				query: {
					$limit: 10,
					createdAt: {
						$gte: new Date(new Date() - 1 * 60 * 60 * 1000),
					},
				},
			})
			.then((res) => {
				if (res.data.length > 0) {
					this.setState({ recentRooms: res.data });
				}
			})
			.catch((err) => {
				console.log(err);
			});

		app.service("rooms").on("created", (room) => {
			const newRecentRooms = [...this.state.recentRooms];
			if (!newRecentRooms.some((r) => room._id === r._id)) {
				newRecentRooms.push(room);
				if (newRecentRooms.length > 10) {
					newRecentRooms.shift();
				}
				this.setState({ recentRooms: newRecentRooms });
			} else return;
		});

		socket.on("joinMessage", ({ joined, ownerId, roomId }) => {
			if (joined) {
				if (this.props.userId === ownerId) {
					this.props.history.push(`/main/${roomId}/admin`);
				} else {
					this.props.history.push(`/main/${roomId}`);
				}
			}
		});
	}

	joinRoomHandler = (roomId, ownerId) => {
		const { username, userId } = this.props;
		socket.emit("joinRoom", {
			username,
			userId,
			roomId,
			ownerId,
		});
	};

	createRoomHandler = (event) => {
		event.preventDefault();
		const { name, question } = this.state;
		if (name !== "" && question !== "") {
			app
				.service("rooms")
				.create({
					name,
					question,
					owner: {
						owner_id: this.props.userId,
						name: this.props.username,
					},
				})
				.then((res) => {
					//!Redirect to room's page
					const { username, userId } = this.props;
					socket.emit("joinRoom", {
						username,
						userId,
						roomId: res._id,
						ownerId: res.owner.owner_id,
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	nameValueHandler = (event) => {
		this.setState({ name: event.target.value });
		if (this.state.joinRoomForm) {
			app
				.service("rooms")
				.find({
					query: {
						$limit: 10,
						name: {
							$search: event.target.value,
						},
					},
				})
				.then((res) => {
					this.setState({ searchOptions: res.data });
				})
				.catch((err) => {
					this.setState({ searchOptions: [] });
				});
		}
	};

	questionValueHandler = (event) => {
		this.setState({ question: event.target.value });
	};

	logoutHandler = async () => {
		await app.logout();
		this.setState({ redirect: true });
	};

	render() {
		const { classes } = this.props;
		if (this.state.redirect) {
			return <Redirect to="/" />;
		}
		const reversedRoomsArray = [].concat(this.state.recentRooms).reverse();
		return (
			<div className={classes.root}>
				<Grid container direction="row" alignItems="flex-start">
					<Grid item xs={3} sm={2} className={classes.navigation} elvation={5}>
						<img
							src={this.props.avatar}
							alt="User Avatar"
							className={classes.avatar}
						/>
						<h5 className={classes.username}>{this.props.username}</h5>
						<Button
							variant="contained"
							fullWidth
							color="default"
							className={classes.submit}
							onClick={this.logoutHandler}
						>
							Logout
						</Button>
					</Grid>
					<Grid item xs={9} sm={10} className={classes.scrollableCol}>
						<Grid item xs={12} className={classes.columnSearch}>
							<RoomForm
								classes={classes}
								roomVal={this.state.name}
								joinRoom={(roomId, ownerId) =>
									this.joinRoomHandler(roomId, ownerId)
								}
								questionVal={this.state.question}
								nameChanger={this.nameValueHandler}
								questionChanger={this.questionValueHandler}
								searchOptions={this.state.searchOptions}
								submitHandler={(event) => this.createRoomHandler(event)}
								joinForm={this.state.joinRoomForm}
								changeForm={() => {
									this.setState({
										joinRoomForm: !this.state.joinRoomForm,
									});
								}}
							/>
						</Grid>
						<Grid
							container
							component="main"
							direction="row"
							justifyContent="space-between"
							alignItems="center"
						>
							<Grid item xs={12} md={6} className={classes.column}>
								<YourRooms
									classes={classes}
									joinRoom={(roomId, ownerId) =>
										this.joinRoomHandler(roomId, ownerId)
									}
								/>
							</Grid>
							<Grid item xs={12} md={6} className={classes.column}>
								<LatestRooms
									classes={classes}
									rooms={reversedRoomsArray}
									joinRoom={(roomId, ownerId) =>
										this.joinRoomHandler(roomId, ownerId)
									}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	if (state.currentUser) {
		return {
			userId: state.currentUser._id,
			username: state.currentUser.name,
			avatar: state.currentUser.avatar_url,
		};
	}
};

export default connect(mapStateToProps)(withStyles(styles)(Main));
