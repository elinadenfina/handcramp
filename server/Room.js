const Game = require("./Game");
const checkWinner = require("./functions/checkWinner");
const getPlayersByRoomId = require("./functions/getPlayersByRoomId");
const gameHandler = require("./gameHandler");
const roomHandler = require("./roomHandler");
class Room {
	constructor(socket, io) {
		this.io = io;
		this.socket = socket;
		this.connectedUsers = [];
		this.players = [];

		this.game = new Game(io, socket);

		console.log(this.game);
	}

	events() {
		this.socket.on("selectHand", this.handleSelectHand.bind(this));
		// this.socket.on("playerJoinedRoom", this.playerJoinedRoom);
		this.socket.on("leaveRoom", () => {
			console.log("LEAVE ROOM");
		});
		this.socket.on("replay", this.replay.bind(this));
		this.socket.on("disconnecting", this.handleDisconnecting.bind(this));
	}

	emitToOthers(event, data = {}) {
		this.socket.broadcast.to(this.room).emit(event, data);
	}

	emitToAll(event, data = {}) {
		this.io.in(this.room).emit(event, data);
	}

	emitToSelf(event, data = {}) {
		this.socket.emit(event, data);
	}

	// getPlayers() {
	// 	const connectedUsers = this.io.sockets.adapter.rooms[this.room].sockets;
	// 	const players = Object.keys(connectedUsers).map(id => {
	// 		return this.io.sockets.connected[id].player;
	// 	});

	// 	return players;
	// }

	createPlayer() {
		return {
			hand: "",
			score: 0,
			id: this.socket.id
		};
	}

	create() {
		const roomId = (Math.random() * 100000) | 0;
		this.room = roomId;
		this.socket.player = this.createPlayer();
		this.socket.emit("roomCreated", {
			roomId: roomId,
			player: {
				id: this.socket.id
			}
		});

		this.events();
	}

	join(room) {
		this.room = room;
		const socketRoom = this.io.sockets.adapter.rooms[room];

		if (
			socketRoom != undefined &&
			Object.keys(socketRoom.sockets).length >= 2
		) {
			this.emitToSelf("roomIsFull");
			return;
		}

		this.socket.join(room);
		this.socket.player = this.createPlayer();

		this.emitToOthers("playerJoinedRoom");
		this.emitToSelf("roomJoined", {
			id: this.socket.id
		});

		const players = getPlayersByRoomId();

		if (players && players.length === 2) {
			new Game();
		}
		this.events();
	}

	handleDisconnecting() {
		this.emitToOthers("playerDisconnected");
	}

	handleSelectHand(hand) {
		this.socket.player.hand = hand;
		this.players = getPlayersByRoomId(this.io, this.roomId);
		this.emitToAll("handSelected", this.players);
		let shouldPlay = true;

		if (Object.keys(this.players).length > 1) {
			for (let player of this.players) {
				if (!player.hand) {
					shouldPlay = false;
					break;
				}
			}
			if (shouldPlay) {
				this.play();
			}
		}
	}

	replay() {
		if (this.players) {
			this.players = this.players.map(player => {
				player.hand = "";
				return player;
			});
		}
	}

	play() {
		const winnerId = checkWinner(this.players);

		if (winnerId) {
			this.players = this.players.map(player => {
				if (player.id === winnerId) {
					player.score = player.score + 1;
				}
				return player;
			});
		}

		// setTimeout(() => {
		this.emitToAll("play", {
			winnerId,
			players: this.players
		});
		// }, 3000);
	}
}

module.exports = Room;
