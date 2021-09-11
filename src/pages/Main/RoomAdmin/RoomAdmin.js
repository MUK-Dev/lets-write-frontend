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
} from "@material-ui/core";
import { connect } from "react-redux";
import draftToHtml from "draftjs-to-html";

import ChatBox from "../../../Components/Chatbox/Chatbox";
import Answer from "../../../Components/Answer/Answer";
import styles from "../../../Styles/RoomAdmin-Styles";
import UpdateQuestion from "../../../Components/UpdateQuestion/UpdateQuestion";

class RoomAdmin extends Component {
	state = {
		room: null,
		showSpinner: false,
		activeUsers: [],
		chatbox: "",
		chatMessages: "",
		question: "",
		answers: [],
	};

	componentDidMount() {
		this.setState({ showSpinner: true });
		app
			.service("rooms")
			.get(this.props.match.params.id)
			.then((res) => {
				this.setState({
					room: res,
					question: res.question,
				});
			})
			.catch((err) => {
				console.log(err);
			});
		app
			.service("answers")
			.find({
				query: {
					"room.room_id": this.props.match.params.id,
				},
			})
			.then((res) => {
				this.setState({ answers: res.data });
			})
			.catch((err) => {
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
				this.setState({ chatMessages: res.data, showSpinner: false });
			})
			.catch((err) => {
				this.setState({ showSpinner: false });
				console.log(err);
			});
		app.service("answers").on("created", (answer) => {
			if (answer.room.room_id === this.props.match.params.id) {
				const newAnswers = [...this.state.answers];
				newAnswers.push(answer);
				this.setState({ answers: newAnswers });
			}
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
			const newActiveUsers = this.state.activeUsers.filter(
				(user) => !(user.userId === userId)
			);
			this.setState({ activeUsers: newActiveUsers });
		});
		socket.on("userJoined", ({ username, userId, avatar, message }) => {
			const user = {
				username,
				userId,
				avatar,
			};
			const newActiveUsers = [...this.state.activeUsers];
			newActiveUsers.push(user);
			this.setState({ activeUsers: newActiveUsers });
		});
		socket.on("onlineUsersSection", (onlineUsersSection) => {
			this.setState({ activeUsers: onlineUsersSection });
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
		const {
			question,
			activeUsers,
			answers,
			chatMessages,
			chatbox,
			room,
			showSpinner,
		} = this.state;

		const fixedHeightPaperOne = clsx(classes.paper, classes.fixedHeightOne);

		const fixedHeightPaperTwo = clsx(classes.paper, classes.fixedHeightTwo);

		const updateQuestionSection = (
			<Grid item xs={12} md={8}>
				<Paper className={clsx(fixedHeightPaperOne, classes.questionBox)}>
					<UpdateQuestion
						classes={classes}
						question={question}
						questionBoxHandler={this.questionBoxHandler}
						updateQuestionHandler={this.updateQuestionHandler}
					/>
				</Paper>
			</Grid>
		);

		const onlineUsersSection = (
			<Grid item xs={12} md={4}>
				<Paper className={fixedHeightPaperOne}>
					<Grid
						container
						direction="row"
						alignItems="center"
						justifyContent="center"
					>
						{activeUsers.length > 0 ? (
							<Typography>Active Users 👨‍🎓👩‍🎓</Typography>
						) : (
							<Typography>No one is online 😕</Typography>
						)}
						{showSpinner ? (
							<CircularProgress />
						) : room ? (
							activeUsers.length > 0 ? (
								<List className={classes.list}>
									{activeUsers.map((user) => {
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
		);

		const submittedAnswersSection = (
			<Grid item xs={12} md={8}>
				<Paper className={fixedHeightPaperTwo}>
					<Grid container direction="column" alignItems="stretch">
						{answers.length > 0 ? (
							answers.map((answer) => {
								return (
									<div key={answer._id}>
										<Answer
											classes={classes}
											username={answer.user.username}
											avatar={answer.user.avatar}
											text={draftToHtml(JSON.parse(answer.text))}
										/>
									</div>
								);
							})
						) : (
							<Typography align="center">
								Submitted Answers Will Be Shown Here
							</Typography>
						)}
					</Grid>
				</Paper>
			</Grid>
		);

		const messageSection = (
			<Grid item xs={12} md={4}>
				<Paper className={clsx(fixedHeightPaperTwo, classes.chatPaper)}>
					<ChatBox
						sendMessage={this.sendMessage}
						messages={chatMessages}
						value={chatbox}
						valueChanger={this.chatboxHandler}
					/>
				</Paper>
			</Grid>
		);
		return (
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth="xl" className={classes.container}>
					<Grid container spacing={3}>
						{updateQuestionSection}

						{onlineUsersSection}

						{submittedAnswersSection}

						{messageSection}
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
