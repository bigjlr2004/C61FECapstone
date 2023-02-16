
import { DisplaySingleItem } from "./DisplaySingleItem"

export const DisplayItems = ({ filteredItems, setSeeAllItems, getAllItems, seeAllItems }) => {

    return (<>
        <span className={`${seeAllItems === false ? "visible" : "invisible"}`}>
            <button
                id={"seeAll-btn"}
                onClick={() => {
                    setSeeAllItems(true)
                }}
                >
                All Items
            </button>
        </span>
        <span className={`${seeAllItems === true ? "visible" : "invisible"}`}>
            <button
                id={"seeAll-btn"}
                onClick={() => {
                    setSeeAllItems(false)
                }}
                >
                Active Items
            </button>

        </span>

        <div className="active-items-container">
            <DisplaySingleItem
                filteredItems={filteredItems}
                getAllItems={getAllItems}
            />
        </div>
    </>)
}