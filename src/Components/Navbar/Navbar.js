import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
	Drawer,
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Badge,
} from "@material-ui/core";
import { ChevronLeft, Menu, Notifications } from "@material-ui/icons";
import { connect } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		backgroundColor: "#37474f",
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: "none",
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: "hidden",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9),
		},
	},
	appBarSpacer: theme.mixins.toolbar,
	paper: {
		padding: theme.spacing(2),
		display: "flex",
		overflow: "auto",
		flexDirection: "column",
	},
	avatar: {
		maxHeight: "40px",
		maxWidth: "40px",
		borderRadius: "50%",
		display: "flex",
		margin: "0 auto 25px auto",
	},
	username: {
		textAlign: "center",
	},
}));

const Navbar = (props) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div>
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
						className={clsx(
							classes.menuButton,
							open && classes.menuButtonHidden
						)}
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
						Dashboard
					</Typography>
					<IconButton color="inherit">
						<Badge badgeContent={4} color="secondary">
							<Notifications />
						</Badge>
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}
				ModalProps={{ onBackdropClick: handleDrawerClose }}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeft />
					</IconButton>
				</div>
				<img src={props.avatar} alt="User Avatar" className={classes.avatar} />
				<Typography variant="h6" className={classes.username}>
					{props.username}
				</Typography>
				{/* <Button
					variant="contained"
					fullWidth
					color="default"
					className={classes.submit}
					onClick={this.logoutHandler}
				>
					Logout
				</Button> */}
			</Drawer>
		</div>
	);
};

const mapStateToProps = (state) => {
	if (state.currentUser) {
		return {
			userId: state.currentUser._id,
			username: state.currentUser.name,
			avatar: state.currentUser.avatar_url,
		};
	}
};

export default connect(mapStateToProps)(Navbar);
