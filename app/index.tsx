import { Link } from 'expo-router';
import { Button, StyleSheet, Text, View } from "react-native";

export default function Home() {
  initialSetup();
  
  return (
    <View style={styles.container}>
      <Button title="Create a room" onPress={() => createRoom()} />
      <Link href="/room" asChild>
        <Button title="Join a room" />
      </Link>
    </View>
  );
}

const initialSetup = () => {
}

const createRoom = () => {
  fetch("localhost:8000/rooms", {
    method: "POST",
  }).catch(error => {
    console.error(error);
  });
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#347',
    flex: 1,
    justifyContent: 'center',
  },
});