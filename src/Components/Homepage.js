import { useEffect, useState } from "react"


function Homepage({ LOGIN, token, updateToken, searchData }) {


    const [artists, setArtists] = useState([])

    useEffect(() => {
        if (searchData) {
            setArtists(searchData.artists.items)
        }
    }, [searchData])




   



    const renderArtists = () => {
        return artists.map(artist => (
            <div key={artist.id}>
                {artist.images.length ? <img width={"20%"} src={artist.images[0].url} alt="" /> : <div>No Image</div>}
                {artist.name}
            </div>
        ))
    }

    return (
        <div className="App">
            <header className="main">
                <h1 className="">Spotify React</h1>

                {!token ?
                    <a href={LOGIN}>Login to Spotify</a>
                    : <></>}

                {token ?
                    <></> : <h2>Please login</h2>
                }

                {token ? renderArtists() : <></>}
                {console.log(artists)}
            </header>
        </div>
    )

}

export default Homepage