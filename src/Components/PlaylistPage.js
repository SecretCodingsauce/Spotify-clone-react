import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlaylistPage = ({ playlist,token }) => {
  const [playlistDetails, setPlaylistDetails] = useState(null);
  const [tracks, setTracks] = useState([]);
  
  // Spotify API URL for playlist details
  const playlistUrl = `https://api.spotify.com/v1/playlists/${playlist.id}`;

  useEffect(() => {
    // Fetch the playlist details and tracks
    const fetchPlaylist = async () => {
      try {
        const response = await axios.get(playlistUrl, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setPlaylistDetails(response.data);
        setTracks(response.data.tracks.items);  // Array of tracks in the playlist
      } catch (error) {
        console.error("Error fetching playlist data:", error);
      }
    };

    fetchPlaylist();
  }, [playlist, token,playlistUrl]);

  if (!playlistDetails) return <div>Loading...</div>;

  return (
    <div className=" main playlist-page p-8">
      {/* Playlist details */}
      <div className="playlist-header flex items-center mb-8">
        <img
          src={playlistDetails.images[0]?.url}
          alt="Playlist Cover"
          className="w-48 h-48 mr-6"
        />
        <div>
          <h2 className="text-4xl font-bold">{playlistDetails.name}</h2>
          <p className="text-gray-500">{playlistDetails.description}</p>
          <p className="text-gray-400 mt-2">
            {playlistDetails.owner.display_name} • {playlistDetails.tracks.total} songs
          </p>
        </div>
      </div>

      {/* Playlist Tracks */}
      <div className="playlist-tracks main">
        {tracks.map((trackItem, index) => {
          const track = trackItem.track;
          return (
            <div key={index} className="track-item flex items-center mb-4 p-4 rounded-md bg-gray-900">
              {/* Track Number */}
              <div className="track-number w-8 text-right pr-4 text-gray-400">{index + 1}</div>
              {/*Track Img */}
              <img className='w-15 rounded mr-4' src={track.album.images[track.album.images.length - 1]?.url} alt='' ></img>

              {/* Track Name */}
              <div className="track-details flex-grow">
                <h4 className="text-xl font-semibold">{track.name}</h4>
                <p className="text-gray-400">{track.artists.map(artist => artist.name).join(", ")}</p>
              </div>

              {/* Track Album */}
              <div className="track-album text-gray-400">{track.album.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlaylistPage;
