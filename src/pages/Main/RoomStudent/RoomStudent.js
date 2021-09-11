import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import {
	Container,
	CircularProgress,
	Grid,
	Paper,
	Typography,
	Box,
	Button,
} from "@material-ui/core";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { connect } from "react-redux";

import app from "../../../feathers-client";
import TextEditor from "../../../Components/TextEditor/TextEditor";
import Chatbox from "../../../Components/Chatbox/Chatbox";
import styles from "../../../Styles/RoomStudent-Styles";

class RoomStudent extends Component {
	state = {
		room: null,
		showSpinner: false,
		submitLoading: false,
		editorState: EditorState.createEmpty(),
		chatbox: "",
		chatMessages: [],
	};

	componentDidMount() {
		this.setState({ showSpinner: true });
		app
			.service("rooms")
			.get(this.props.match.params.id)
			.then((res) => {
				this.setState({ room: res, showSpinner: false });
			})
			.catch((err) => {
				this.setState({ showSpinner: false });

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
				this.setState({ room: room, questionBox: room.questionSection });
			}
		});
	}

	submitAnswerHandler = () => {
		this.setState({ submitLoading: true });
		const answer = {
			user: {
				user_id: this.props.userId,
				username: this.props.username,
				avatar: this.props.avatar,
			},
			room: {
				room_id: this.state.room._id,
				question: this.state.room.question,
			},
			text: JSON.stringify(
				convertToRaw(this.state.editorState.getCurrentContent())
			),
		};
		app
			.service("answers")
			.create(answer)
			.then((res) => {
				this.setState({
					submitLoading: false,
					editorState: EditorState.createEmpty(),
				});
			})
			.catch((err) => {
				console.log(err);
				this.setState({ submitLoading: false });
			});
	};

	onEditorStateChange = (editorState) => {
		this.setState({
			editorState,
		});
	};

	chatboxHandler = (event) => {
		this.setState({ chatbox: event.target.value });
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
			chatMessages,
			chatbox,
			editorState,
			room,
			showSpinner,
			submitLoading,
		} = this.state;

		const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

		const questionSection = (
			<Grid item xs={12}>
				<Paper className={classes.paper}>
					<Grid
						container
						direction="row"
						alignItems="center"
						justifyContent="center"
					>
						{showSpinner ? (
							<CircularProgress />
						) : room ? (
							<Typography>
								<strong>Current Question:</strong> {room.question}
							</Typography>
						) : null}
					</Grid>
				</Paper>
			</Grid>
		);

		const textEditorSection = (
			<Grid item xs={12} md={8}>
				<Paper className={fixedHeightPaper}>
					<Grid
						container
						direction="row"
						alignItems="center"
						justifyContent="center"
					>
						{showSpinner ? (
							<CircularProgress />
						) : room ? (
							<Box width="100%" height="100%">
								<TextEditor
									classes={classes}
									onEditorStateChange={this.onEditorStateChange}
									editorState={editorState}
								/>
							</Box>
						) : null}
						{submitLoading ? (
							<CircularProgress />
						) : (
							<Button
								variant="contained"
								fullWidth
								className={classes.submit}
								onClick={this.submitAnswerHandler}
							>
								Submit Answer
							</Button>
						)}
					</Grid>
				</Paper>
			</Grid>
		);

		const messageSection = (
			<Grid item xs={12} md={4}>
				<Paper className={clsx(fixedHeightPaper, classes.chatPaper)}>
					<Chatbox
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
					<Grid
						container
						alignItems="center"
						alignContent="center"
						justifyContent="center"
						spacing={3}
					>
						{questionSection}

						{textEditorSection}

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

export default connect(mapStateToProps)(withStyles(styles)(RoomStudent));
