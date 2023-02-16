import { useState } from "react"
import { useNavigate } from "react-router-dom"


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
                        id: createdUser.id,
                        firstName: createdUser.firstName,
                        email: createdUser.email

                    }))

                    navigate("./homepage")
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
            <form onSubmit={handleRegister}>
                <fieldset>
                <h1>TrackIT Application Registration</h1>
                    <label htmlFor="firstName"> First Name </label>
                    <input onChange={updateUser}
                            type="text" id="firstName" className="form-control"
                            placeholder="Enter your first name" required autoFocus />
               </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> Last Name </label>
                    <input onChange={updateUser}
                            type="text" id="lastName" className="form-control"
                            placeholder="Enter your last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                            type="email" id="email" className="form-control"
                            placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="phoneNumber"> Phone Number </label>
                    <input onChange={updateUser}
                            type="tel" id="phoneNumber" className="form-control"
                            placeholder="Phone Number" required />
                </fieldset>
                <fieldset>
                <button
                    className="buttonS"
                    type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

