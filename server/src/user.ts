import { v4 as uuid } from "uuid";
import { Server } from "./server";
import { MessageDispatcher } from "./dispatcher";

export class User
{
  private id: string;
  private name: string;
  private ws: any;
  private server: Server;
  private dispatcher = new MessageDispatcher();

  constructor(ws: any, server: Server)
  {
    this.id = uuid();
    this.ws = ws;
    this.server = server;
    this.registerHandlers();
  }

  private registerHandlers(): void
  {
    this.dispatcher.register("name_change", this.changeName.bind(this));

    // Add more handlers as needed
  }

  public getId(): string
  {
    return this.id;
  }

  public send(message: any): void
  {
    this.ws.send(JSON.stringify(message));
  }

  // Dispatch incoming messages to the dispatcher
  public async dispatch(message: any): Promise<void>
  {
    await this.dispatcher.dispatch(message);
  }

  private async changeName(data: any): Promise<void>
  {
    if (data === undefined || data === null) return;
    if (typeof data.newName !== "string" || data.newName.trim() === "")
    {
      this.send({ type: "error", message: "Invalid name" });
      return;
    }
    this.name = data.newName;
    this.send({ type: "name_changed", name: this.name });
    console.log(`User ${this.id} changed name to ${this.name}`);
  }

  private async joinRoom(data: any): Promise<void>
  {
    if (data === undefined || data === null) return;
    if (typeof data.roomId !== "string" || data.roomId.trim() === "")
    {
      this.send({ type: "error", message: "Invalid room ID" });
      return;
    }
    this.server.joinRoom(this.id, data.roomId);
  }
}
