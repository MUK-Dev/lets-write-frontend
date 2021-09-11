import React, { Component } from "react";
import { Grid, Grow } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";
import { connect } from "react-redux";

import RoomForm from "../../Components/RoomForm/RoomForm";
import YourRooms from "../../Components/YourRooms/YourRooms";
import LatestRooms from "../../Components/LatestRooms/LatestRooms";
import app, { socket } from "../../feathers-client";
import FloatingLoadingSpinner from "../../Components/FloatingLoadingSpinner/FloatingLoadingSpinner";
import MainNavigation from "../../Components/MainNavigation/MainNavigation";
import styles from "../../Styles/Main-Styles";

class Main extends Component {
	state = {
		joinRoomForm: true,
		name: "",
		question: "",
		redirect: false,
		recentRooms: [],
		userRooms: [],
		searchOptions: [],
		showSpinner: false,
	};

	componentDidMount() {
		this.setState({ showSpinner: true });
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
				this.setState({ showSpinner: false });
				if (res.data.length > 0) {
					this.setState({ recentRooms: res.data });
				}
			})
			.catch((err) => {
				this.setState({ showSpinner: false });
				console.log(err);
			});
		app
			.service("rooms")
			.find({
				query: {
					"owner.owner_id": this.props.userId,
				},
			})
			.then((res) => {
				if (res.data.length > 0) {
					this.setState({ userRooms: res.data });
				}
			})
			.catch((err) => {});

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

		socket.on("joinMessage", ({ joined, userId, ownerId, roomId }) => {
			this.setState({ showSpinner: false });
			if (joined) {
				if (this.props.userId === userId) {
					if (this.props.userId === ownerId) {
						this.props.history.replace(`/main/${roomId}/admin`);
					} else {
						this.props.history.replace(`/main/${roomId}`);
					}
				}
			}
		});
	}

	joinRoomHandler = (roomId, ownerId) => {
		this.setState({ showSpinner: true });
		const { username, userId, avatar } = this.props;
		socket.emit("joinRoom", {
			username,
			userId,
			avatar,
			roomId,
			ownerId,
		});
	};

	createRoomHandler = (event) => {
		event.preventDefault();
		this.setState({ showSpinner: true });
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
					const { username, userId, avatar } = this.props;
					socket.emit("joinRoom", {
						username,
						userId,
						avatar,
						roomId: res._id,
						ownerId: res.owner.owner_id,
					});
				})
				.catch((err) => {
					this.setState({ showSpinner: false });
					console.log(err);
				});
		}
	};

	nameValueHandler = (event) => {
		this.setState({ name: event.target.value });
		if (this.state.joinRoomForm) {
			this.setState({ showSpinner: true });
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
					this.setState({ searchOptions: res.data, showSpinner: false });
				})
				.catch((err) => {
					this.setState({ searchOptions: [], showSpinner: false });
				});
		}
	};

	questionValueHandler = (event) => {
		this.setState({ question: event.target.value });
	};

	logoutHandler = async () => {
		this.setState({ showSpinner: true });
		await app.logout();
		this.setState({ redirect: true, showSpinner: false });
	};

	render() {
		const { classes, avatar, username } = this.props;
		const {
			joinRoomForm,
			name,
			question,
			recentRooms,
			redirect,
			searchOptions,
			showSpinner,
			userRooms,
		} = this.state;

		const reversedRoomsArray = [].concat(recentRooms).reverse();

		const sideNavigation = (
			<MainNavigation
				classes={classes}
				avatar={avatar}
				username={username}
				logout={this.logoutHandler}
			/>
		);

		const roomForm = (
			<Grow in={true} timeout={1000}>
				<Grid item xs={12} className={classes.columnSearch}>
					<RoomForm
						classes={classes}
						roomVal={name}
						joinRoom={(roomId, ownerId) =>
							this.joinRoomHandler(roomId, ownerId)
						}
						questionVal={question}
						nameChanger={this.nameValueHandler}
						questionChanger={this.questionValueHandler}
						searchOptions={searchOptions}
						submitHandler={(event) => this.createRoomHandler(event)}
						joinForm={joinRoomForm}
						changeForm={() => {
							this.setState({
								joinRoomForm: !joinRoomForm,
							});
						}}
					/>
				</Grid>
			</Grow>
		);

		const yourRooms = (
			<Grid item xs={12} md={6} className={classes.column}>
				<YourRooms
					classes={classes}
					rooms={userRooms}
					joinRoom={(roomId, ownerId) => this.joinRoomHandler(roomId, ownerId)}
				/>
			</Grid>
		);

		const latestRooms = (
			<Grid item xs={12} md={6} className={classes.column}>
				<LatestRooms
					classes={classes}
					rooms={reversedRoomsArray}
					joinRoom={(roomId, ownerId) => this.joinRoomHandler(roomId, ownerId)}
				/>
			</Grid>
		);

		const spinner = showSpinner ? <FloatingLoadingSpinner /> : null;

		if (redirect) {
			return <Redirect to="/" />;
		}
		return (
			<div className={classes.root}>
				<Grid container direction="row" alignItems="flex-start">
					{sideNavigation}

					<Grid item xs={9} sm={10} className={classes.scrollableCol}>
						{roomForm}

						<Grid
							container
							component="main"
							direction="row"
							justifyContent="space-between"
							alignItems="center"
						>
							{yourRooms}

							{latestRooms}
						</Grid>

						{spinner}
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
