import React from "react";
import { TextField, Button, Grid, Typography, Grow } from "@material-ui/core";

const RoomForm = (props) => {
	const {
		classes,
		joinForm,
		roomVal,
		nameChanger,
		searchOptions,
		joinRoom,
		submitHandler,
		changeForm,
		questionVal,
		questionChanger,
	} = props;

	const form = joinForm ? (
		<div>
			{joinForm ? <p>Search Rooms by name</p> : null}

			<TextField
				variant="outlined"
				margin="normal"
				id="name"
				label="Room Name"
				name="room"
				autoComplete="off"
				value={roomVal}
				onChange={nameChanger}
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
			<div className={classes.searchedRooms}>
				{searchOptions.length > 0
					? searchOptions.map((option) => {
							return (
								<Grow in={true} key={option._id} timeout={1200}>
									<Grid item xs={12}>
										<Button
											size="small"
											className={classes.changer}
											onClick={() =>
												joinRoom(option._id, option.owner.owner_id)
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
								</Grow>
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
					value={roomVal}
					onChange={nameChanger}
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
					value={questionVal}
					onChange={questionChanger}
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
			<form onSubmit={submitHandler}>
				<Grid container direction="column">
					{form}
				</Grid>

				<Grid container direction="column" alignItems="center">
					<Grow in={true} timeout={1000}>
						<Button
							size="small"
							onClick={changeForm}
							style={{ color: "white" }}
						>
							{joinForm ? "Create Room Instead?" : "Join Room Instead?"}
						</Button>
					</Grow>
				</Grid>
				<Grid container direction="column" alignItems="center">
					{joinForm ? null : (
						<Grow in={true} timeout={1000}>
							<Button
								type="submit"
								variant="contained"
								color="default"
								className={classes.submit}
							>
								<b>Create Room</b>
							</Button>
						</Grow>
					)}
				</Grid>
			</form>
		</div>
	);
};

export default RoomForm;
