import React, { useState } from "react"

import { useNavigate } from "react-router-dom"


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
            <div className="front-div">
                <section className="front-section">
                    <form onSubmit={handleLogin}>
                        <h1 className="backlight">TrackIt Application</h1>
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
                                >
                                    Sign in
                                </button>
                                <button
                                    onClick={() => {
                                        navigate("/register")
                                    }}
                                >Not a member yet?
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </section>
            </div>
        </>
    )
}

