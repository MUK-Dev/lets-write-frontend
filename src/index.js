import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import { Provider } from "react-redux";

import { store } from "./store";
import Main from "./pages/Main/Main";
import Signup from "./pages/Signup/Signup";
import Layout from "./pages/Main/Layout/Layout";
import RoomAdmin from "./pages/Main/RoomAdmin/RoomAdmin";
import RoomStudent from "./pages/Main/RoomStudent/RoomStudent";
import Error404 from "./pages/Error404/Error404";

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<App>
					<Switch>
						<Route path="/" exact component={Signup} />
						<Route path="/main" exact component={Main} />
						<Route path="/main/:id">
							<Layout>
								<Switch>
									<Route exact path="/main/:id/admin" component={RoomAdmin} />

									<Route path="/main/:id" exact component={RoomStudent} />
								</Switch>
							</Layout>
						</Route>
						<Route component={Error404} />
					</Switch>
				</App>
			</Switch>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
