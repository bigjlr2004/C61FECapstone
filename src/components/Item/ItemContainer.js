import { useEffect, useState } from "react";
import { fetchDelete, standardFetch } from "../../Api_Manager";
import { DisplayItems } from "./DisplayItems";

export const ItemContainer = () => {



    const localTrackITUser = localStorage.getItem("trackIT_user")
    const trackITObject = JSON.parse(localTrackITUser);
    const [items, setItems] = useState([])
    const [filteredItems, setFiltered] = useState([])
    const [seeAllItems, setSeeAllItems] = useState("")


    const getAllItems = () => {
        standardFetch(`http://localhost:8088/items/?userId=${trackITObject.id}&_expand=category`)
            .then((data) => {
                return setItems(data)
            })
    }


    useEffect(
        () => {
            if (seeAllItems) {
                setFiltered(items)
            } else {
                const activeItems = items.filter((item) => {
                    return item.status === "active"
                })
                setFiltered(activeItems)
            }
        }, [seeAllItems])

    useEffect(
        () => {
            getAllItems()
        }, [])

    useEffect(
        () => {
            const activeItems = items.filter((item) => {
                return item.status === "active"
            })
            setFiltered(activeItems)
        }, [items])


    const handleDeleteItem = (event) => {
        fetchDelete(`http://localhost:8088/items/${event.target.id}`).then(() => { getAllItems() })

    }
    return (<>
        {<DisplayItems
            filteredItems={filteredItems}
            handleDeleteItem={handleDeleteItem}
            setSeeAllItems={setSeeAllItems}
            getAllItems={getAllItems}

        />}
    </>)
}