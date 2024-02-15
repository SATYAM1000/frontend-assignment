/** @format */

import "./home.css";
import logo from "../assets/logo.webp";
import trophy from "../assets/trophy.png";
import JoinRoomForm from "../components/JoinRoomForm";
import { useState } from "react";
import CreateRoomForm from "../components/CreateRoomForm";
const Home = () => {
	const [openJoinForm, setOpenJoinForm] = useState(false);
	const [openCreateRoomForm, setOpenCreateRoomForm] = useState(false);

	return (
		<div className="container">
			<div className="images">
				<img src={logo} alt="" />
				<img src={trophy} alt="" />
			</div>

			{!openJoinForm && !openCreateRoomForm && (
				<div className="buttons">
					<button className="btn1" onClick={() => setOpenCreateRoomForm(true)}>
						Create a Room
					</button>
					<button className="btn2" onClick={() => setOpenJoinForm(true)}>
						Join a Room
					</button>
				</div>
			)}

			{openJoinForm && <JoinRoomForm setOpenJoinForm={setOpenJoinForm} />}
			{openCreateRoomForm && (
				<CreateRoomForm setOpenCreateRoomForm={setOpenCreateRoomForm} />
			)}
		</div>
	);
};

export default Home;
