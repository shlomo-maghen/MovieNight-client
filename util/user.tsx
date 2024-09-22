import User from '@/models/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as crypto from 'expo-crypto';

const userIdKey = "USER_ID"
const userDisplayNameKey = "USER_DISPLAY_NAME"

export const getUser = async () : Promise<User> => {
  try {
    const userId = await AsyncStorage.getItem(userIdKey);
    const userDisplayName = await AsyncStorage.getItem(userDisplayNameKey);
    if (userId && userDisplayName) {
      return new User(userId, userDisplayName);
    }
  } catch(e) {
    console.log(e);
  }
  return new User("", "");
}

export const setUser = async (userDisplayName: string) => {
  try {
    const userId = crypto.randomUUID();
    await AsyncStorage.setItem(userIdKey, userId);
    await AsyncStorage.setItem(userDisplayNameKey, userDisplayName);
  } catch(e) {
    console.log(e);
  }
}

export const clearUser = async () => {
  try {
    await AsyncStorage.removeItem(userIdKey);
    await AsyncStorage.removeItem(userDisplayNameKey);
  } catch(e) {
    console.log(e);
  }
}