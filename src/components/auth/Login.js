import React, { useState } from "react"

import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("john@john.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("trackIT_user", JSON.stringify({
                        id: user.id,
                        firstName: user.firstName,
                        email: user.email
                    }))
                    navigate("/homepage")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }
    return (
        <>
            <section>
                <form className="card-header" onSubmit={handleLogin}>
                    <h1>TrackIt Application</h1>
                    <h2>Please sign in.... Your future self will thank you.</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <div className="bottom-Button">
                            <button type="submit"
                                className="btn btn-primary">
                                Sign in
                            </button>
                            <button className="btn btn-primary"
                                onClick={() => {
                                    navigate("/register")
                                }}
                            >Not a member yet?
                            </button>
                        </div>
                    </fieldset>
                </form>
            </section>

        </>
    )
}

