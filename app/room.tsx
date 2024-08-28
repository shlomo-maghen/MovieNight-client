import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

class Room {
  roomId: string;

  constructor(roomId: string) {
    this.roomId = roomId;
  }
}

export default function RoomScreen() {

  const [roomId, setRoomId] = useState("");
  const [room, setRoom] = useState(null);

  if (room) {
    return (
      <View style={styles.container}>
        <Text>You are in room { roomId } </Text>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text>Room Id</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setRoomId(text)}>
        </TextInput>
        <Button
          onPress={() => setRoom(fetchRoom(roomId))}
          title="Join" />
      </View>
    );
  }
}

const validateRoomId = (roomId: string) => {
  if (roomId && roomId.match("[a-zA-Z]{5}")) {
    return true;
  }
}

const fetchRoom = (roomId: string): Room => {
  if (validateRoomId(roomId)) {
    return new Room(roomId)
  } else {
    alert("Room ID must be 5 letters.");
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#347',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  input: {
    backgroundColor: "white"
  }
})