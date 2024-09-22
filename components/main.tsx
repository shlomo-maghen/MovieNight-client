import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { clearUser } from '@/util/user';
import { createRoom } from '@/util/network';

export default function Main() {

  return (
    <View style={styles.container}>
      <Pressable style={styles.button}
        onPress={
          () => {
            createRoom()
              .then(response => { router.push(`/room/${response["room_id"]}`) })
          }
        }>
        <Text>Create a room</Text>
      </Pressable>
      <Link href="/join-room-modal" style={styles.button} asChild>
        <Pressable>
          <Text>Join a room</Text>
        </Pressable>
      </Link>
      <Link href="/room/WBAKM" style={styles.button} asChild>
        <Pressable>
          <Text>WBAKM</Text>
        </Pressable>
      </Link>
      <Pressable
        style={styles.button}
        onPress={
          () => {
            clearUser();
            router.navigate("/")
          }
        }>
        <Text>clear user</Text>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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