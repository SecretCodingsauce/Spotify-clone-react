import spotifylogo from "./img/spotify-blackbg-highquality.png"

export default function Homepage({ LOGIN, token }) {



    return (
        <div className="App">
            {!token ? <div className="mt-8">



                <div>
                    <div className="flex flex-col justify-center items-center min-h-screen">
                        <img className="w-56 mb-0 -mt-48" src={spotifylogo} alt="Spotify logo" />
                        <h2 className="text-6xl font-extrabold text-center mt-0">Spotify</h2>
                        <a className="button mt-9" href={LOGIN}>Login to Spotify</a>
                    
                    </div>

                </div>





            </div> 
            :
            <div>
                <p>fuck you!</p>
                <p>fuck you!</p>
                <p>fuck you!</p>
                <p>fuck you!</p>
                <p>fuck you!</p>
                <p>fuck you!</p>
                <p>fuck you!</p>
                <p>fuck you!</p>
                <p>fuck you!</p>
            </div>}

        </div>
    )

}


