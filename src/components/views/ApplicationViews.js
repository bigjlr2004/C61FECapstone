import { Outlet, Route, Routes } from "react-router-dom"
import { CreateItem } from "../Item/CreateItem"
import { EditItem } from "../Item/EditItem"
import { ItemContainer } from "../Item/ItemContainer"
import { EditUser } from "../UserInfo/EditUser"

export const ApplicationViews = () => {
	return <>
		<Routes>
			<Route path="/" element={
				<>
					<h1 className="title--main">TrackIT Application</h1>
					<div>Your journey of 100 miles begins with the first step.</div>

					<Outlet />
				</>
			}>
				<Route path="new_item" element={<CreateItem />} />
				<Route path="user_history" element={<ItemContainer />} />
				<Route path="user_information" element={<EditUser />} />
				<Route path="items/:itemId/edit" element={<EditItem />} />

			</Route>
		</Routes>

	</>
}

