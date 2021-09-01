import io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import authentication from "@feathersjs/authentication-client";

import serverIP from "./serverIP";

export const socket = io(`${serverIP}3030`, {
	transports: ["websocket"],
	forceNew: true,
});
const client = feathers();

client.configure(socketio(socket));
client.configure(authentication());

export default client;
