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
                        <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                            <span className="">Menu</span>
                        </button>
                        <a className="btn btn-primary" href="./new_item" role="button" aria-controls="offcanvasExample">
                            New Item
                        </a>


                    </div>
                    <div className="offcanvas offcanvas-end" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">

                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item active nav-link">TrackIt UserId:  {trackITObject.email}
                                </li>

                                <a className="btn btn-primary" href="./homepage" role="button" aria-controls="offcanvasExample">
                                    Home
                                </a>
                                <a className="btn btn-primary" href="./user_history" role="button" aria-controls="offcanvasExample">
                                    History
                                </a>
                                <a className="btn btn-primary" href="./user_information" role="button" aria-controls="offcanvasExample">
                                    Edit Registration
                                </a>
                                <a className="btn btn-primary" href="./new_item" role="button" aria-controls="offcanvasExample">
                                    New Item
                                </a>


                                {
                                    localStorage.getItem("trackIT_user")
                                        ? <li className="nav-item">
                                            <Link className="btn btn-primary" to="" onClick={() => {
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

