import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = async () => {
  try {
    const user = await AsyncStorage.getItem('username');
    return user;
  } catch(e) {
    console.log(e);
  }
  return "";
}

export const setUser = async (username: string) => {
  try {
    await AsyncStorage.setItem('username', username);
  } catch(e) {
    console.log(e);
  }
}

export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem('username');
  } catch(e) {
    console.log(e);
  }
}