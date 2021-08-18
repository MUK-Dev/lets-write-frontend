import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";

import app from "../../feathers-client";

const YourRooms = (props) => {
	const [rooms, getRooms] = useState([]);
	useEffect(() => {
		app
			.service("rooms")
			.find({
				query: {
					"owner.owner_id": props.userId,
				},
			})
			.then((res) => {
				if (res.data.length > 0) {
					getRooms(res.data);
				} else {
					getRooms("No Rooms Yet");
				}
			})
			.catch((err) => {});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div>
			<h4>Your Rooms</h4>
			<div className={props.classes.rooms}>
				{typeof rooms === "string" ? (
					<p>{rooms}</p>
				) : (
					rooms.map((room) => {
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

const mapStateToProps = (state) => {
	if (state.currentUser) {
		return {
			userId: state.currentUser._id,
		};
	}
};

export default connect(mapStateToProps)(YourRooms);
