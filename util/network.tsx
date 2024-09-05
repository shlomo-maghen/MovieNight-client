export const fetchRoom = async (id: string) => {
  let url = process.env.EXPO_PUBLIC_BACKEND_URL + "/rooms/" + id.toUpperCase();
  const response = await fetch(url);
  return await response.json();
}