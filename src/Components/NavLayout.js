import { NavLink,Outlet } from "react-router-dom"

import spotifylogo from "./img/icons8-spotify-144.png"
import userpicture from "./img/icons8-user-white.png"
import searchicon from "./img/icons8-magnifying-glass-50.png"

export default function NavLayout({LOGIN,token}) {

    const search =()=>{
        console.log("lol")
    }

    return(
    <>
    <nav className="flex justify-between items-center bg-black text-white p-5 ">
    <NavLink to="/">
        <div className="flex items-center">
            <img className="icon" src={spotifylogo}></img>
           <span className="font-semibold">Spotify</span>      
        </div>
    </NavLink>
    {token ?<div className="flex  w-2/5">
            <input className="w-4/5 h-10 rounded rounded-r-none text-center" type="text" placeholder="search for songs,artists or playlists"></input>
            <button className="border-white border-2 rounded rounded-l-none" type="submit" onClick={search}><img className="w-5 m-2 " src={searchicon} alt="search"></img></button>
    </div>
    : <>lol</>  }

{!token? <div className="flex items-center">
    <a href={LOGIN}>
<img className="icon" src={userpicture}></img>
<span>Login</span>
</a>  
</div>

: <div className="flex items-center">
<img className="icon" src={userpicture}></img>
<span>username</span>  
</div>

}

    </nav>

    <main>
        <Outlet />
    </main>
    </>
)}

