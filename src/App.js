import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import './App.css';
import NavLayout from "./Components/NavLayout";
import Homepage from "./Components/Homepage";
import UserPage from "./Components/UserPage";


function App() {
    const CLIENT_ID = "2bd8f6e14bec48d69ff47a3e2e84d6cb"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const LOGIN = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`
    const currentUserAddress = "https://api.spotify.com/v1/me"

    const [token, setToken] = useState("")
    const [userData, setUserData] = useState([])
    const [searchData, setSearchData] = useState(null)

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



    useEffect(() => {
        const hash = window.location.hash
        let token1 = window.localStorage.getItem("token")

        // getToken()


        if (!token1 && hash) {
            token1 = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token1)
        }

        setToken(token1)

    }, [])

    useEffect(() => {
        axios.get(currentUserAddress, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(
                (res) => {
                    setUserData(res.data);
                }
            ).catch((err) => console.error(err))
    }, [token])

    useEffect(() => {

        axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: search.searchKey,
                type: "artist,track",

            }
        })
            .then((res) => { setSearchData(res.data) })
            .catch(err => console.error(err))

    }, [search, token])


    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<NavLayout token={token} LOGIN={LOGIN} updateSearch={updateSearch} userData={userData} />}>
                <Route path="/" element={<Homepage token={token} updateToken={updateToken} searchData={searchData} updateSearch={updateSearch} LOGIN={LOGIN} />} />
                <Route path="userPage" element={<UserPage userData={userData} updateToken={updateToken} />} />
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

