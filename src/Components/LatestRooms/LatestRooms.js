import React from "react";
import { Box, Button, Grid, Typography, Grow } from "@material-ui/core";

const LatestRooms = (props) => {
	const { classes, rooms, joinRoom } = props;
	return (
		<div>
			<Grow in={true} timeout={1000}>
				<h4>Latest Rooms</h4>
			</Grow>
			<div className={classes.rooms}>
				{rooms.length === 0 ? (
					<Grow in={true} timeout={1500}>
						<p>No Recent Rooms</p>
					</Grow>
				) : (
					rooms.slice(0, 10).map((room) => {
						return (
							<Grow
								in={true}
								timeout={1500}
								key={room._id}
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

export default LatestRooms;
