import { NavLink, Outlet } from "react-router-dom"
import { useState } from "react"
import spotifylogo from "./img/icons8-spotify-144.png"
import userpicture from "./img/icons8-user-white.png"
import searchicon from "./img/icons8-magnifying-glass-50.png"

export default function NavLayout({ LOGIN, token, updateSearch, userData }) {

    const [searchKeylol, setSearchKeylol] = useState("")



    return (
        <>
            <nav id="nav" className="flex justify-between items-center bg-black text-white p-2 fixed w-full top-0 left-0 ">
                <NavLink to="/">
                    <div className="flex items-center">
                        <img className="icon" src={spotifylogo}></img>
                        <span className="font-semibold">Spotify</span>
                    </div>
                </NavLink>
                {token ? <div className="flex  w-2/5">
                    <input className="w-4/5 h-10 rounded rounded-r-none text-center text-gray-700" type="text" placeholder="search for songs,artists or playlists" onChange={e => setSearchKeylol(e.target.value)}></input>
                    <NavLink to="/" className="border-white border-2 rounded rounded-l-none" type="submit" onClick={() => updateSearch(searchKeylol)}><img className="w-5 m-2 " src={searchicon} alt="search"></img></NavLink>
                </div>
                    : <></>}

                {!token ? <div className="flex items-center">
                    <a className="flex items-center" href={LOGIN}>
                        <img className="icon" src={userpicture}></img>
                        <span>Login</span>
                    </a>
                </div>

                    : <NavLink to="userPage" className="flex items-center">

                        <img className="icon" src={userData?.images?.length > 0 ? userData.images[0].url : userpicture}></img>
                        <span>{userData.display_name}</span>
                    </NavLink>

                }

            </nav>
            {console.log(userData)}
            <main>
                <Outlet />
            </main>
        </>
    )
}

