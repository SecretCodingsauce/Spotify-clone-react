import { NavLink,Outlet } from "react-router-dom"

import spotifylogo from "./img/icons8-spotify-144.png"
import userpicture from "./img/icons8-user-100.png"

export default function NavLayout({LOGIN,token}) {

    const search =()=>{
        console.log("lol")
    }

    return(
    <>
    <nav>
    <NavLink to="/">
        <div>
            <img src={spotifylogo}></img>
           <span>Spotify</span>      
        </div>
    </NavLink>
    {token ?<div className="searchbar">
            <input type="text" placeholder="search for songs,artists or playlists"></input>
            <button type="submit" onClick={search}>search</button>
    </div>
    : <>lol</>  }

{!token? <div className="profile-thumbnail">
    <a href={LOGIN}>
<img src={userpicture}></img>
<span>Login</span>
</a>  
</div>

: <div className="profile-thumbnail">
<img src={userpicture}></img>
<span>username</span>  
</div>

}

    </nav>

    <main>
        <Outlet />
    </main>
    </>
)}

