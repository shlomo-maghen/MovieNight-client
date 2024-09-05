export default class Room {
  id: string;
  movies: []
  constructor(id: string, movies: []) {
    this.id = id;
    this.movies = movies;
  }
}
