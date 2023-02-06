import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    const localTrackITUser = localStorage.getItem("trackIT_user")
    const trackITObject = JSON.parse(localTrackITUser);

    return (
        <>
            <ul className="navbar">

                <li className="navbar__item active">
                    <Link className="navbar__link" to="/homepage">Home</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/new_item">Create Item</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/user_information">Edit User Info</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/user_history">History</Link>
                </li>

                {
                    localStorage.getItem("trackIT_user")
                        ? <li className="navbar__item navbar__logout">
                            <Link className="navbar__link" to="" onClick={() => {
                                localStorage.removeItem("trackIT_user")
                                navigate("/", { replace: true })
                            }}>Logout</Link>
                        </li>
                        : ""
                }
                <li className="navbar__item">TrackIt UserId:  {trackITObject.email}</li>
            </ul>
            <h1 className="title--main">TrackIT Application</h1>
            <div>Your journey of 100 miles begins with the first step.</div>
        </>
    )
}

