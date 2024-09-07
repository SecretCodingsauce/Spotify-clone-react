import { useState, useEffect } from "react"

export default function SearchPage({searchData}){

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

    return(
        <div>
            {artists ? renderArtists() : <></>}
            <p>SearchPage</p>
            <p>SearchPage</p>
            <p>SearchPage</p>
            <p>SearchPage</p>
            <p>SearchPage</p>
            <p>SearchPage</p>
            <p>SearchPage</p>
            <p>SearchPage</p>
            </div>
    )
}