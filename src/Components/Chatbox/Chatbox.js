import React from "react";
import {
	Grid,
	TextField,
	IconButton,
	List,
	Typography,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";

import Message from "./Message/Message";
import styles from "../../Styles/Chatbox-Styles";

const useStyles = styles;

const Chatbox = (props) => {
	const { messages, value, valueChanger, sendMessage } = props;

	const reversedMessagesArray = [].concat(messages).reverse();

	const classes = useStyles();
	return (
		<Grid container direction="column">
			<Grid item className={classes.chatbox}>
				<List className={classes.list}>
					{messages.length > 0 ? (
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
					value={value}
					onChange={valueChanger}
					inputProps={{
						style: {
							color: "white",
						},
					}}
				/>
				<IconButton color="inherit" aria-label="Send" onClick={sendMessage}>
					<Send />
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default Chatbox;
