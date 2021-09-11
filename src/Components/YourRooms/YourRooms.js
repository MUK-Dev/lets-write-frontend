import React from "react";
import { Box, Button, Grid, Typography, Grow } from "@material-ui/core";
import { connect } from "react-redux";

const YourRooms = (props) => {
	const { classes, rooms, joinRoom } = props;

	return (
		<div>
			<Grow in={true} timeout={1000}>
				<h4>Your Rooms</h4>
			</Grow>
			<div className={classes.rooms}>
				{rooms.length === 0 ? (
					<Box>
						<Grow in={true} timeout={1500}>
							<Typography variant="body2">
								You Haven't Made Any Rooms Yet
							</Typography>
						</Grow>
						<br />
						<br />
						<Grow in={true} timeout={1500}>
							<Typography variant="body2">
								Click The <b>CREATE ROOM INSTEAD?</b> Buttom On the Top
							</Typography>
						</Grow>
					</Box>
				) : (
					rooms.map((room) => {
						return (
							<Grow
								key={room._id}
								in={true}
								timeout={1500}
								disableStrictModeCompat
							>
								<Grid item xs={12}>
									<Button
										size="small"
										className={classes.changer}
										onClick={() => joinRoom(room._id, room.owner.owner_id)}
									>
										<Typography
											component={"span"}
											style={{ fontSize: "12px", padding: "0" }}
										>
											<pre style={{ fontFamily: "inherit", marginTop: "0" }}>
												<strong>Room Name:</strong> {room.name}
											</pre>
											<strong>Question:</strong> {room.question}
										</Typography>
									</Button>
								</Grid>
							</Grow>
						);
					})
				)}
				<Box display={{ xs: "block", sm: "block", md: "none" }}>
					<hr style={{ width: "250px", opacity: "0.5" }} />
				</Box>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	if (state.currentUser) {
		return {
			userId: state.currentUser._id,
		};
	}
};

export default connect(mapStateToProps)(YourRooms);
