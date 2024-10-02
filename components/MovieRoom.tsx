import Room from "@/models/Room"
import MovieItem from "./MovieItem"
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { Link } from "expo-router"
import User from "@/models/User"
import RoomMovie from "@/models/RoomMovie"
import { ReactElement, useState } from "react"
import { addMovieToRoom, removeMovieFromRoom } from "@/util/network"
import MovieSearch from "./MovieSearch"

type MovieRoomProps = {
  room: Room,
  currentUser: User
}

type RoomMovies = Record<string, Set<User>>

export default function MovieRoom(props: MovieRoomProps) {
  const room = props.room;
  const [roomMovies, setRoomMovies] = useState<RoomMovies>(constructRoomMovies(room.movies));
  const [movieSearchMode, setMovieSearchMode] = useState(false);

  const sortedMovies =
    Object
      .entries(roomMovies)
      .sort(
        (a, b) => {
          let compare = b[1].size - a[1].size;
          return (compare == 0) ? a[0].toLowerCase().localeCompare(b[0].toLowerCase()) : compare;
        }
      );
  const movieItems = sortedMovies
    .map(([movieId, users]) =>
      createMovieItem(
        movieId,
        Array.from(users),
        props.currentUser,
        room.id,
        roomMovies,
        setRoomMovies))

  return (
    <View style={styles.container}>
      <ScrollView style={styles.movieList}>
        <Text style={styles.roomId}>Room ID: {room.id}</Text>
        {movieItems}
      </ScrollView>
      {movieSearchMode && <MovieSearch />}
      <Pressable onPress={() => setMovieSearchMode(!movieSearchMode)}>
        <Text style={styles.addMovieButton}>{movieSearchMode ? "Done" : "Choose a movie"}</Text>
      </Pressable>
    </View>
  )
}
const createMovieItem = (
  movieId: string,
  users: User[],
  currentUser: User,
  currentRoomId: string,
  roomMovies: RoomMovies,
  setRoomMovies: (room: RoomMovies) => void,
): ReactElement => {
  const displayNames: string[] = []
  const userIds: string[] = []
  users.map((user: User) => {
    displayNames.push(user.displayName);
    userIds.push(user.id);
  });
  const currentUserVoted = userIds.includes(currentUser.id);
  let voteAction: () => void
  if (currentUserVoted) {
    voteAction = () => {
      console.log("voting down")
      vote(currentRoomId, movieId, currentUser, VoteType.DOWN)
        .then((response) => {
          if (response["success"]) {
            let userToDelete = new User("", "");
            const userSet = roomMovies[movieId];
            for (const user of userSet) {
              if (user.id === currentUser.id) {
                userToDelete = user
              }
            }
            userSet.delete(userToDelete);
            setRoomMovies({ ...roomMovies })
          }
        });
    }
  } else {
    voteAction = () => {
      console.log("voting up")
      vote(currentRoomId, movieId, currentUser, VoteType.UP)
        .then((response) => {
          if (response["success"]) {
            roomMovies[movieId].add(currentUser)
            setRoomMovies({ ...roomMovies })
          }
        });
    }
  }
  return <MovieItem
    key={movieId}
    title={movieId}
    displayNames={displayNames}
    currentUserVoted={currentUserVoted}
    voteAction={voteAction} />
}

enum VoteType {
  UP, DOWN
}

const vote = async (roomId: string, movieId: string, user: User, voteType: VoteType) => {
  switch (voteType) {
    case VoteType.UP:
      return addMovieToRoom(roomId, movieId, user)
    case VoteType.DOWN:
      return removeMovieFromRoom(roomId, movieId, user)
  }
}

const constructRoomMovies = (roomMovieList: [RoomMovie]) => {
  let roomMovies: Record<string, Set<User>> = {}
  for (const roomMovie of roomMovieList) {
    const movieId = roomMovie.id
    if (!(movieId in roomMovies)) {
      roomMovies[movieId] = new Set()
    }
    if (!(roomMovies[movieId].has(roomMovie.user))) {
      roomMovies[movieId].add(roomMovie.user)
    }
  }

  return roomMovies
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "green"
  },
  roomId: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
    textAlign: "center"
  },
  movieList: {
    borderColor: "red",
    borderWidth: 1,
  },
  addMovieButton: {
    textAlign: "center",
    borderWidth: 1,
    padding: 16,
    color: "white",
    backgroundColor: "blue",
    justifyContent: "flex-end",
  },
  movieSearch: {
    borderWidth: 1,
  }
});