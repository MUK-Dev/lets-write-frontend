import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import app, { socket } from "../../../feathers-client";
import {
	Container,
	Grid,
	Paper,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	CircularProgress,
	Typography,
	ListItemText,
	TextField,
	Button,
} from "@material-ui/core";
import { connect } from "react-redux";

import ChatBox from "../../../Components/Chatbox/Chatbox";

const styles = (theme) => ({
	root: {
		display: "flex",
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		minHeight: "100vh",
		overflow: "auto",
		color: "white",
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		flexDirection: "column",
		backgroundColor: "#37474f",
		color: "lightGrey",
		overflow: "auto",
	},
	fixedHeightOne: {
		height: "300px",
		maxHeight: "300px",
	},
	fixedHeightTwo: {
		height: "600px",

		[theme.breakpoints.down("sm")]: {
			height: "400px",
		},
	},
	submit: {
		marginTop: "15px",
		color: "white",
		backgroundColor: "#263238",
		"&:hover": {
			backgroundColor: "#1f292e",
		},
		"&:active": {
			backgroundColor: "#1f292e",
		},
	},
	list: {
		width: "100%",
	},
	chatPaper: {
		// height: "85%",
		// maxHeight: "85%",
		// [theme.breakpoints.down("sm")]: {
		// 	height: "77%",
		// 	maxHeight: "77%",
		// },
		overflow: "hidden",
	},
	questionBox: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
});

class RoomAdmin extends Component {
	state = {
		room: null,
		showSpinner: false,
		activeUsers: [],
		chatbox: "",
		chatMessages: "",
		question: "",
	};

	componentDidMount() {
		this.setState({ showSpinner: true });
		app
			.service("rooms")
			.get(this.props.match.params.id)
			.then((res) => {
				this.setState({
					room: res,
					showSpinner: false,
					question: res.question,
				});
			})
			.catch((err) => {
				this.setState({ showSpinner: false });

				console.log(err);
			});
		app
			.service("messages")
			.find({
				query: {
					room_id: this.props.match.params.id,
				},
			})
			.then((res) => {
				this.setState({ chatMessages: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
		app.service("messages").on("created", (message) => {
			if (message.room_id === this.props.match.params.id) {
				const newMessages = [...this.state.chatMessages];
				newMessages.push(message);
				this.setState({ chatMessages: newMessages });
			}
		});
		app.service("rooms").on("patched", (room) => {
			if (room._id === this.props.match.params.id) {
				this.setState({ room: room, questionBox: room.question });
			}
		});
		socket.on("userLeft", ({ username, userId, message }) => {
			// console.log(message);
			const newActiveUsers = this.state.activeUsers.filter(
				(user) => !(user.userId === userId)
			);
			this.setState({ activeUsers: newActiveUsers });
		});
		socket.on("userJoined", ({ username, userId, avatar, message }) => {
			// console.log(message);
			const user = {
				username,
				userId,
				avatar,
			};
			const newActiveUsers = [...this.state.activeUsers];
			newActiveUsers.push(user);
			// console.log(newNotifications);
			this.setState({ activeUsers: newActiveUsers });
		});
		socket.on("onlineUsers", (onlineUsers) => {
			this.setState({ activeUsers: onlineUsers });
		});
		socket.emit("getOnlineUsers", this.props.match.params.id);
	}

	chatboxHandler = (event) => {
		this.setState({ chatbox: event.target.value });
	};

	questionBoxHandler = (event) => {
		this.setState({ question: event.target.value });
	};

	updateQuestionHandler = () => {
		app
			.service("rooms")
			.patch(this.props.match.params.id, {
				$set: {
					question: this.state.question,
				},
			})
			.catch((err) => {
				console.log(err);
			});
	};

	sendMessage = async () => {
		// console.log(
		// 	"[Send message Funciton]",
		// 	this.props.userId,
		// 	this.props.username,
		// 	this.props.match.params.id,
		// 	this.props.avatar,
		// 	this.state.chatbox
		// );
		if (this.state.chatbox !== "") {
			try {
				await app.service("messages").create({
					sender: {
						sender_id: this.props.userId,
						name: this.props.username,
					},
					room_id: this.props.match.params.id,
					avatar: this.props.avatar,
					message: this.state.chatbox,
				});
				this.setState({ chatbox: "" });
			} catch (err) {
				console.log(err);
			}
		}
	};

	render() {
		const { classes } = this.props;
		const fixedHeightPaperOne = clsx(classes.paper, classes.fixedHeightOne);
		const fixedHeightPaperTwo = clsx(classes.paper, classes.fixedHeightTwo);
		return (
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="xl" className={classes.container}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={8}>
							<Paper className={clsx(fixedHeightPaperOne, classes.questionBox)}>
								<Grid
									container
									direction="column"
									alignItems="stretch"
									justifyContent="center"
								>
									<Grid item>
										<TextField
											variant="outlined"
											margin="normal"
											fullWidth
											id="question"
											label="Question"
											inputProps={{
												style: {
													color: "white",
													opacity: "0.6",
												},
											}}
											InputLabelProps={{
												style: {
													color: "white",
													opacity: "0.5",
												},
											}}
											name="question"
											autoComplete="question"
											value={this.state.question}
											onChange={this.questionBoxHandler}
										/>
									</Grid>
									<Grid item>
										<Button
											onClick={this.updateQuestionHandler}
											variant="contained"
											fullWidth
											color="secondary"
											className={classes.submit}
										>
											Update Question
										</Button>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
						<Grid item xs={12} md={4}>
							<Paper className={fixedHeightPaperOne}>
								<Grid
									container
									direction="row"
									alignItems="center"
									justifyContent="center"
								>
									{this.state.activeUsers.length > 0 ? (
										<Typography>Active Users 👨‍🎓👩‍🎓</Typography>
									) : (
										<Typography>No one is online 😕</Typography>
									)}
									{this.state.showSpinner ? (
										<CircularProgress />
									) : this.state.room ? (
										this.state.activeUsers.length > 0 ? (
											<List className={classes.list}>
												{this.state.activeUsers.map((user) => {
													return (
														<ListItem key={user.userId}>
															<ListItemAvatar>
																<Avatar src={user.avatar} alt="User Pic" />
															</ListItemAvatar>
															<ListItemText primary={user.username} />
														</ListItem>
													);
												})}
											</List>
										) : null
									) : null}
								</Grid>
							</Paper>
						</Grid>
						<Grid item xs={12} md={8}>
							<Paper className={fixedHeightPaperTwo}>Item 3</Paper>
						</Grid>
						<Grid item xs={12} md={4}>
							<Paper className={clsx(fixedHeightPaperTwo, classes.chatPaper)}>
								<ChatBox
									sendMessage={this.sendMessage}
									messages={this.state.chatMessages}
									value={this.state.chatbox}
									valueChanger={this.chatboxHandler}
								/>
							</Paper>
						</Grid>
					</Grid>
				</Container>
			</main>
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

export default connect(mapStateToProps)(withStyles(styles)(RoomAdmin));
