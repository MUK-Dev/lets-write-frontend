import React from "react";
import {
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Grow,
} from "@material-ui/core";

const Message = (props) => {
	const { classes, avatar, username, message } = props;
	return (
		<div>
			<ListItem className={classes.chatMessage}>
				<ListItemAvatar>
					<Grow in timeout={1000}>
						<Avatar src={avatar} alt="User Pic" className={classes.small} />
					</Grow>
				</ListItemAvatar>
				<ListItemText primary={username} secondary={message} />
			</ListItem>
		</div>
	);
};

export default Message;
