import { getUser } from '@/util/user';
import { StrictMode, useEffect, useState } from 'react';
import { StyleSheet, View } from "react-native";
import Register from './register';
import Main from './main';

export default function Home() {
  const [username, setUsername] = useState<string | null>();

  getUser().then(username => setUsername(username));

  return (
    <View style={styles.container}>
      {username ? <Main /> : <Register />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#347',
    flex: 1,
    justifyContent: 'center',
  },
});
