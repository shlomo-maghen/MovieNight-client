import { Link, router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Home() {
  initialSetup();

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => createRoom()}>
        <Text>Create a room</Text>
      </Pressable>
      <Link href="/join-room-modal" style={styles.button} asChild>
        <Pressable>
          <Text>Join a room</Text>
        </Pressable>
      </Link>
      <Link href="/room/XFAMU" style={styles.button} asChild>
        <Pressable>
          <Text>XFAMU</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const initialSetup = () => {
}

const createRoom = () => {
  console.log("creating a room...");
  fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/rooms", {
    method: "POST",
  })
  .then(response => response.json())
  .then(response => {
    console.log(response);
    if (response["success"]) {
      console.log("created room successfully");
      router.push(`/room/${response["room_id"]}`);
    }
  })
  .catch(error => {
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
  button: {
    width: 270,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  }
});
