import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { fetchRoom } from '@/util/network';

export default function JoinRoomModal() {
  const [roomId, setRoomId] = useState<string>();

  return (
    <View style={styles.container}>
      <Text>Room Id</Text>

    <TextInput
      onChangeText={(text) => setRoomId(text)}>
    </TextInput>

    <Button
      onPress={
        () => {
          if (roomId && validateRoomId(roomId)){
            fetchRoom(roomId)
              .then(response => {
                if (response["success"]) {
                  router.replace(`/room/${roomId}`);
                } else {
                  alert("room not found");
                }
              })
          } else {
            alert("Room ID must be 5 letters.");
          }
        }
      }
      title="Join" />
    </View>
  );
}

const validateRoomId = (roomId: string) => {
  if (roomId && roomId.trim().match("[a-zA-Z]{5}")) {
    return true;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});