import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { fetchRoom } from '@/util/network';
import JoinedRoom from '@/components/JoinedRoom';


export default function RoomScreen() {

  const { id } = useLocalSearchParams<{id: string}>();
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    fetchRoom(id)
    .then(response => {
      if (response["success"]) {
        console.log("123");
        setRoomId(response["room_id"])
      } else {
        alert("room not found");
        router.back();
      }
    })
    .catch(error => {
      console.log(error);
    });
  });
  
  return(
    <View>
      <JoinedRoom id={roomId} />
    </View>
  )
}
