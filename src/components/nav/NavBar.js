import { Link, useNavigate } from "react-router-dom"


export const NavBar = () => {
    const navigate = useNavigate()
    const localTrackITUser = localStorage.getItem("trackIT_user")
    const trackITObject = JSON.parse(localTrackITUser);

    return (
        <>
            <header>
                <section className="header-title-line">
                    <h1 className="banner">TrackIT Application</h1>
                    <button className="menu-button">
                        <div className="menu-icon"></div>
                    </button>
                </section>
                <nav>
                    <ul>
                        <li><a href="/homepage">Home</a></li>
                        <li><a href="/user_information">Edit Registration</a></li>
                        <li><a href="/user_history">History</a></li>
                        <li><a href="/new_item">New Item</a></li>

                        <li> {
                            localStorage.getItem("trackIT_user")
                                ? <div className="nav-item">
                                    <Link to="" onClick={() => {
                                        localStorage.removeItem("trackIT_user")
                                        navigate("/", { replace: true })
                                    }}>Logout</Link>
                                </div>
                                : ""
                        }
                        </li>
                    </ul>
                </nav>
            </header>



        </>
    )
}

