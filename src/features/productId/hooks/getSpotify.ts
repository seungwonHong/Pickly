export default async function getSpotify(
  artistName: string,
  albumName: string,
  accessToken: string
) {
  const query = `album:${albumName} artist:${artistName}`;
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=album&limit=1`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const data = await res.json();
  if (data.albums?.items?.length > 0) {
    return data.albums.items[0].id;
  }
  return null;
}
