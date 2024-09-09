import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArtistPage = ({ artist, token }) => {
  const [artistDetails, setArtistDetails] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [albums, setAlbums] = useState([]);

  const [relatedArtists,setRelatedArtists]=useState([]);

  // API URLs
  const artistUrl = `https://api.spotify.com/v1/artists/${artist}`;
  const topTracksUrl = `https://api.spotify.com/v1/artists/${artist}/top-tracks?market=US`;
  const albumsUrl = `https://api.spotify.com/v1/artists/${artist}/albums`;
  

  useEffect(() => {
    // Fetch artist details
    const fetchArtistDetails = async () => {
      try {
        const artistResponse = await axios.get(artistUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setArtistDetails(artistResponse.data);
      } catch (error) {
        console.error('Error fetching artist details:', error);
      }
    };

    // Fetch top tracks
    const fetchTopTracks = async () => {
      try {
        const tracksResponse = await axios.get(topTracksUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTopTracks(tracksResponse.data.tracks || []);
      } catch (error) {
        console.error('Error fetching top tracks:', error);
      }
    };

    // Fetch artist's albums
    const fetchAlbums = async () => {
      try {
        const albumsResponse = await axios.get(albumsUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAlbums(albumsResponse.data.items || []);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    const fetchRelatedArtists = async () => {
        try {
          const res = await axios.get(`https://api.spotify.com/v1/artists/${artist}/related-artists`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setRelatedArtists(res.data.artists);
        } catch (error) {
          console.error("Error fetching related artists", error);
        }
      };

    fetchArtistDetails();
    fetchTopTracks();
    fetchAlbums();
   
    fetchRelatedArtists();
  }, [artist, token, albumsUrl, artistUrl,topTracksUrl]);

  if (!artistDetails) return <div>Loading...</div>;

  return (
    <div className=" main artist-page p-8">
      {/* Artist Details */}
      <div className="flex items-center w-4/5 p-40  pt-5 pb-2">
        <img
          src={artistDetails.images[0]?.url}
          alt="Artist"
          className="mr-6 rounded-full w-60"
        />
        <div>
          <h2 className="text-8xl font-extrabold">{artistDetails.name}</h2>
          <p className="text-gray-500">{artistDetails.followers.total.toLocaleString()} followers</p>
          <p className="text-gray-400 mt-2">Genres: {artistDetails.genres.join(', ')}</p>
        </div>
      </div>

      {/* Top Tracks */}
      <div className='sections-container'>
      <section className="top-tracks mt-9">
        <h3 className="text-4xl font-bold mb-4">Popular Tracks</h3>
        <div className="grid grid-cols-1 gap-4">
          {topTracks.map((track, index) => (
            <div key={index} className="track-item flex items-center p-4 bg-gray-900 rounded-md">
              <img
                src={track.album.images[0]?.url}
                alt={track.name}
                className="w-16 h-16 mr-4 rounded-md"
              />
              <div>
                <p className="text-lg font-semibold">{track.name}</p>
                <p className="text-gray-400">{track.album.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Albums */}
      <section className="albums mb-8 mt-9">
  <h3 className="text-4xl font-bold mb-4">Albums</h3>
  <div className="albums-container flex overflow-x-auto space-x-4">
    {albums.map((album, index) => (
      <div key={index} className="album-item min-w-[200px]">
        <img
          src={album.images[0]?.url}
          alt={album.name}
          className="w-full h-64 object-cover rounded-md"
        />
        <p className="text-lg font-semibold mt-2">{album.name}</p>
        <p className="text-gray-400">{album.release_date}</p>
      </div>
    ))}
  </div>
</section>

      {/* Featured Tracks */}
      <section className="related-artists mb-8">
  <h3 className="text-4xl font-bold mb-4">Related Artists</h3>
  <div className="artists-container flex overflow-x-auto space-x-4">
    {relatedArtists.map((artist, index) => (
      <div key={index} className="artist-item min-w-[200px]">
        <img
          src={artist.images[0]?.url}
          alt={artist.name}
          className="w-full h-64 object-cover rounded-full"
        />
        <p className="text-lg font-semibold mt-2 text-center">{artist.name}</p>
      </div>
    ))}
  </div>
</section>
      </div>
    </div>
  );
};

export default ArtistPage;
