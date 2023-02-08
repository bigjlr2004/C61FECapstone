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
                <nav className="navbar bg-body-tertiary  fire">
                    <div className="container-fluid">
                        <button className="" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="offcanvas offcanvas-end" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">

                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item active nav-link">TrackIt UserId:  {trackITObject.email}
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to="/homepage" aria-current="page">Home</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link " to="/new_item" aria-current="page">New Item</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link " to="/user_information" aria-current="page">Edit Registration</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link " to="/user_history" aria-current="page">History</Link>
                                </li>
                                {
                                    localStorage.getItem("trackIT_user")
                                        ? <li className="nav-item">
                                            <Link className="navbar-link" to="" onClick={() => {
                                                localStorage.removeItem("trackIT_user")
                                                navigate("/", { replace: true })
                                            }}>Logout</Link>
                                        </li>
                                        : ""
                                }
                            </ul>
                        </div>
                    </div>

                </nav>
            </div>

        </>
    )
}

