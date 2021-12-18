<script lang="ts">
    import {goto} from '$app/navigation';
    import {page} from '$app/stores'

    export let query = $page.query.get('query')

    if (!query) {
        goto('/levels')
    }

    export let levels = fetch('http://localhost:3000/api/level/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: query
        })
    })
</script>

<svelte:head>
    <title>Arphros | Levels</title>
</svelte:head>


<main>
    <div class="h-full min-h-screen flex justify-center">
        <div
                class="bg-white shadow-2xl lg:w-9/12 w-full md:m-6 my-4 rounded-xl backdrop-blur-xl backdrop-filter bg-opacity-20 h-full"
        >
            <div
                    class="top-0 left-0 w-full h-20 bg-gradient-to-r from-indigo-700/70 via-violet-700/70 to-blue-700/70 mb-4 backdrop-blur-xl backdrop-filter bg-opacity-70 flex justify-center items-center rounded-t-xl"
            >
                <h1 class="text-white text-4xl font-bold">Levels</h1>
            </div>
            <div class="grid md:grid-cols-1 grid-rows-1 h-full w-full">
                <div class="relative">
                    <div class="p-2">
                        <form action="/levels/findLevel" method="GET">
                            <input class="block mt-4 mx-auto w-md border border-black rounded-lg focus:ring ring-blue-300 focus:ring-offset-2 p-1"
                                   name="query"
                                   placeholder="Search..."
                                   type="text"/>
                        </form>
                    </div>
                    <div class="grid md:grid-cols-2 grid-cols-1 gap-8">
                        {#await levels then allLvls}
                            {#await allLvls.json() then lvls}
                                {#each lvls.levels as lvl}
                                    <center>
                                        <div on:click={() => { goto(`/levels/${lvl.id}`) }}
                                             class="relative container cursor-pointer grid grid-cols-1 border shadow-lg shadow-violet-600/30 rounded-lg max-h-48 max-w-xl">
                                            <img src="https://arphros.ddns.net:5000levels/{lvl.id}/main.png" alt="main"
                                                 onerror="this.src='https://arphros.ddns.net:5000levels/__default.png'"
                                                 class="rounded-t-lg top-0 w-full min-w-full top-0 bottom-0 min-h-full object-bottom max-w-none h-full"/>
                                            <h1 class="text-black text-3xl font-bold p-2 truncate">{lvl.name}</h1>
                                            <div class="flex flex-rows justify-evenly">
                                                <p class="text-gray-500 text-md truncate">{lvl.author_name}</p>
                                            </div>
                                        </div>
                                    </center>
                                {/each}
                            {/await}
                        {/await}
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
