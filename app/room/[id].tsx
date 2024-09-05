import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { fetchRoom } from '@/util/network';
import Room from '@/models/Room';


export default function RoomScreen() {

  const { id } = useLocalSearchParams<{ id: string }>();
  const [room, setRoom] = useState<Room>();

  useEffect(() => {
    fetchRoom(id)
      .then(response => {
        if (response["success"]) {
          setRoom(new Room(response["room_id"]));
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
  return (<Text>Room id: {room.id}</Text>)
}