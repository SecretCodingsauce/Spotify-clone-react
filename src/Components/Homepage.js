import { useEffect, useState } from "react"


function Homepage({LOGIN,token,updateToken,searchData,updateSearch}) {

   const [searchKeylol,setSearchKeylol]=useState("")
    const [artists,setArtists]=useState([])
   
  useEffect(()=>{
    if(searchData){
    setArtists(searchData.artists.items)
  }},[updateSearch,searchData])
  
   


    const logout = () => {
        updateToken("")
        window.localStorage.removeItem("token")
        
    }

  

    const renderArtists = () => {
        return artists.map(artist => (
            <div key={artist.id}>
                {artist.images.length ? <img width={"20%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                {artist.name}
            </div>
        ))}

    return (
        <div className="App">
        <header className="App-header">
            <h1>Spotify React</h1>
          
            {!token ?
                <a href={LOGIN}>Login to Spotify</a>
                : <button onClick={logout}>Logout</button>}

            {token ?
                <div>
                    <input type="text" onChange={e => setSearchKeylol(e.target.value)}/>
                    <button onClick={()=>updateSearch(searchKeylol)}>Search</button>
                </div>

                : <h2>Please login</h2>
            }

            {token? renderArtists():<></>}
            {console.log(artists)}
        </header>
    </div>
    )
    
}

export default Homepage