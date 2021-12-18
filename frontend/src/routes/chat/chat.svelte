<script context="module">
    //#region Load session
    export async function load({session}) {
        if (session.authenticated === true) {
            return {
                props: {
                    username: session.username,
                    id: session.id,
                    info: session.info,
                }
            };
        } else {
            return {
                status: 302,
                redirect: '/auth/login'
            };
        }
    }

    //#endregion
</script>

<script lang="ts">
    //#region modules
    import {onMount} from 'svelte';
    import {io} from 'socket.io-client';
    import {marked} from 'marked';
    import DOMPurify from 'dompurify';
    import {goto} from '$app/navigation'
    //#endregion

    //#region variables
    let channelName = '#Lobby';
    let cooldown = 450;
    let webSocketUrl = 'https://arphros.ddns.net:5000/';
    let connectionState;
    let lastMessageTime;
    let msgLimitLength;
    export let username;
    export let id;
    export let info;
    export let onlineUsers = 0;
    //#endregion

    //#region On mount
    onMount(() => {
        const socket = io(webSocketUrl);
        //#region On connection close, open
        socket.on('connect', () => {
            connectionState = socket.connected;
            socket.emit('new connected');
        });
        socket.on('disconnect', () => {
            connectionState = socket.connected;
            socket.emit('new drop')
        });
        //#endregion
        //#region fetch user online
        socket.on('new connected', () => {
            socket.emit('user connected', {id: id});
        });
        socket.on('user list', (users) => {
            onlineUsers = users.length
        })
        //#endregion

        //#region On message
        socket.on('message list', (msg) => {
            let isCommand = /\/(.*)\[(.*)\]/.test(msg.content)
            let command = msg.content.match(/\/(.*)\[(.*)\]/);
            //#region Add element
            const msgWrapper = document.createElement('div');
            msgWrapper.className =
                'p-2 mx-3 my-4 message-wrapper border border-black shadow-xl rounded-lg align-middle';
            const msgBox = document.createElement('div');
            msgBox.className = 'flex flex-col justify-end items-start relative';
            const username = document.createElement('div');
            username.className = 'font-bold inline-block';
            const a = document.createElement('a')
            a.href = msg.uid ? `/user/${id}` : ""
            const img = document.createElement('img');
            img.src = msg.uid ? `https://arphros.ddns.net:5000/storage/avatar/${msg.uid}.png?width=200&height=200&fit=crop&auto=compress&mask=ellipse&fm=png` : `https://arphros.ddns.net:5000/storage/avatar/__default.png?width=200&height=200&fit=crop&auto=compress&mask=ellipse&fm=png`;
            img.className = 'rounded-full w-10 h-10 object-center object-cover inline-block mx-2';
            img.width = 30;
            img.alt = 'avatar';
            img.onerror = () => {
                img.src = `https://arphros.ddns.net:5000/storage/avatar/__default.png`;
            }

            const spanUsername = document.createElement('span');
            spanUsername.innerText = msg.username;
            spanUsername.className = 'font-bold';
            const spanTimestamp = document.createElement('span');
            spanTimestamp.className = 'text-xs text-gray-500 right-0 absolute';
            spanTimestamp.innerText = msg.timestamp;
            const message = document.createElement('div');
            message.className = 'break-all mx-2 my-1';
            message.id = 'aboutme'
            message.innerHTML = isCommand ? msg.content.replace(/\/(.*)\[(.*)\]/, '') : msg.content;

            //#region Commands
            if (command && msg.isSupporter) {
                switch (command[1]) {
                    case 'tailwindStyle':
                        msgWrapper.classList.add(command[2])
                        break;
                    case 'style':
                        msgWrapper.style[command[2].split(',')[0]] = command[2].split(',')[1]
                        break;
                    case 'setBgAsBanner':
                        msgWrapper.style.backgroundImage = `url('https://arphros.ddns.net:5000/storage/banner/${msg.uid}.png')`
                        msgWrapper.style.backgroundSize = 'cover';
                        msgWrapper.style.backgroundPosition = 'center';
                        msgWrapper.style.backgroundRepeat = 'no-repeat';
                        msgWrapper.style.backgroundAttachment = 'local';
                        break;
                    case 'setBgFromURL':
                        msgWrapper.style.backgroundImage = `url('${command[2]}')`
                        msgWrapper.style.backgroundSize = 'cover';
                        msgWrapper.style.backgroundPosition = 'center';
                        msgWrapper.style.backgroundRepeat = 'no-repeat';
                        msgWrapper.style.backgroundAttachment = 'local';
                        break;
                    case 'setBgColor':
                        msgWrapper.style.backgroundColor = command[2]
                        break;
                    case 'textColor':
                        msgWrapper.style.color = command[2]
                        break;
                    case 'setBorder':
                        msgWrapper.style.border = command[2]
                        break;
                    case 'setBorderRadius':
                        msgWrapper.style.borderRadius = command[2]
                        break;
                    case 'position':
                        msgWrapper.style.position = command[2]
                        break;
                    case 'opacity':
                        msgWrapper.style.opacity = command[2]
                        break;
                    case 'error':
                        msgWrapper.classList.add('bg-red-500')
                        break;
                    case 'success':
                        msgWrapper.classList.add('bg-green-500')
                        break;
                    case 'warning':
                        msgWrapper.classList.add('bg-yellow-500')
                        break;
                    case 'glowEffect':
                        msgWrapper.classList.add(`shadow-${command[2]}`)
                        break;
                }
            }
            //#endregion

            spanUsername.appendChild(spanTimestamp);
            username.appendChild(img);
            username.appendChild(spanUsername);
            a.appendChild(username)
            msgBox.appendChild(a);
            msgBox.appendChild(message);
            msgWrapper.appendChild(msgBox);

            document.getElementById('msg-container').appendChild(msgWrapper);
            const msgWrapperBox = document.querySelectorAll('.message-wrapper');
            msgWrapperBox[msgWrapperBox.length - 1].scrollIntoView({behavior: 'smooth'});
            //#endregion
        });
        //#endregion

        //#region Form handling
        document.getElementById('msg-form').onsubmit = async (e) => {
            //#region message handling
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            if (connectionState === false) return;
            let msg = document.getElementById('msg-input') as HTMLInputElement;

            let msgVal = msg.value;
            if (msgVal === '') return;
            if (msgVal.length > msgLimitLength) {
                alert('Message is too long!');
                return;
            }
            if (info.badges.includes('Supporter')) {
                msgVal = DOMPurify.sanitize(marked.parse(msgVal), {FORBID_TAGS: ['style', 'script', 'a']});
                msgLimitLength = 500;
            } else {
                msgVal = DOMPurify.sanitize(msgVal, {ALLOWED_TAGS: ['']})
                msgLimitLength = 240;
            }
            if ((lastMessageTime && Date.now() - lastMessageTime) < cooldown) {
                alert("Chill, that's too fast!");
                return;
            }

            socket.emit('chat message', {
                username: username,
                uid: id,
                content: msgVal,
                isSupporter: info.badges.includes('Supporter')
            });
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

<main class="min-h-screen">
    <div class="h-full w-full flex justify-center mt-4">
        <div
                class="bg-white w-full md:max-w-3xl max-w-full shadow-2xl min-h-full m-6 max-h-120 rounded-xl backdrop-blur-xl backdrop-filter bg-opacity-20 grid place-items-center"
        >
            <h1
                    class="top-0 rounded-t-lg m-2 p-2 font-bold text-4xl text-center bg-gradient-to-r from-indigo-700/70 via-violet-700/70 to-blue-700/70 text-white w-full relative"
            >
                {channelName}
            </h1>
            <h1 class="text-{connectionState === true ? 'green' : 'red'}-500 text-lg">
                {connectionState === true ? 'User connected!' : 'User disconnected!'} [{onlineUsers} online!]<br/>
            </h1>
            <div class="container max-h-full overflow-y-scroll" id="msg-container"/>
            <form class="w-full h-full" id="msg-form">
                <div class="relative">
                    <input
                            autocomplete="off"
                            class="w-full rounded-r-md border focus:outline-none p-2"
                            id="msg-input"
                            name="msg"
                            placeholder="Enter your message..."
                            type="text"
                    />
                    <input
                            class="absolute bg-green-500 right-0 bottom-0 text-white p-2 rounded-r-md h-full"
                            type="submit"
                            value="Send"
                    />
                </div>
            </form>
        </div>
    </div>
    <center>Learn more about <h1 id="a" on:click={() => goto("https://tinvv.gitbook.io/arphros/web/chat-commands")}>
        Chat Commands</h1></center>
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
