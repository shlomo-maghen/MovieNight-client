import RoomMovie from "./RoomMovie";

export default class Room {
  id: string;
  movies: [RoomMovie]
  constructor(id: string, movies: [RoomMovie]) {
    this.id = id;
    this.movies = movies;
  }
}
