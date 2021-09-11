import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";

const UpdateQuestion = (props) => {
	const { classes, question, questionBoxHandler, updateQuestionHandler } =
		props;

	return (
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
					value={question}
					onChange={questionBoxHandler}
				/>
			</Grid>
			<Grid item>
				<Button
					onClick={updateQuestionHandler}
					variant="contained"
					fullWidth
					color="secondary"
					className={classes.submit}
				>
					Update Question
				</Button>
			</Grid>
		</Grid>
	);
};

export default UpdateQuestion;
