import { WebSocketServer } from "ws";
import { User } from "./user";
import { Server } from "./server";

const wss = new WebSocketServer({ port: 2567 });
const server = new Server();

wss.on("connection", (ws) => {
  const user = new User(ws, server);
  server.addUser(user);
  console.log(`User connected: ${user.getId()}`);

  ws.on("message", async (data) => {
    console.log(`Received from ${user.getId()}: ${data}`);
    await user.dispatch(data);
  });

  ws.on("close", () => {
    console.log(`User ${user.getId()} disconnected`);
    server.removeUser(user.getId());
  });
});

console.log("Server running on ws://localhost:2567");
