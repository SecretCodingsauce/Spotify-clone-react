import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import './App.css';
import NavLayout from "./Components/NavLayout";
import Homepage from "./Components/Homepage";
import UserPage from "./Components/UserPage";
import PlaylistPage from "./Components/PlaylistPage";
import ArtistPage from "./Components/ArtistPage";
import SearchPage from "./Components/SearchPage";


function App() {
    const CLIENT_ID = "2bd8f6e14bec48d69ff47a3e2e84d6cb"
    const REDIRECT_URI = "http://localhost:3000/"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const LOGIN = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=user-follow-read&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`
    const currentUserAddress = "https://api.spotify.com/v1/me"

    const [token, setToken] = useState("")
    const [userData, setUserData] = useState([])
    const [searchData, setSearchData] = useState(null)
    const [userPlaylists, setUserPlaylists] = useState(null)
    const [userFollowing, setUserFollowing] = useState(null)
    const [playlist,setPlaylist]=useState([])
    const [artist,setArtist]=useState("")
    const [search, setSearch] = useState({
        searchButtonClicked: false,
        searchKey: ""
    })



    const updateSearch = (lol) => {
        setSearch((prev) => ({
            ...prev,
            searchKey: lol,
            searchButtonClicked: true
        })
        )
    }

    const updateToken = (lol) => {
        setToken(lol)
    }

    const updatePlaylist=(lol)=>{

        setPlaylist(lol)

    }

    const updateArtist=(lol)=>{
        setArtist(lol)
    }



    useEffect(() => {
        const hash = window.location.hash
        console.log(hash)
        let token1 = window.localStorage.getItem("token")

        // getToken()


        if (!token1 && hash) {
            token1 = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
             window.localStorage.setItem("token", token1)
             window.location.hash = "";
        }

        setToken(token1)

    }, [])

    useEffect(() => {
        if (!token) return; // Exit if token is not yet set
    
        // Fetch current user data
        axios.get(currentUserAddress, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setUserData(res.data);
                localStorage.setItem('followersCount', res.data.followers.total);
            })
            .catch((err) => console.error(err));
    
        // Fetch user playlists
        axios.get(currentUserAddress + "/playlists", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                const playlistData = res.data;
                setUserPlaylists(playlistData);
                localStorage.setItem('playlistData', playlistData);
            })
            .catch((err) => console.error(err));
    
        // Fetch following artists
        axios.get('https://api.spotify.com/v1/me/following', {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                type: "artist",
            }
        })
            .then((res) => {
                const artistsData = res.data.artists;
                localStorage.setItem('followedArtistsCount', artistsData);
                setUserFollowing(artistsData);
            })
            .catch((err) => console.error(err));
    
        // Search for artists or tracks based on the search query
        if (search.searchButtonClicked && token) {
            axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    q: search.searchKey,
                    type: "artist,track,playlist,album",
                }
            })
                .then((res) => { setSearchData(res.data); })
                .catch(err => console.error(err));
        }
    
    }, [token, search]);

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<NavLayout token={token} LOGIN={LOGIN} updateSearch={updateSearch} userData={userData} />}>
                <Route path="/" element={<Homepage token={token} updateToken={updateToken} searchData={searchData} updateSearch={updateSearch} LOGIN={LOGIN} updatePlaylist={updatePlaylist} updateArtist={updateArtist}/>} />
                <Route path="userPage" element={<UserPage userData={userData} updateToken={updateToken} userPlaylists={userPlaylists} userFollowing={userFollowing} updatePlaylist={updatePlaylist} updateArtist={updateArtist}/>}/>
                <Route path="playlistPage" element={<PlaylistPage playlist={playlist} token={token} updateArtist={updateArtist}/>}/>
                <Route path="ArtistPage" element={<ArtistPage updatePlaylist={updatePlaylist} artist={artist} token={token}/>} />
                <Route path="SearchPage" element={<SearchPage token={token} searchData={searchData} updatePlaylist={updatePlaylist} updateArtist={updateArtist}/>}/>

                
            </Route>

            
        )
    )

    return (
        <div>

            <RouterProvider router={router} />
        </div>
    );
}

export default App;

