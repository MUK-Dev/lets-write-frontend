import React, { useState } from "react";
import {
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	Grow,
	Select,
	MenuItem,
	IconButton,
} from "@material-ui/core";
import { Check } from "@material-ui/icons";
import ReactHtmlParser from "react-html-parser";

const Answer = (props) => {
	const { classes, avatar, username, text, gradeAnswerHandler } = props;

	const [grade, setGrade] = useState("");

	return (
		<div>
			<ListItem className={classes.answer}>
				<div className={classes.grade}>
					<Select value={grade} onChange={(e) => setGrade(e.target.value)}>
						<MenuItem value="A+">A+</MenuItem>
						<MenuItem value="A">A</MenuItem>
						<MenuItem value="B+">B+</MenuItem>
						<MenuItem value="B">B</MenuItem>
						<MenuItem value="C+">C+</MenuItem>
						<MenuItem value="C">C</MenuItem>
						<MenuItem value="D+">D+</MenuItem>
						<MenuItem value="D">D</MenuItem>
						<MenuItem value="E+">E+</MenuItem>
						<MenuItem value="E">E</MenuItem>
						<MenuItem value="F+">F+</MenuItem>
						<MenuItem value="F">F</MenuItem>
					</Select>
					<IconButton
						edge="end"
						disabled={grade === "" ? true : false}
						component="span"
						onClick={() => gradeAnswerHandler(grade)}
					>
						<Check style={{ fill: "#f48fb1" }} />
					</IconButton>
				</div>
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
