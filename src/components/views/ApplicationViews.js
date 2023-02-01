import { Outlet, Route, Routes } from "react-router-dom"
import { CreateItem } from "../Item/CreateItem"

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
			</Route>
		</Routes>

	</>
}

