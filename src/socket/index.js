import io from "socket.io-client";

export default () => {
	const host =
		process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: window.location.host;

	const socket = io(host);

	const roomCreated = cb => {
		socket.on("roomCreated", cb);
	};

	const createRoom = () => {
		socket.emit("createRoom");
	};

	const joinRoom = (roomId, gameMode) => {
		socket.emit("joinRoom", roomId, gameMode);
	};

	const roomJoined = cb => {
		socket.on("roomJoined", cb);
	};

	const leaveRoom = roomId => {
		socket.emit("leaveRoom", roomId);
	};

	const roomIsFull = cb => {
		socket.on("roomIsFull", cb);
	};

	const onError = cb => {
		socket.on("onError", cb);
	};

	const playerDisconnected = cb => {
		socket.on("playerDisconnected", cb);
	};

	const playerJoinedRoom = cb => {
		socket.on("playerJoinedRoom", cb);
	};

	const selectHand = (value, roomId, socketId) => {
		socket.emit("selectHand", value, roomId, socketId);
	};

	const handSelected = cb => {
		socket.on("handSelected", cb);
	};

	const onReplay = cb => {
		socket.on("onReplay", cb);
	};

	const replay = (roomId, userId) => {
		socket.emit("replay", roomId, userId);
	};

	const roundEnd = (roomId, userId) => {
		socket.emit("roundEnd", roomId, userId);
	};

	const onRoundEnd = cb => {
		socket.on("onRoundEnd", cb);
	};

	const onGameEnd = cb => {
		socket.on("onGameEnd", cb);
	};

	const play = cb => {
		socket.on("play", cb);
	};

	return {
		roomCreated,
		createRoom,
		joinRoom,
		roomJoined,
		roomIsFull,
		leaveRoom,
		onError,
		playerDisconnected,
		playerJoinedRoom,
		selectHand,
		handSelected,
		onReplay,
		replay,
		play,
		roundEnd,
		onRoundEnd,
		onGameEnd
	};
};
