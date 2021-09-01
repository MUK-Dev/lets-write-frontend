import React, { useRef } from "react";
import {
	Grid,
	TextField,
	IconButton,
	List,
	Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Send } from "@material-ui/icons";

import Message from "./Message/Message";

const useStyles = makeStyles((theme) => ({
	chatbox: {
		width: "100%",
		height: "520px",

		[theme.breakpoints.down("sm")]: {
			height: "320px",
		},
		"& *": {
			color: "white",
		},
		overflow: "scroll",
	},
	list: {
		overflow: "scroll",
	},
	chatMessage: {
		backgroundColor: "#263238",
		borderRadius: "25px",
		margin: "5px",
	},
	small: {
		width: theme.spacing(4),
		height: theme.spacing(4),
	},
	textfield: {
		width: "85%",
		color: "white",
		[theme.breakpoints.down("md")]: {
			width: "80%",
		},
		[theme.breakpoints.down("sm")]: {
			width: "85%",
		},
	},
}));

const Chatbox = (props) => {
	const chatScroll = useRef();

	const reversedMessagesArray = [].concat(props.messages).reverse();

	const classes = useStyles();
	return (
		<Grid container direction="column">
			<Grid item className={classes.chatbox}>
				<List ref={chatScroll} className={classes.list}>
					{props.messages.length > 0 ? (
						reversedMessagesArray.map((m) => {
							return (
								<div key={m._id}>
									<Message
										classes={classes}
										avatar={m.avatar}
										username={m.sender.name}
										message={m.message}
									/>
								</div>
							);
						})
					) : (
						<Typography align="center">
							New messages will be displayed here
						</Typography>
					)}
				</List>
			</Grid>
			<Grid item>
				<TextField
					className={classes.textfield}
					color="primary"
					required
					value={props.value}
					onChange={props.valueChanger}
					inputProps={{
						style: {
							color: "white",
						},
					}}
				/>
				<IconButton
					color="inherit"
					aria-label="Send"
					onClick={props.sendMessage}
				>
					<Send />
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default Chatbox;
