import React from "react";
import { Grid, Typography, Button, Fade } from "@material-ui/core";

import BubbleBackground from "../BubbleBackground/BubbleBackground";

const MainNavigation = (props) => {
	const { classes, avatar, username, logout } = props;
	return (
		<Fade in={true} timeout={1200}>
			<Grid item xs={3} sm={2} className={classes.navigation} elvation={5}>
				<img src={avatar} alt="User Avatar" className={classes.avatar} />
				<Typography variant="h6" className={classes.username}>
					{username}
				</Typography>
				<Button
					variant="contained"
					fullWidth
					color="default"
					className={classes.submit}
					onClick={logout}
				>
					Logout
				</Button>
				<BubbleBackground />
			</Grid>
		</Fade>
	);
};

export default MainNavigation;
