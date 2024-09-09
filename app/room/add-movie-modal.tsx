import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { addMovieToRoom } from '@/util/network';
import { router } from 'expo-router';

export default function AddMovieModal() {
  const [movieId, setMovieId] = useState("");

  const add = () => {
    addMovieToRoom("XFAMU", movieId, "3")
      .then(response => {
        if(response["success"]) {
          alert("added");
          router.back();
        }
      })
  }

  return (
    <View style={styles.container}>
      <Text>Movie Id</Text>

      <TextInput
        onChangeText={(text) => setMovieId(text)}>
      </TextInput>

      <Pressable onPress={add}>
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