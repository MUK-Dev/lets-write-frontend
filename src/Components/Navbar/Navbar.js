import React, { useEffect } from "react";
import clsx from "clsx";
import {
	Drawer,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Button,
} from "@material-ui/core";
import { ChevronLeft, Menu } from "@material-ui/icons";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { socket } from "../../feathers-client";

import BubbleBackground from "../BubbleBackground/BubbleBackground";
import styles from "../../Styles/Navbar-Styles";

const useStyles = styles;

const Navbar = (props) => {
	const { user_Id, username, avatar } = props;
	const classes = useStyles();

	const history = useHistory();

	const { id } = useParams();

	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		socket.on("leaveMessage", ({ joined, userId }) => {
			if (!joined) {
				if (userId === user_Id) {
					history.replace("/main");
				}
			}
		});
	}, [history, user_Id]);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const leaveRoomHandler = () => {
		socket.emit("leaveRoom", {
			username: username,
			userId: user_Id,
			roomId: id,
		});
	};

	const appbar = (
		<AppBar
			position="absolute"
			className={clsx(classes.appBar, open && classes.appBarShift)}
		>
			<Toolbar className={classes.toolbar}>
				<IconButton
					edge="start"
					color="inherit"
					aria-label="open drawer"
					onClick={handleDrawerOpen}
					className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
				>
					<Menu />
				</IconButton>
				<Typography
					component="h1"
					variant="h6"
					color="inherit"
					noWrap
					className={classes.title}
				>
					{history.location.pathname.includes("/admin")
						? "Room Admin Panel"
						: "Student Test Portal"}
				</Typography>
				{/* something on the side of the navbar */}
				{/* <IconButton color="inherit">
      <Badge badgeContent={4} color="secondary">
        <Notifications />
      </Badge>
    </IconButton> */}
			</Toolbar>
		</AppBar>
	);

	const closeButton = (
		<div className={classes.toolbarIcon}>
			<IconButton onClick={handleDrawerClose}>
				<ChevronLeft color="secondary" />
			</IconButton>
		</div>
	);

	const avatarImage = (
		<img src={avatar} alt="User Avatar" className={classes.avatar} />
	);

	const leaveButton = (
		<Button
			variant="contained"
			fullWidth
			color="secondary"
			className={classes.submit}
			onClick={leaveRoomHandler}
		>
			Leave Room
		</Button>
	);

	const drawer = (
		<Drawer
			classes={{
				paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
			}}
			open={open}
			onClose={handleDrawerClose}
		>
			{closeButton}

			{avatarImage}
			<Typography variant="h6" className={classes.username}>
				{username}
			</Typography>
			{leaveButton}
			<BubbleBackground />
		</Drawer>
	);

	return (
		<div>
			{appbar}
			{drawer}
		</div>
	);
};

const mapStateToProps = (state) => {
	if (state.currentUser) {
		return {
			user_Id: state.currentUser._id,
			username: state.currentUser.name,
			avatar: state.currentUser.avatar_url,
		};
	}
};

export default connect(mapStateToProps)(Navbar);
