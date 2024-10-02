import User from "./User";

export default class RoomMovie {
  id: string
  user: User
  constructor(id: string, user: User) {
    this.id = id;
    this.user = user;
  }
}

export type RoomMovieJson = {
  movie_id: string,
  user_id: string,
  user_display_name: string
}

export const fromJson = (json: RoomMovieJson): RoomMovie => {
  return new RoomMovie(json.movie_id, new User(json.user_id, json.user_display_name))
}
