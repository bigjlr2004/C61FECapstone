import { useEffect, useState } from "react";
import { fetchDelete, standardFetch } from "../../Api_Manager";
import { ItemContainer } from "../Item/ItemContainer";


export const HomePage = () => {
    const localTrackITUser = localStorage.getItem("trackIT_user")
    const trackITObject = JSON.parse(localTrackITUser);
    const [user, setUser] = useState([])

    const getAllItems = () => {
        standardFetch(`http://localhost:8088/users/${trackITObject.id}`)
            .then((data) => {
                return setUser(data)
            })
    }

    useEffect(
        () => {
            getAllItems()
        }, [])



    return (<>
        <div>
            <h1>Welcome {user.firstName} lets review the items you are tracking.</h1>
            {<ItemContainer />}
        </div>

    </>)

}