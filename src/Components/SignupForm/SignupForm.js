import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const SignupForm = (props) => {
	return (
		<div>
			<div className={props.classes.paper}>
				<Avatar className={props.classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					{props.pageType ? "Register" : "Login"}
				</Typography>
				<form
					className={props.classes.form}
					onSubmit={
						props.pageType
							? props.registerSubmitHandler
							: props.loginSubmitHandler
					}
				>
					{props.pageType ? (
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
							value={props.nameVal}
							onChange={props.nameChanger}
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
						value={props.emailVal}
						onChange={props.emailChanger}
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
						value={props.passVal}
						onChange={props.passwordChanger}
					/>

					<Grid item>
						<Button size="small" onClick={props.changePage}>
							{props.pageType
								? "Login Instead?"
								: "Don't have an account? Sign Up"}
						</Button>
					</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="default"
						className={props.classes.submit}
					>
						{props.pageType ? "Register" : "Login"}
					</Button>
				</form>
			</div>
		</div>
	);
};

export default SignupForm;
