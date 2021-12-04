<script lang="ts">
	//#region modules
	import { onMount } from 'svelte';
    import { io } from "socket.io-client"
    //#endregion

	//#region variables
	let channelName = '#Lobby';
	let cooldown = 450;
    let webSocketUrl = "ws://arphros.ddns.net:5000/"
	let connectionState;
	let lastMessageTime;
	//#endregion

    //#region On mount
	onMount(() => {
		const socket = io(webSocketUrl);
        //#region On connection close, open
		socket.on('connect', () => {
			connectionState = socket.connected;
		});
		socket.on('disconnect', () => {
			connectionState = socket.connected;
		});
        //#endregion
		
        //#region On message 
        socket.on('message list', (msg) => {
            
            //#region Add element
			const msgWrapper = document.createElement('div');
			msgWrapper.className =
				'p-2 mx-3 my-4 message-wrapper border border-black shadow-xl rounded-lg align-middle';
			const msgBox = document.createElement('div');
			msgBox.className = 'flex flex-col justify-end items-start relative';
			const username = document.createElement('div');
			username.className = 'font-bold inline-block';
			const img = document.createElement('img');
			img.src = msg.uid ? `/user/avatar/${msg.uid}.png` : `/user/avatar/__default.png`;
			img.className = 'rounded-full inline-block mx-2';
			img.width = 30;
			img.alt = 'avatar';

			const spanUsername = document.createElement('span');
			spanUsername.innerText = msg.username;
			spanUsername.className = 'font-bold';
			const spanTimestamp = document.createElement('span');
			spanTimestamp.className = 'text-xs text-gray-500 right-0 absolute';
			spanTimestamp.innerText = msg.timestamp;
			const message = document.createElement('div');
			message.className = 'break-all mx-2 my-1';
			message.innerHTML = msg.content;

			spanUsername.appendChild(spanTimestamp);
			username.appendChild(img);
			username.appendChild(spanUsername);
			msgBox.appendChild(username);
			msgBox.appendChild(message);
			msgWrapper.appendChild(msgBox);

			document.getElementById('msg-container').appendChild(msgWrapper);
			const msgWrapperBox = document.querySelectorAll('.message-wrapper');
			msgWrapperBox[msgWrapperBox.length - 1].scrollIntoView({ behavior: 'smooth' });
            //#endregion
		});
        //#endregion
		
        //#region Form handling
        document.getElementById('msg-form').onsubmit = async (e) => {
            //#region message handling
			e.preventDefault();
			if (connectionState === false) return;
			let msg = document.getElementById('msg-input') as HTMLInputElement;
			let msgVal = msg.value;

			msgVal = msgVal.replace(/(<([^>]+)>)/gi, '');

			if (msgVal === '') return;
			if (msgVal.length > 240) {
				alert('Message is too long!');
				return;
			}

			if ((lastMessageTime && Date.now() - lastMessageTime) < cooldown) {
				alert("Chill, that's too fast!");
				return;
			}

			socket.emit("chat message",
				{
					username: 'Anonymous',
					uid: '',
					timestamp: new Date().toLocaleString(),
					content: msgVal
				}
			);
			lastMessageTime = Date.now();
			msg.value = '';
            //#endregion
		};
        //#endregion
	});
    //#endregion
</script>

<svelte:head>
	<title>Arphros | Chat</title>
</svelte:head>

<main>
	<div class="h-full w-full flex justify-center mt-4">
		<div
			class="bg-white w-full md:max-w-3xl max-w-full shadow-2xl min-h-full m-6 max-h-120 rounded-xl backdrop-blur-xl backdrop-filter bg-opacity-20 grid place-items-center"
		>
			<h1
				class="top-0 rounded-t-lg m-2 p-2 font-bold text-4xl text-center bg-black   text-white w-full relative"
			>
				{channelName}
			</h1>
			<h1
				class="text-{connectionState === true
					? 'green' 
					: 'red'}-500 text-lg"
			>
				{connectionState === true 
					? 'User connected!'
					: 'User disconnected!'
                } <br />
			</h1>
					<div class="container max-h-full overflow-scroll" id="msg-container" />
			<form class="w-full h-full" id="msg-form">
				<div class="relative">
					<input
							autocomplete="off"
							type="text"
							name="msg"
							id="msg-input"
							class="w-full rounded-r-md border focus:outline-none p-2"
							placeholder="Enter your message..."
					/>
					<input
							type="submit"
							class="absolute bg-green-500 right-0 bottom-0 text-white p-2 rounded-r-md h-full"
							value="Send"
					/>
				</div>
			</form>
		</div>
	</div>
</main>

<style>
	:global(.message-wrapper) {
		animation: popUp 0.5s ease-in-out;
	}

	.max-h-120 {
		max-height: 36rem;
	}

	@keyframes popUp {
		0% {
			transform: scale(0.5);
			opacity: 0;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
