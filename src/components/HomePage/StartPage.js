import { Link, useNavigate } from "react-router-dom"

export const StartPage = () => {
    const navigate = useNavigate()
    const localTrackITUser = localStorage.getItem("trackIT_user")
    const trackITObject = JSON.parse(localTrackITUser);
    return <>
        <h1>Welcome {trackITObject.firstName}</h1>
        <div className="instruction_paragraph">
            <ol>
                <p>Have you ever wished there was something in your life you could change? Maybe you want to lose weight, spend more time with your loved ones, start reading, or stop smoking.
                    Whatever you want to change, the TrackIT app can help you to achieve it. People are more likely to Accomplish things in life  when they are clearly defined.
                    When you have clearly define what it is that you want to accomplish and then started tracking your progress towards achieving it there is nothing that will stand between you and your goals.</p>


                <p>Instructions</p>
                <li>First you need you need to click the Start button below.</li>
                <li>This is going to take you to a create new item screen. </li>
                <li>Here you will fill in the name of the item, a brief description, pick a predefined category or make your own, and enter a starting comment and your set. </li>
            </ol>

        </div>
        <h1>What are you waiting for {trackITObject.firstName}, lets get started ?</h1>
        <button
            onClick={(event) => {
                navigate("/new_item")
            }}
            className="start_button">
            Start
        </button>
    </>
}