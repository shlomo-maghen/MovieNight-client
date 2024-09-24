import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { fetchRoom } from '@/util/network';
import Room from '@/models/Room';
import { fromJson } from '@/models/RoomMovie';
import MovieRoom from '@/components/MovieRoom';
import { getUser } from '@/util/user';
import User from '@/models/User';


export default function RoomScreen() {
  const pollTime = 2000;
  const { id } = useLocalSearchParams<{ id: string }>();
  const [room, setRoom] = useState<Room>();
  const [currentUser, setCurrentUser] = useState<User | null>();

  useEffect(() => {
    getUser().then(user => { setCurrentUser(user) });
  }, [])


  const fetch = () => {
    fetchRoom(id)
      .then(response => {
        if (response["success"]) {
          console.log("fetch room success");
          setRoom(
            new Room(
              response["room_id"],
              response["movies"]
                .map(movieJson => fromJson(movieJson))));
        } else {
          alert("room not found");
          router.back();
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetch()
    const interval = setInterval(fetch, pollTime);
    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <View>
      {room && currentUser ?
        <MovieRoom room={room} currentUser={currentUser} /> :
        (<Text>Loading...</Text>)}
    </View>
  )
}

