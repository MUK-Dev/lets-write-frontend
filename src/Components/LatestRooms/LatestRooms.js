import React from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";

const LatestRooms = (props) => {
	return (
		<div>
			<h4>Latest Rooms</h4>
			<div className={props.classes.rooms}>
				{props.rooms.length === 0 ? (
					<p>No Recent Rooms</p>
				) : (
					props.rooms.slice(0, 10).map((room) => {
						return (
							<Grid item xs={12} key={room._id}>
								<Button
									size="small"
									className={props.classes.changer}
									onClick={() => props.joinRoom(room._id, room.owner.owner_id)}
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
