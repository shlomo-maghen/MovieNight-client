import Room from "@/models/Room"
import MovieItem from "./MovieItem"
import { Pressable, ScrollView, StyleSheet, Text } from "react-native"
import { Link } from "expo-router"
import User from "@/models/User"
import RoomMovie from "@/models/RoomMovie"
import { useState } from "react"
import { addMovieToRoom, removeMovieFromRoom } from "@/util/network"

type MovieRoomProps = {
  room: Room,
  currentUser: User
}

type RoomMovies = Record<string, Set<User>>

export default function MovieRoom(props: MovieRoomProps) {
  const room = props.room
  const [roomMovies, setRoomMovies] = useState<RoomMovies>(constructRoomMovies(room.movies))

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
    <ScrollView>
      <Text style={styles.roomId}>Room ID: {room.id}</Text>
      {movieItems}
      <Link href={`/room/add-movie-modal/${room.id}`} asChild>
        <Pressable style={styles.addMovieButton}>
          <Text>Add movie</Text>
        </Pressable>
      </Link>
    </ScrollView>
  )
}


const createMovieItem = (
  movieId: string,
  users: User[],
  currentUser: User,
  currentRoomId: string,
  roomMovies: RoomMovies,
  setRoomMovies: (room: RoomMovies) => void,
) => {
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
            console.log(roomMovies[movieId])
            roomMovies[movieId].add(currentUser)
            console.log(roomMovies[movieId])
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