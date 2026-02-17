import { RoomManager } from "./game/room-manager";
import { User } from "./user";

export class Server
{
  private roomManager = new RoomManager();
  private users = new Map<string, User>();

  public joinRoom(userId: string, roomId: string)
  {
    // todo implement
    const found = this.roomManager.addPlayer(roomId, userId);
    if (found !== undefined) {
      this.sendToUser(userId, { type: "joined_room", roomId });
    }
  }

  public sendToUser(userId: string, message: any): void
  {
    const user = this.users.get(userId);
    if (user !== undefined)
      user.send(message);
  } 
  
  public addUser(user: User): void
  {
    // todo chexk if user already exists
    this.users.set(user.getId(), user);
  }

  public removeUser(userId: string): void
  {
    if (this.users.has(userId))
    {
      this.users.delete(userId);
    }
  }
}