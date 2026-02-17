import { v4 as uuid } from "uuid";
import { Room } from "./room";

export class RoomManager
{
  private rooms: Room[] = [];

  public addPlayer(x: string, y: string): string | undefined
  {
    // todo assign player to room
    return undefined;
  }

  private assignToRoom(playerId: string)
  {
    // let room = this.rooms.find(r => !r.isFull());

    // if (!room) {
    //   room = new Room();
    //   this.rooms.push(room);
    // }

    // room.addPlayer(playerId, this.players.get(playerId));
  }
}
