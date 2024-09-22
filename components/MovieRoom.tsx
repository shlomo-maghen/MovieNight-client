import Room from "@/models/Room"
import MovieItem from "./MovieItem"
import { Pressable, ScrollView, StyleSheet, Text } from "react-native"
import { Link } from "expo-router"
import User from "@/models/User"
import RoomMovie from "@/models/RoomMovie"

type MovieRoomProps = {
  room: Room,
  currentUser: User
}

export default function MovieRoom(props: MovieRoomProps) {
  const room = props.room
  const movies = sortedMovies(room.movies).map(([movieId, users]) =>
    <MovieItem
      key={movieId}
      title={movieId}
      usernames={Array.from(users).map((user: User) => user.displayName)}
      currentUser={props.currentUser} />
  )
  return (
    <ScrollView>
      <Text style={styles.roomId}>Room ID: {room.id}</Text>
      {movies}
      <Link href={`/room/add-movie-modal/${room.id}`} asChild>
        <Pressable style={styles.addMovieButton}>
          <Text>Add movie</Text>
        </Pressable>
      </Link>
    </ScrollView>
  )
}

const sortedMovies = (roomMovies: [RoomMovie]) => {
  let movies: Record<string, Set<User>> = {}
  for (const roomMovie of roomMovies) {
    const movieId = roomMovie.id
    if (!(movieId in movies)) {
      movies[movieId] = new Set()
    }
    if (!(movies[movieId].has(roomMovie.user))) {
      movies[movieId].add(roomMovie.user)
    }
  }

  return Object
    .entries(movies)
    .sort(
      (a, b) => {
        let compare = b[1].size - a[1].size;
        return (compare == 0) ? a[0].toLowerCase().localeCompare(b[0].toLowerCase()) : compare;
      }
    );
}

const styles = StyleSheet.create({
  roomId: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
    textAlign: "center"
  },
  addMovieButton: {
    paddingLeft: 16
  }
});