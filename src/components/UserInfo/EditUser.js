import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { elephantPost, standardFetch } from "../../Api_Manager";

export const EditUser = () => {

    const localTrackITUser = localStorage.getItem("trackIT_user")
    const trackITObject = JSON.parse(localTrackITUser);
    const navigate = useNavigate()
    const [user, updateUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    })

    useEffect(
        () => {
            standardFetch(`http://localhost:8088/users/${trackITObject.id}`)
                .then((data) => {
                    const user = data
                    updateUser(user)
                })

        }, [])
    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
            setTimeout(() => navigate("/homepage"), 1500);
        }
    }, [feedback])
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        localStorage.setItem("trackIT_user", JSON.stringify({
            id: user.id,
            firstName: user.firstName,
            email: user.email
        }))

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
        elephantPost(`http://localhost:8088/users/${user.id}`, user, "PUT")
            .then(() => {
                setFeedback("User profile successfully saved")

            })

    }
    const changeUser = (evt) => {
        evt.preventDefault()
        const copy = { ...user }
        copy.firstName = evt.target.value
        updateUser(copy)
    }

    return (<>
        <main>
            <form>
                <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
                    {feedback}
                </div>
                <fieldset>
                    <h2>Edit Registration</h2>
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={user.firstName}
                        onChange={
                            (evt) => {
                                { changeUser(evt) }
                            }
                        } />

                </fieldset>
                <fieldset>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        value={user.lastName}
                        onChange={
                            (evt) => {

                                const copy = { ...user }
                                copy.lastName = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">Email Address:</label>
                    <input type="text"
                        className="form-control"
                        value={user.email}
                        onChange={
                            (evt) => {

                                const copy = { ...user }
                                copy.email = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </fieldset>
                <fieldset>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text"
                        className="form-control"
                        value={user.phoneNumber}
                        onChange={
                            (evt) => {

                                const copy = { ...user }
                                copy.phoneNumber = evt.target.value
                                updateUser(copy)
                            }
                        } />
                </fieldset>
                <div className="bottom-Buttons">
                    <button
                        onClick={(clickEvent) => { handleSaveButtonClick(clickEvent) }}>
                        Save Profile
                    </button>
                    <button
                        onClick={(event) => {
                            event.preventDefault()
                            navigate("/homepage")
                        }}>
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    </>)
}