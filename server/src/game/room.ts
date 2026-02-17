import { Board } from "./board";

const MAX_PLAYERS = 4;

class PlayerData
{
  id: string;
  chip: number;
}

export class Room
{
  private players = new Map<string, PlayerData>();
  private board = new Board();

  public addPlayer(id: string)
  {
    this.players.set(id, { id, chip: 1000000 });

    if (this.players.size >= 4) {
      this.board.startGame([...this.players.keys()]);
      // send data to client
    }
  }

  public onPlayCard(playerId: string, cardId: string)
  {
    
  }

  public hasPlayer(id: string)
  {
    return this.players.has(id);
  }

  public isFull()
  {
    return this.players.size >= MAX_PLAYERS;
  }

}
