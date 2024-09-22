import Room from "@/models/Room"
import MovieItem from "./MovieItem"
import { Pressable, ScrollView, StyleSheet, Text } from "react-native"
import { Link } from "expo-router"

type MovieRoomProps = {
  room: Room,
  currentUser: string
}

export default function MovieRoom(props: MovieRoomProps) {
  const room = props.room
  const movies = room.movies.map(movie =>
    <MovieItem
      key={`${movie.title}_${movie.user}`}
      title={movie.title}
      userId={movie.user}
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