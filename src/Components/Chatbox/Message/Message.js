import React from "react";
import {
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
} from "@material-ui/core";

const Message = (props) => {
	const { classes } = props;
	return (
		<div>
			<ListItem className={classes.chatMessage}>
				<ListItemAvatar>
					<Avatar src={props.avatar} alt="User Pic" className={classes.small} />
				</ListItemAvatar>
				<ListItemText primary={props.username} secondary={props.message} />
			</ListItem>
		</div>
	);
};

export default Message;
