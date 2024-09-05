import { NavLink } from "react-router-dom"
import userpicture from "./img/icons8-user-white.png"

export default function UserPage({ userData, updateToken }) {

    const logout = () => {
        updateToken("")
        window.localStorage.removeItem("token")

    }

    return (

        <div className="main">
            <div className="flex justify-center w-full h-1/6">
                <div className="grid grid-cols-1 place-items-center w-4/5 p-40 pt-20 pb-2 ">
                    <img className="rounded-full" src={userData?.images?.length > 0 ? userData.images[1].url : userpicture}></img>
                    <p className="text-center">{userData.display_name}</p>
                </div>

                <div className="mt-7"><NavLink className="justify-end w-1/5 text-right text-white rounded-md bg-black p-5 mt-3" to="/" onClick={logout}>Logout</NavLink></div>
            </div>




        </div>
    )
}