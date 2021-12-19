<script lang="ts">
    import {goto} from '$app/navigation';

    export let blogs = fetch('https://arphros.ddns.net:5000/blogs/getAllBlogs?limit=4').then(res => res.json())
    export let levels = fetch('https://arphros.vercel.app/api/level/getAll', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            limit: 5
        })
    })
</script>

<svelte:head>
    <title>Arphros | Home</title>
</svelte:head>

<main>
    <div class="h-full min-h-screen flex justify-center">
        <div
                class="bg-white relative shadow-2xl lg:w-9/12 w-full md:m-6 my-4 rounded-xl backdrop-blur-xl bg-opacity-20 h-full"
        >
            <div
                    class="top-0 left-0 w-full h-20 bg-gradient-to-r from-indigo-700/70 via-violet-700/70 to-blue-700/70 backdrop-blur-xl backdrop-filter bg-opacity-70 flex justify-center items-center rounded-t-xl"
            >
                <h1 class="text-white text-4xl font-bold">Home</h1>
            </div>
            <div class="grid md:grid-cols-2 grid-rows-2 gap-4 m-6 h-full w-full">
                <div class="blog">
                    <h1 class="text-3xl font-bold">Blog</h1>
                    <div class="flex flex-col gap-y-4 m-4">
                        {#await blogs then allBlog}
                            {#each allBlog.blogs.reverse() as blog}
                                <div on:click={() => { goto(`/blog/${blog[0].id}`) }}
                                     class="container cursor-pointer grid grid-cols-1 border shadow-lg shadow-violet-600/30 rounded-lg h-full">
                                    <img src="/blog-assets/{blog[0].id}/main.png" alt=""
                                         class="rounded-t-lg top-0 w-full min-w-full top-0 bottom-0 min-h-full object-bottom max-w-none h-full"/>
                                    <h1 class="text-black text-3xl font-bold p-2 truncate">{blog[0].title}</h1>
                                </div>
                            {/each}
                        {/await}
                        <a href="/blog/blog"
                        >
                            <button
                                    class="md:w-full mt-4 p-3 bg-gradient-to-r from-indigo-700/70 to-violet-700/70 bg-opacity-80 backdrop-blur-xl shadow-xl text-white rounded-lg"
                            >See all blogs
                            </button
                            >
                        </a>
                    </div>
                </div>
                <div class="levels">
                    <h1 class="text-3xl font-bold">Play Arphros</h1>
                    <div class="flex flex-row space-x-4 items-stretch max-w-lg">
                        <a href="#download"
                        >
                            <button
                                    class="md:w-full mt-4 p-3 bg-gradient-to-r from-indigo-700/70 to-violet-700/70 bg-opacity-80 backdrop-blur-xl backdrop-filter shadow-xl text-white rounded-lg"
                            >Download Arphros
                            </button
                            >
                        </a
                        >
                        <a href="arphros://play"
                        >
                            <button
                                    class="md:w-full mt-4 p-3 shadow-xl bg-gradient-to-r from-indigo-700/70 to-violet-700/70 bg-opacity-80 backdrop-blur-xl backdrop-filter text-white rounded-lg"
                            >Play Arphros
                            </button
                            >
                        </a
                        >
                    </div>
                    <h1 class="text-3xl font-bold mt-4">Latest Levels</h1>
                    <div class="flex flex-col gap-8 mt-4">
                        {#await levels then allLvls}
                            {#await allLvls.json() then lvls}
                                {#each lvls.levels as lvl}
                                    <div on:click={() => { goto(`/levels/${lvl.id}`) }}
                                         class="relative container cursor-pointer grid grid-cols-1 border shadow-lg shadow-violet-600/30 rounded-lg max-h-48 max-w-md">
                                        <img src="https://arphros.ddns.net:5000/levels/{lvl.id}/main.png" alt="main"
                                             onerror="this.src='https://arphros.ddns.net:5000/levels/__default.png'"
                                             class="rounded-t-lg top-0 w-full min-w-full top-0 bottom-0 min-h-full object-bottom max-w-none h-full"/>
                                        <h1 class="text-black text-3xl font-bold p-2 truncate">{lvl.name}</h1>
                                        <div class="flex flex-rows justify-left">
                                            <p class="text-gray-500 text-md truncate">{lvl.author_name}</p>
                                        </div>
                                    </div>
                                {/each}
                            {/await}
                        {/await}
                        <button
                                class="w-full max-w-md mt-4 p-3 bg-gradient-to-r from-indigo-700/70 to-violet-700/70 bg-opacity-80 backdrop-blur-xl shadow-xl text-white rounded-lg"
                                on:click={() => goto('/levels')}
                        >See all levels
                        </button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
