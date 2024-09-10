export const createRoom = () => {
  return fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/rooms", {
    method: "POST",
  })
  .then(response => response.json())
  .catch(error => {
    console.error(error);
  });
}