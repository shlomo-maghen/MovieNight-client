import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { fetchRoom } from '@/util/network';
import Room from '@/models/Room';


export default function RoomScreen() {

  const { id } = useLocalSearchParams<{ id: string }>();
  const [room, setRoom] = useState<Room>();

  useEffect(() => {
    fetchRoom(id)
      .then(response => {
        if (response["success"]) {
          console.log("fetch room success");
          setRoom(new Room(response["room_id"], response["movies"]));
        } else {
          alert("room not found");
          router.back();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View>
      {room ? getJsx(room) : (<Text>Loading...</Text>)}
    </View>
  )
}

const getJsx = (room: Room) => {
  const movies = room.movies.map(movie => 
    <Text style={styles.movieItem} key={`${movie["movie_id"]}_${movie["user_id"]}`}>
      Movie ID: {movie["movie_id"]} added by {movie["user_id"]}
    </Text>
  )
  return (
    <>
      <Text style={styles.roomId}>Room id: {room.id}</Text>
      {movies}
    </>  
  )
}

const styles = StyleSheet.create({
  roomId: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
  },
  movieItem: {
    margin: 10
  },
});