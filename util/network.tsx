export const fetchRoom = async (id: string) => {
  let url = process.env.EXPO_PUBLIC_BACKEND_URL + "/rooms/" + id.toUpperCase();
  const response = await fetch(url);
  return await response.json();
}

export const createRoom = async () => {
  return await fetch(process.env.EXPO_PUBLIC_BACKEND_URL + "/rooms", {
    method: "POST",
  })
  .then(response => response.json())
  .catch(error => {
    console.error(error);
  });
}

export const addMovieToRoom = async (roomId: string, movieId: string, userId: string) => {
  let url = process.env.EXPO_PUBLIC_BACKEND_URL + "/room_movie/";
  const body = JSON.stringify({
    room_id: roomId,
    movie_id: movieId,
    user_id: userId,
  })
  const response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: body
  });
  return await response.json();
}