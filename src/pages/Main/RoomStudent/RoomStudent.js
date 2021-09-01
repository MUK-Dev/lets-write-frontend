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
import { convertToRaw, EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { connect } from "react-redux";

import app from "../../../feathers-client";
import TextEditor from "../../../Components/TextEditor/TextEditor";
import Chatbox from "../../../Components/Chatbox/Chatbox";

const styles = (theme) => ({
	root: {
		display: "flex",
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: "100vh",
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
	chatPaper: {
		height: "85%",
		maxHeight: "85%",
		[theme.breakpoints.down("sm")]: {
			height: "77%",
			maxHeight: "77%",
		},
		overflow: "hidden",
	},
	toolbarClassName: {
		backgroundColor: "#37474f",
		background: "#37474f",
		border: "none",
		"& *": {
			backgroundColor: "#37474f",
			background: "#37474f",
			border: "none",
		},
		"& .rdw-link-modal-input": {
			border: "1px solid #f1f1f1",
			color: "white",
		},
	},
	wrapperClassName: {
		wordWrap: "normal",
		backgroundColor: "#37474f",
		background: "#37474f !important",
		border: "none !important",
		height: "270px",
		[theme.breakpoints.down("sm")]: {
			height: "240px",
		},
	},
	fixedHeight: {
		height: "600px",

		[theme.breakpoints.down("sm")]: {
			height: "400px",
		},
	},
	editorClassName: {
		wordWrap: "normal",
		backgroundColor: "#263238",
		background: "#263238 !important",
		border: "1px solid #37474f",
		height: "100%",

		overflow: "scroll",
		[theme.breakpoints.down("sm")]: {
			maxHeight: "100px",
		},
	},
	submit: {
		marginTop: "100px",
		[theme.breakpoints.down("sm")]: {
			marginTop: "15px",
		},
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
});

class RoomStudent extends Component {
	state = {
		room: null,
		showSpinner: false,
		editorState: EditorState.createEmpty(),
		chatbox: "",
		chatMessages: [],
	};

	// showHtml = React.createRef();

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
				this.setState({ room: room, questionBox: room.question });
			}
		});
	}

	submitAnswerHandler = () => {
		console.log("Submit Answer event triggered");
	};

	onEditorStateChange = (editorState) => {
		// console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
		// this.showHtml.current.innerHTML = draftToHtml(
		// 	convertToRaw(editorState.getCurrentContent())
		// );
		this.setState({
			editorState,
			textToShow: convertToRaw(editorState.getCurrentContent()),
		});
	};

	chatboxHandler = (event) => {
		this.setState({ chatbox: event.target.value });
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
		const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
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
										<Typography>
											<strong>Current Question:</strong>{" "}
											{this.state.room.question}
										</Typography>
									) : null}
								</Grid>
							</Paper>
						</Grid>
						<Grid item xs={12} md={8}>
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
										<Box width="100%" height="100%">
											<TextEditor
												classes={classes}
												onEditorStateChange={this.onEditorStateChange}
												editorState={this.state.editorState}
											/>
										</Box>
									) : null}
									<Button
										variant="contained"
										fullWidth
										className={classes.submit}
										onClick={this.submitAnswerHandler}
									>
										Submit Answer
									</Button>
								</Grid>
							</Paper>
						</Grid>
						<Grid item xs={12} md={4}>
							<Paper className={clsx(fixedHeightPaper, classes.chatPaper)}>
								<Chatbox
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

export default connect(mapStateToProps)(withStyles(styles)(RoomStudent));
