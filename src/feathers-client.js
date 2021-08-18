import io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import authentication from "@feathersjs/authentication-client";

export const socket = io("http://localhost:3030", {
	transports: ["websocket"],
	forceNew: true,
});
const client = feathers();

client.configure(socketio(socket));
client.configure(authentication());

export default client;
