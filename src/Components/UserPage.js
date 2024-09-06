import { NavLink } from "react-router-dom"
import userpicture from "./img/icons8-user-white.png"
import { useEffect, useState } from "react"

export default function UserPage({ userData, updateToken, userPlaylists, userFollowing }) {



const [playlists,setPlaylists]=useState([])
const [following,setFollowing]=useState([])


useEffect(()=>{
    if(userPlaylists){
        setPlaylists(userPlaylists.items)
    }

    if(userFollowing){
        setFollowing(userFollowing.items)
    }
},[userFollowing,userPlaylists])




    const logout = () => {
        updateToken("")
        window.localStorage.removeItem("token")

    }

    return (
        <div className="flex-col min-h-screen">
            <div className="main flex-1 min-h-screen">
                <div className="flex justify-center w-screen h-1/6 ">
                    <div className="flex items-center w-4/5 p-40 pl-0 pt-5 pb-2 ">
                        <img className="rounded-full w-60" alt="profile" src={userData?.images?.length > 0 ? userData.images[1].url : userpicture}></img>
                        <div>
                            <p className=" text-8xl font-extrabold pl-8 font-sans">{userData.display_name}</p>
                            <p className="pl-8 mt-4">{userPlaylists?.total} playlists. {userData.followers?.total} followers. {userFollowing?.total} following</p>
                        </div>
                    </div>

                    <div className=" mt-7"><NavLink className="button" to="/" onClick={logout}>Logout</NavLink></div>
                </div>
                <div className="mt-5">
                    <h2 className="text-4xl font-bold">Public Playlists</h2>
                    <div className="flex mt-5">   
                      {playlists.map((playlist)=>(
                        <div className="ml-7 " key={playlist.id}>
                                <img src={playlist.images[0]?.url} alt={playlist.name} className="w-44 rounded-md" />
                                <h2>{playlist.name}</h2>
                                <p className="text-sm">by {playlist.owner?.display_name}</p>
                        </div>
                      ))}  
                    </div>
                <div className="mt-5">
                    <h2 className="text-4xl font-bold">Following</h2>
                    <div className="flex mt-5">   
                      {following.map((artist)=>(
                        <div className="ml-7 " key={artist.id}>
                                <img  src={artist.images[0]?.url} alt={artist.name} className="w-44 rounded-md" />
                                <h2>{artist.name}</h2>
                                
                        </div>
                      ))}  
                    </div>


                </div>
                <footer className=" mt-9 bg-black">
                    <h1 className="text-sm">This is a clone of Spotify, designed and coded by me, <b>Ayushman Sharma</b> using their free API and React.</h1>
                    <span className="text-sm">Check me out <a className="text-blue-800 underline font-semibold" href='https://ayushmansharma-profile.vercel.app/' rel="noreferrer" target='_blank'>here!</a></span>
                </footer>
            </div>

</div>
        </div>
        
    )
}