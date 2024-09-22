import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { setUser } from '@/util/user';

export default function Register() {
  const [username, setUsername] = useState<string>();

  return (
    <View style={styles.container}>
      <Text>Display name: </Text>

    <TextInput
      onChangeText={text => setUsername(text.trim())}>
    </TextInput>

    <Button
      onPress={
        () => {
          if (username && validateUsername(username)){
            setUser(username)
              .then(() => {
                router.navigate("/");
              })
          } else {
            alert("Name cannot be blank.");
          }
        }
      }
      title="Set" />
    </View>
  );
}

const validateUsername = (username: string) => {
  if (username && username.trim().length != 0) {
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