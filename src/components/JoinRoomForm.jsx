/** @format */

import { useState, useEffect } from "react";
import "./JoinRoomForm.css";
import { X } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useAppContext } from "../store/Context";
import Error from "./Error";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners";
const JoinRoomForm = ({ setOpenJoinForm }) => {
	const navigate = useNavigate();
	const { socket, roomDetails, setRoomDetails, joinStatus, setJoinStatus } =
		useAppContext();

	const [isPending, setIsPending] = useState(false);
	const [currentRoomName, setCurrentRoomName] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [loading,setLoading]=useState(false);
	useEffect(() => {
		if (roomDetails) {
			navigate(`/room/${roomDetails}`);
		}
	}, []);

	const joinRoomHandler = async (e) => {
		setError("");
		e.preventDefault();
		setLoading(true);

		if (currentRoomName.length < 4) {
			setError("Name can only be greater than 3 letters");
			setLoading(false);
			return;
		}

		try {
			const ack = await new Promise((resolve, reject) => {
				socket.emit("join-room", currentRoomName, (ack) => {
					console.log("ack is ", ack);
					resolve(ack);
				});
			});
			setLoading(false);

			setJoinStatus(ack.success);
			setRoomDetails(currentRoomName);

			if (ack.success) {
				navigate(`/room/${currentRoomName}`);
			}
		} catch (error) {
			setLoading(false)
			console.log("Error:", error);
		}
	};

	return (
		<div className="join-room-form">
			<X
				className="cut-icon"
				color="white"
				size={25}
				onClick={() => setOpenJoinForm(false)}
			/>
			<form className="join-form" onSubmit={joinRoomHandler}>
				<input
					type="text"
					placeholder="Enter room name"
					value={currentRoomName}
					onChange={(e) => setCurrentRoomName(e.target.value)}
				/>
				{error && <Error message={error} />}
				<button type="submit">
					{loading ? (
						<ClipLoader size={15} />
					) : (
						<>
							Join room <ArrowRight />
						</>
					)}
				</button>
			</form>
		</div>
	);
};

export default JoinRoomForm;
