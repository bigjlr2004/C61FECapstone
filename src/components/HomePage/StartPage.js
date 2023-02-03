import { Link, useNavigate } from "react-router-dom"

export const StartPage = () => {
    const navigate = useNavigate()
    return <>
        <h1>Welcome</h1>
        <div className="instruction_paragraph">
            <ul>
                <li>Have you ever wished there was something in your life you could change? Maybe you want to lose weight, spend more time with your loved ones, start reading, or stop smoking.</li>
                <li> Whatever you want to change, the TrackIT app can help you to achieve it.</li>
                <li>People are more likely to Accomplish things in life  when they are clearly defined. TrackIT not only allows its users to define goals but the app provides an easy to use interface to track progress on these goals.</li>
                <li>When you have used TrackIT to clearly define what it is that you want to accomplish, and started tracking your progress towards achieving it in the TrackIT APP, there is nothing that will stand between you and your goals.</li>
            </ul>

            <p>



            </p>
        </div>
        <h1>Shall we get Started ?</h1>
        <button
            onClick={(event) => {
                navigate("/new_item")
            }}
            className="start_button">
            Start
        </button>
    </>
}