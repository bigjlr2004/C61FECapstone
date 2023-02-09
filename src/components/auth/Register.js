import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [newUser, setNewUser] = useState({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: ""
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("trackIT_user", JSON.stringify({
                        id: createdUser.id
                    }))

                    navigate("/homepage")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${newUser.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = { ...newUser }
        copy[evt.target.id] = evt.target.value
        setNewUser(copy)
    }

    return (
        <main>
            <form className="card" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for the TrackIT Application</h1>
                <fieldset>
                    <div className="card-header">
                        <label htmlFor="firstName"> First Name </label>
                        <input onChange={updateUser}
                            type="text" id="firstName" className="form-control"
                            placeholder="Enter your  First Name" required autoFocus />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="card-header">
                        <label htmlFor="lastName"> Last Name </label>
                        <input onChange={updateUser}
                            type="text" id="lastName" className="form-control"
                            placeholder="Enter your Last Name" required />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="card-header">
                        <label htmlFor="email"> Email address </label>
                        <input onChange={updateUser}
                            type="email" id="email" className="form-control"
                            placeholder="Email address" required />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="card-header">
                        <label htmlFor="phoneNumber"> Phone Number </label>
                        <input onChange={updateUser}
                            type="tel" id="phoneNumber" className="form-control"
                            placeholder="Phone Number" required />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="card-header">
                        <button
                            className="btn-primary btn"
                            type="submit"> Register </button>
                    </div>
                </fieldset>
            </form>
        </main>
    )
}

