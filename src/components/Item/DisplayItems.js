
import { DisplaySingleItem } from "./DisplaySingleItem"

export const DisplayItems = ({ filteredItems, setSeeAllItems, getAllItems, seeAllItems }) => {

    return (<>
        <span className={`${seeAllItems === false ? "visible" : "invisible"}`}>
            <button
                id={"seeAll-btn"}
                onClick={() => {
                    setSeeAllItems(true)
                }}
                className="btn btn-primary">
                All Items
            </button>
        </span>
        <span className={`${seeAllItems === true ? "visible" : "invisible"}`}>
            <button
                id={"seeAll-btn"}
                onClick={() => {
                    setSeeAllItems(false)
                }}
                className="btn btn-primary">
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