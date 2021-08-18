import React from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";

const RoomForm = (props) => {
	const form = props.joinForm ? (
		<div>
			{props.joinForm ? <p>Search Rooms by name</p> : null}

			<TextField
				variant="outlined"
				margin="normal"
				id="name"
				label="Room Name"
				name="room"
				required
				autoComplete="off"
				value={props.roomVal}
				onChange={props.nameChanger}
				inputProps={{
					style: {
						color: "white",
					},
				}}
				InputLabelProps={{
					style: {
						color: "white",
						opacity: "0.5",
					},
				}}
			/>
			<div className={props.classes.searchedRooms}>
				{props.searchOptions.length > 0
					? props.searchOptions.map((option) => {
							return (
								<Grid item xs={12} key={option._id}>
									<Button
										size="small"
										className={props.classes.changer}
										onClick={() =>
											props.joinRoom(option._id, option.owner.owner_id)
										}
									>
										<Typography
											component={"span"}
											style={{ fontSize: "12px", padding: "0" }}
										>
											<pre
												style={{
													fontFamily: "inherit",
													marginTop: "0",
													marginBottom: "0",
												}}
											>
												<strong style={{ marginBottom: "25px" }}>
													Room Owner:
												</strong>{" "}
												{option.owner.name}
												<br />
												<strong>Room Name:</strong> {option.name}
											</pre>
											<strong>Question:</strong> {option.question}
										</Typography>
									</Button>
								</Grid>
							);
					  })
					: null}
			</div>
		</div>
	) : (
		<div>
			<Grid item xs={12}>
				<TextField
					variant="outlined"
					margin="normal"
					id="name"
					label="Room Name"
					name="room"
					required
					autoComplete="off"
					value={props.roomVal}
					onChange={props.nameChanger}
					inputProps={{
						style: {
							color: "white",
						},
					}}
					InputLabelProps={{
						style: {
							color: "white",
							opacity: "0.5",
						},
					}}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					variant="outlined"
					margin="normal"
					id="name"
					required
					autoComplete="off"
					label="Question"
					name="question"
					value={props.questionVal}
					onChange={props.questionChanger}
					inputProps={{
						style: {
							color: "white",
						},
					}}
					InputLabelProps={{
						style: {
							color: "white",
							opacity: "0.5",
						},
					}}
				/>
			</Grid>
		</div>
	);
	return (
		<div>
			<form onSubmit={props.submitHandler}>
				<Grid container direction="column">
					{form}
				</Grid>
				<Grid container direction="column" alignItems="center">
					<Button
						size="small"
						onClick={props.changeForm}
						style={{ color: "white" }}
					>
						{props.joinForm ? "Create Room Instead?" : "Join Room Instead?"}
					</Button>
				</Grid>
				<Grid container direction="column" alignItems="center">
					{props.joinForm ? null : (
						<Button
							type="submit"
							variant="contained"
							color="default"
							className={props.classes.submit}
						>
							<b>Create Room</b>
						</Button>
					)}
				</Grid>
			</form>
		</div>
	);
};

export default RoomForm;
