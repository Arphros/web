<script context="module">
    //#region Load Session
    export async function load({ session }) {
        if (session.authenticated === true) {
            return {
                props: {
                    username: session.username,
                    id: session.id,
                    info: session.info,
                    about: session.about
                }
            }
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
    //#region Modules
    import { onMount } from "svelte";
    import { marked } from 'marked';
    import DOMPurify from 'dompurify';
    //#endregion

    //#region Variables
    export let username;
    export let id
    export let info;
    export let about;
    //#endregion

    //#region onMount
    onMount(() => {

        //#region Render about me
        document.getElementById('aboutme').innerHTML =
            DOMPurify.sanitize(marked.parse(about));
        //#endregion

        //#region Image
        const fileToBase64 = async (file) =>
            new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => resolve(reader.result)
                reader.onerror = (e) => reject(e)
            })

        function isImage(file) {
            return !!file.type.match('image.*');
        }
        //#endregion

        //#region Banner
        document.getElementById('banner-form').addEventListener('submit', async (e) => {
            e.preventDefault()
            const file = document.getElementById("banner").files[0];
            if(!isImage(file)) {
                return alert("Not supported file type!");
            }
            const imageStr = await fileToBase64(file);
            fetch('/api/user/banner', { method: 'POST', body: JSON.stringify({id: id, img: imageStr}) })
            alert("Success!")
        })
        //#endregion

        //#region Avatar
        document.getElementById('avatar-form').addEventListener('submit', async (e) => {
            e.preventDefault()
            const file = document.getElementById("file").files[0];
            if(!isImage(file)) {
                return alert("Not supported file type!");
            }
            const imageStr = await fileToBase64(file);
            fetch('/api/user/avatar', { method: 'POST', body: JSON.stringify({id: id, img: imageStr}) })
            alert("Success!")
        })
        //#endregion

        //#region Name
        document.getElementById('name-form').addEventListener('submit', async (e) => {
            e.preventDefault()
            const newUsername = document.getElementById("username").value;
            if(!newUsername || newUsername === username) {
                return alert("Username must be different or not null!!");
            }
            fetch('/api/user/name', { method: 'POST', body: JSON.stringify({ id: id, username: newUsername }) })
            alert("Success!")
        })
        //#endregion
    })
    //#endregion
</script>

<svelte:head>
    <title>{username}</title>
</svelte:head>

<main>
    <div class="h-full min-h-screen flex justify-center">
        <div
                class="bg-white shadow-2xl max-w-full md:w-9/12 w-full m-6 rounded-xl backdrop-blur-xl backdrop-filter bg-opacity-20 h-full"
        >
            <div class="max-h-64 relative flex justify-center items-center rounded-t-xl overflow-hidden border-b border-black">
                <span class="z-50 absolute text-7xl text-white text-shadow-max center"><img src="/user/avatar/{id}.png" id="user-avatar" onerror="this.src = '/user/avatar/__default.png'" alt="avatar" class="rounded-full w-40 h-auto shadow-xl" /></span>
                <img
                        id="user-banner"
                        src="/user/banner/{id}.png"
                        alt="banner"
                        class="rounded-t-xl w-full min-w-full overflow-hidden min-h-full flex-shrink-0 max-w-none transition-all duration-100 darken-image"
                        onerror="this.src = '/user/banner/__default.png'"
                />
            </div>
            <h1 class="text-6xl font-bold text-center m-6 border-b p-4">{username}</h1>
            <div class="flex md:flex-row flex-col border-b">
                <div class="h-full w-full">
                    <h1 class="text-center font-bold text-3xl m-4 p-2">Badges</h1>
                    <div class="flex flex-row m-4 gap-2 space-x-2 justify-evenly flex-wrap">
                    {#each info.badges as badge}
                        <img src="/assets/badges/{badge.toLowerCase()}.png" width="60px" alt="{badge}">
                    {/each}
                    </div>
                </div>
                <div class="h-full w-full md:relative m-4 flex flex-col space-y-2">
                    <h1 class="text-center font-bold text-3xl m-4 p-2">Info</h1>
                    <h1 class="text-2xl">Coins: <span class="absolute right-4">{info.coins} coin(s)</span></h1>
                    <h1 class="text-2xl">Tickets: <span class="absolute right-4">{info.ticket} ticket(s)</span></h1>
                    <h1 class="text-2xl">Levels: <span class="absolute right-4">{info.levels} level(s)</span></h1>
                    <h1 class="text-2xl">Exp: <span class="absolute right-4">{info.exp} exp(s)</span></h1>
                    <h1 class="text-2xl">Play count: <span class="absolute right-4">{info.playCount} time(s)</span></h1>
                    <h1 class="text-2xl">Replay watch: <span class="absolute right-4">{info.replayWatch} time(s)</span></h1>
                </div>
            </div>
            <div class="h-full w-full m-3 flex justify-center relative border-b p-3">
                <div class="wrapper w-9/12">
                    <h1 class="text-4xl font-bold relative">About Me</h1>
                    <span class="absolute top-2 right-10 bg-blue-500 p-2 text-white rounded-lg backdrop-filter cursor-pointer backdrop-blur-xl" on:click={() => window.location.href = "/profile/about"}>Edit</span>
                        <div id="aboutme" class="container max-w-full max-h-96 mt-6 overflow-scroll border-2 border-black p-2 shadow-xl rounded-lg">
                        </div>
                </div>
            </div>
            <div class="h-full w-full m-6 flex flex-row justify-left relative">
                <div class="wrapper">
                    <h1 class="font-bold text-4xl">Settings</h1>
                    <div class="space-y-4 flex flex-col">
                        <div class="flex flex-col p-3">
                            <form id="name-form" method="post">
                                <label for="username" class="text-2xl">Change username:</label><br>
                                <input type="text" name="username" id="username" placeholder="Enter new username..." class="focus:outline-none focus:ring ring-blue-500 ring-offset-2 rounded-sm border transition duration-200" />
                                <h1 class="text-gray-400">[ Require 200 tickets ]</h1>
                            </form>
                        </div>
                        <div class="flex flex-col p-3">
                            <form id="avatar-form" action="/api/user/avatar" class="space-y-3" method="post">
                                <label for="file" class="text-2xl">Change avatar:</label><br>
                                <input type="file" name="avatar" id="file" /><br>
                                <input type="submit" value="Submit" class="p-1 rounded-md text-white bg-green-500 cursor-pointer" />
                            </form>
                        </div>
                        <div class="flex flex-col p-3">
                            <form id="banner-form" class="space-y-3" method="post">
                                <label for="username" class="text-2xl">Change banner:</label><br>
                                <input type="file" name="banner" id="banner" /><br>
                                <input type="submit" value="Submit" class="p-1 rounded-md text-white bg-green-500 cursor-pointer" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>