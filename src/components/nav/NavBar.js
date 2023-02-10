import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    const localTrackITUser = localStorage.getItem("trackIT_user")
    const trackITObject = JSON.parse(localTrackITUser);

    return (
        <>

            <ul className="navbar">
                <h1 className="title--main">TrackIT Application</h1>
                <div>Your journey of 100 miles begins with the first step.</div>
            </ul>
            <div>
                <nav className="navbar bg-body-tertiary right-buttons fire">
                    <div className="container-fluid">
                        <a className="btn btn-primary" href="./homepage" role="button" aria-controls="offcanvasExample">
                            Home
                        </a>

                        <a className="btn btn-primary" href="./new_item" role="button" aria-controls="offcanvasExample">
                            New Item
                        </a>
                        <a className="btn btn-primary" href="./user_history" role="button" aria-controls="offcanvasExample">
                            History
                        </a>
                        <a className="btn btn-primary" href="./user_information" role="button" aria-controls="offcanvasExample">
                            Edit Registration
                        </a>
                        {
                            localStorage.getItem("trackIT_user")
                                ? <div className="nav-item">
                                    <Link className="btn btn-primary" to="" onClick={() => {
                                        localStorage.removeItem("trackIT_user")
                                        navigate("/", { replace: true })
                                    }}>Logout</Link>
                                </div>
                                : ""
                        }


                    </div>


                </nav>
            </div>

        </>
    )
}

