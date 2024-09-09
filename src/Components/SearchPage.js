import { useState, useEffect } from "react";

export default function SearchPage({ searchData }) {
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  // useEffect to update state based on searchData
  useEffect(() => {
    if (searchData) {
      setArtists(searchData.artists.items || []);
      setAlbums(searchData.albums.items || []);
      setPlaylists(searchData.playlists.items || []);
      setTracks(searchData.tracks.items || []);
    }
  }, [searchData]); // Added dependency on searchData to avoid unnecessary re-renders

  return (
    <div className="p-8 main">
       <div className="mb-8">
  <h2 className="text-4xl font-bold mb-4">Tracks</h2>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    {tracks.map((track) => (
      <div key={track.id} className="track-item flex items-center mb-4 p-4 rounded-md bg-gray-900">
        <img
          src={track.album?.images[0]?.url || "/default-image.jpg"}
          alt={track.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="ml-4">
          <p className="text-lg font-semibold">{track.name}</p>
          <p className="text-sm text-gray-500">
            {track.artists.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
      {/* Artists Section */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-4">Artists</h2>
        <div className="flex overflow-x-auto space-x-4">
          {artists.map((artist) => (
            <div key={artist.id} className="min-w-[150px] text-center">
              <img
                src={artist.images[0]?.url || "/default-image.jpg"}
                alt={artist.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="mt-2 text-lg">{artist.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Albums Section */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-4">Albums</h2>
        <div className="flex overflow-x-auto space-x-4">
          {albums.map((album) => (
            <div key={album.id} className="min-w-[150px] text-center">
              <img
                src={album.images[0]?.url || "/default-image.jpg"}
                alt={album.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="mt-2 text-lg">{album.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Playlists Section */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-4">Playlists</h2>
        <div className="flex overflow-x-auto space-x-4">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="min-w-[150px] text-center">
              <img
                src={playlist.images[0]?.url || "/default-image.jpg"}
                alt={playlist.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <p className="mt-2 text-lg">{playlist.name}</p>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
}
