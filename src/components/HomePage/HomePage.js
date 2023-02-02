import { useEffect, useState } from "react";
import { fetchDelete, standardFetch } from "../../Api_Manager";
import { DisplayItems } from "./DisplayItems";

export const HomePage = () => {
    const localTrackITUser = localStorage.getItem("trackIT_user")
    const trackITObject = JSON.parse(localTrackITUser);
    const [items, setItems] = useState([])

    const getAllItems = () => {
        standardFetch(`http://localhost:8088/items/?userId=${trackITObject.id}&_expand=category`)
            .then((data) => {
                return setItems(data)
            })
    }

    useEffect(
        () => {
            getAllItems()
        }, [])


    const handleDeleteItem = (event) => {
        fetchDelete(`http://localhost:8088/items/${event.target.id}`).then(() => { getAllItems() })

    }
    return (<>
        {<DisplayItems
            items={items}
            handleDeleteItem={handleDeleteItem}

        />}
    </>)

}