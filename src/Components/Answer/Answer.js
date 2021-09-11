import React from "react";
import {
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	Grow,
} from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";

const Answer = (props) => {
	const { classes, avatar, username, text } = props;

	return (
		<div>
			<ListItem className={classes.answer}>
				<ListItemAvatar>
					<Grow in timeout={1000}>
						<Avatar src={avatar} alt="User Pic" />
					</Grow>
				</ListItemAvatar>

				<ListItemText
					primary={username}
					secondary={ReactHtmlParser(text)}
					secondaryTypographyProps={{
						component: "span",
					}}
				/>
			</ListItem>
		</div>
	);
};

export default Answer;
