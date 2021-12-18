<script lang="ts">
    //#region Modules
    import {marked} from 'marked';
    import {page} from '$app/stores';
    import DOMPurify from "dompurify";
    import {goto} from '$app/navigation';
    //#endregion
    //#region Variables
    export let id = $page.params.id;
    export let difficulty = {
        0: 'N/A',
        1: 'Easy',
        2: 'Medium',
        3: 'Hard',
        4: 'Insane'
    };
    //#endregion
    //#region Fetch data
    async function fetchData() {
        let rawData = await fetch('https://arphros.vercel.app/api/level/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        });
        let jsonData = await rawData.json()
        return jsonData.levels[0];
    }

    //#endregion
</script>

<svelte:head>
    {#await fetchData() then data}
        <title>Levels | {data.name}</title>
    {/await}
</svelte:head>
{#await fetchData() then data}
    <main>
        <div class="h-full min-h-screen flex justify-center">
            <div
                    class="bg-white shadow-2xl lg:w-9/12 w-full md:m-6 my-4 rounded-xl backdrop-blur-xl bg-opacity-20 h-full"
            >
                <div class="relative md:h-full h-64">
                    <div class="absolute top-0 left-0">
                        <h1 class="md:text-4xl text-lg rounded-t-lg text-white m-2 bg-black/30 p-2">{JSON.parse(data.musicInfo).name}</h1>
                        <h1 class="md:text-2xl text-sm rounded-b-lg text-white m-2 bg-black/30 p-2">{JSON.parse(data.musicInfo).author}</h1>

                    </div>
                    <a href="/user/{data.author_id}"><img
                            src="https://arphros.ddns.net:5000/storage/avatar/{data.author_id}.png?width=200&height=200&fit=crop&auto=compress&mask=ellipse&fm=png"
                            id="user-avatar"
                            onerror="this.src = 'https://arphros.ddns.net:5000/storage/avatar/__default.png'"
                            alt="avatar"
                            class="w-20 h-20 bottom-0 m-2 border object-center object-cover rounded-full absolute"
                    /></a>
                    <img
                            src="https://arphros.ddns.net:5000level/{data.id}/main.png"
                            onerror="this.src='https://arphros.ddns.net:5000levels/__default.png'"
                            class="rounded-t-xl w-full h-full filter"
                    />
                    <div class="flex flex-row absolute bottom-0 right-0 gap-4 m-2">
                        <button class="bg-gradient-to-r from-indigo-700/30 to-violet-700/30 p-2 rounded-lg text-white"
                                on:click={() => goto('https://arphros.ddns.net:5000levels/1/map.cts')}>
                            Download
                        </button>
                        <button class="bg-gradient-to-r from-indigo-700/30 to-violet-700/30 p-2 rounded-lg text-white"
                                on:click={() => goto(`arphros://;u[play:${data.id}`)}>Play
                        </button>
                    </div>
                </div>
                <div class="flex flex-col justify-center p-6" id="aboutme">
                    <h1 class="text-4xl font-bold text-center">{data.name}</h1>
                    <div class="flex md:flex-row flex-col md:text-left text-center justify-evenly">
                        <p class="text-gray-500">Author: <a href="/user/{data.author_id}">{data.author_name}</a></p>
                        <p class="text-gray-500">Download: {JSON.parse(data.statsInfo).download} times</p>
                        <p class="text-gray-500">Length: {JSON.parse(data.statsInfo).time} seconds</p>
                    </div>
                    <div class="flex flex-col gap-2 mt-3">
                        <div class="bg-gray-300 rounded-lg p-2">
                            <p class="text-gray-500">Genre: {JSON.parse(data.musicInfo).genre}</p>
                            <p class="text-gray-500">Theme: {JSON.parse(data.musicInfo).theme} </p>
                            <p class="text-gray-500">Difficulty: {difficulty[JSON.parse(data.levelInfo).diff]} </p>
                        </div>
                        <div class="description w-full">
                            {@html DOMPurify.sanitize(marked.parse(data.description))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
{/await}