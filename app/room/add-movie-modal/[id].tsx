import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { addMovieToRoom } from '@/util/network';
import { router, useLocalSearchParams } from 'expo-router';
import { getUser } from '@/util/user';

export default function AddMovieModal() {

  const { id } = useLocalSearchParams<{ id: string }>();

  const [movieId, setMovieId] = useState("");

  const addMovie = () => {
    getUser()
      .then(user => {
        if (!user) {
          return
        }
        addMovieToRoom(id, movieId, user)
          .then(response => {
            console.log(response)
            if (response["success"]) {
              router.navigate(`/room/${id}`);
            }
          })
          .catch(e => console.log(e))
      });

  }

  return (
    <View style={styles.container}>
      <Text>Movie Id</Text>

      <TextInput
        onChangeText={(text) => setMovieId(text)}>
      </TextInput>

      <Pressable onPress={addMovie}>
        <Text>Add</Text>
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
});