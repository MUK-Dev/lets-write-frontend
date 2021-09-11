import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";

const SignupForm = (props) => {
	const {
		classes,
		pageType,
		registerSubmitHandler,
		loginSubmitHandler,
		nameVal,
		nameChanger,
		emailVal,
		emailChanger,
		passVal,
		passwordChanger,
		changePage,
	} = props;
	return (
		<div>
			<div className={classes.paper}>
				<Grow in timeout={1500}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
				</Grow>
				<Typography component="h1" variant="h5">
					{pageType ? "Register" : "Login"}
				</Typography>
				<form
					className={classes.form}
					onSubmit={pageType ? registerSubmitHandler : loginSubmitHandler}
				>
					{pageType ? (
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="name"
							label="Full Name"
							name="name"
							autoComplete="name"
							autoFocus
							value={nameVal}
							onChange={nameChanger}
						/>
					) : null}

					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={emailVal}
						onChange={emailChanger}
					/>

					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={passVal}
						onChange={passwordChanger}
					/>

					<Grid item>
						<Button size="small" onClick={changePage}>
							{pageType ? "Login Instead?" : "Don't have an account? Sign Up"}
						</Button>
					</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="default"
						className={classes.submit}
					>
						{pageType ? "Register" : "Login"}
					</Button>
				</form>
			</div>
		</div>
	);
};

export default SignupForm;
