import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

export const StartPage = () => {
    const navigate = useNavigate()
    const localTrackITUser = localStorage.getItem("trackIT_user")
    const trackITObject = JSON.parse(localTrackITUser);

    return <>
        <main>
            <h1>Welcome {trackITObject.firstName}</h1>
            <div className="instruction_paragraph">

                <p>Have you ever wished there was something in your life you could change?
                    Whatever you want to change, the TrackIT app can help you achieve it. We are more likely to accomplish things in life  when they are clearly defined.
                    When you have clearly defined what it is that you want to accomplish and then started tracking it there is nothing you cannot achieve.</p>
                <ol>
                    <li>To get started click the Start button loacated at the bottom of the screen.</li>
                    <li>This is going to take you to a create new item screen. </li>
                    <li>Here you will fill in the name of the item, give a reason for wanting to track this item, pick a predefined category or make your own, and enter a starting comment. </li>
                    <li>Thats all there is to it. Welcome to the TrackIt family.</li>
                </ol>

            </div>
            <h1>What are you waiting for {trackITObject.firstName}, lets get started ?</h1>
            <div className="test">
                <button
                    onClick={(event) => {
                        navigate("/new_item")
                    }}
                    className="start_button center">
                    Start
                </button>
            </div>
        </main>
    </>
}