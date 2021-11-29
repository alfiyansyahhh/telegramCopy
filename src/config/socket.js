import { io } from "socket.io-client";
const socket = io("https://backendtele.herokuapp.com")

export default socket;