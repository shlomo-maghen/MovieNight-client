export default class Movie {
  title: string
  user: string
  constructor(title: string, user: string) {
    this.title = title;
    this.user = user;
  }
}

export const fromJson = (json: {movie_id: string, user_id: string}) : Movie => {
  return new Movie(json.movie_id, json.user_id)
}
