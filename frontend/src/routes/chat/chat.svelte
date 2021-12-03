<script lang="ts">
    let channelName = "#Lobby";
    let messageList = [];
    import { io } from "socket.io-client"
    import { onMount } from "svelte";
    let isConnect
    let lastMessageTime;
    let cooldown = 450;

    const socket = io('http://localhost:5000/');

    onMount(() => {   
    socket.on("connect", () => {
      isConnect = socket.connected;
    });
    socket.on("disconnect", () => {
      isConnect = socket.connected;
    });
        socket.on('message list', (msg) => {
          msg ? messageList.push(msg[msg.length - 1]) : ''
            const msgWrapper = document.createElement("div");
            msgWrapper.className = 'p-2 mx-3 my-4 message-wrapper border border-black shadow-xl rounded-lg align-middle'
            const msgBox = document.createElement("div")
            msgBox.className = 'flex flex-col justify-end items-start relative';
            const username = document.createElement("div");
            username.className = 'font-bold inline-block';
            const img = document.createElement("img");
            img.src = messageList[messageList.length - 1].avatar;
            img.className = 'rounded-full inline-block mx-2';
            img.width = 30;
            img.alt = "avatar";

            const spanUsername = document.createElement("span");
            spanUsername.innerText = messageList[messageList.length - 1].username;
            spanUsername.className = 'font-bold';
            const spanTimestamp = document.createElement("span");
            spanTimestamp.className = 'text-xs text-gray-500 right-0 absolute';
            spanTimestamp.innerText = messageList[messageList.length - 1].timestamp;
            const message = document.createElement("div");
            message.className = 'break-all mx-2 my-1';  
            message.innerHTML = messageList[messageList.length - 1].content;

            spanUsername.appendChild(spanTimestamp);
            username.appendChild(img);
            username.appendChild(spanUsername);
            msgBox.appendChild(username);
            msgBox.appendChild(message);
            msgWrapper.appendChild(msgBox);

            document.getElementById("msg-container").appendChild(msgWrapper);
          const msgWrapperBox = document.querySelectorAll(".message-wrapper");
          msgWrapperBox[msgWrapperBox.length - 1].scrollIntoView({ behavior: 'smooth' });
        });
        document.getElementById('msg-form').onsubmit = async(e) => {
            e.preventDefault();
            if(!isConnect) return;
            let msg = document.getElementById('msg-input') as HTMLInputElement;
            let msgVal = msg.value;
            let isBadWord = false;

            msgVal = msgVal.replace(/(<([^>]+)>)/ig, "");

            if(msgVal === '') return;
            if(msgVal.length > 240) {
                alert("Message is too long!");
                return;
            }

            if((lastMessageTime && Date.now() - lastMessageTime) < cooldown) {
                alert("Chill, that's too fast!");
                return;
            }

            socket.emit("chat message", {
                username: "Anonymous",
                avatar: '/assets/images/__default.png',
                timestamp: new Date().toLocaleString(),
                content: isBadWord ? '' : msgVal,
            });
            lastMessageTime = Date.now()
            msg.value = '';
        } 
    });
</script>

<svelte:head>
    <title>Arphros | Chat</title>
</svelte:head>
<main>
    <div class="h-full w-full flex justify-center mt-4">
        <div class="bg-white w-full md:max-w-3xl max-w-full shadow-2xl min-h-full m-6 max-h-120 rounded-xl backdrop-blur-xl backdrop-filter bg-opacity-20 grid place-items-center">
        <h1 class="top-0 rounded-t-lg m-2 p-2 font-bold text-4xl text-center bg-black   text-white w-full relative">{channelName}
          <button class="absolute text-white bg-{isConnect ? 'red' : 'green'}-500 right-0 text-sm bottom-0 h-full align-middle rounded-tr-lg" on:click={() => { isConnect ? socket.disconnect() : socket.connect()}}>{isConnect ? "Disconnect" : "Connect"}
          </button>
        </h1>
        <h1 class="text-{isConnect ? 'green' : 'red'}-500 text-lg">
          {isConnect ? "User connected!" : "User disconnected!"} <br> 
        </h1>
        <div class="container max-h-full overflow-scroll" id="msg-container">          
        </div>
        <form class="w-full h-full" id="msg-form">
            <div class="relative">
            <input autocomplete="off" type="text" name="msg" id="msg-input" class="w-full rounded-r-md border focus:outline-none p-2" placeholder="Enter your message..." disabled={isConnect ? false : true} />
            <input type="submit" class="absolute bg-green-500 right-0 bottom-0 text-white p-2 rounded-r-md h-full" value="Send" disabled={isConnect ? false : true} />
            </div>
        </form>
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
    .z-999 {
        z-index: 999;   
    }
</style>