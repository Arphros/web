<script lang="ts">
    import {goto} from '$app/navigation';
    import {page} from '$app/stores'

    export let sort = $page.query.get('sort') ?? 'newest'
    export let author = $page.query.get('author')
    export let tags = $page.query.get('tags')
    export let limit = $page.query.get('limit') || 10

    export let blogs = fetch(`https://arphros.ddns.net:5000/blogs/getAllBlogs?limit=${limit}`).then(res => res.json())
</script>

<svelte:head>
    <title>Arphros | Blog</title>
</svelte:head>

<main>
    <div class="h-full min-h-screen flex justify-center">
        <div
                class="bg-white shadow-2xl lg:w-9/12 w-full md:m-6 my-4 rounded-xl backdrop-blur-xl backdrop-filter bg-opacity-20 h-full"
        >
            <div
                    class="top-0 left-0 w-full h-20 bg-gradient-to-r from-indigo-700/70 via-violet-700/70 to-blue-700/70 mb-4 backdrop-blur-xl backdrop-filter bg-opacity-70 flex justify-center items-center rounded-t-xl"
            >
                <h1 class="text-white text-4xl font-bold">Blogs</h1>
            </div>
            <div class="grid md:grid-cols-1 grid-rows-1 h-full w-full">
                <div class="relative">
                    <div class="p-2">
                        <select
                                bind:value={sort}
                                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                                on:change={$page.query.set('sort', sort)}
                        >
                            <option value="">Sort by</option>
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                        <form action="/blog/findBlog" method="GET">
                            <input class="block mt-4 mx-auto w-md border border-black rounded-lg focus:ring ring-blue-300 focus:ring-offset-2 p-1"
                                   name="query"
                                   placeholder="Search..."
                                   type="text"/>
                        </form>
                    </div>
                    <div class="flex flex-col my-6 gap-y-6">
                        {#await blogs then allBlog}
                            {#each (sort.toLowerCase() === 'oldest' ? allBlog.blogs : allBlog.blogs.reverse()) as blog}
                                {#if !author || blog[0].author.toLowerCase() === author.toLowerCase()}
                                    {#if !tags || blog[0].tags.map(str => str.trim()).includes(tags.toLowerCase())}
                                        <center>
                                            <div on:click={() => { goto(`/blog/${blog[0].id}`) }}
                                                 class="relative container cursor-pointer grid grid-cols-1 border shadow-lg shadow-violet-600/30 rounded-lg max-h-48 max-w-xl">
                                                <img src="/blog-assets/{blog[0].id}/main.png" alt=""
                                                     class="rounded-t-lg top-0 w-full min-w-full top-0 bottom-0 min-h-full object-bottom max-w-none h-full"/>
                                                <h1 class="text-black text-3xl font-bold p-2 truncate">{blog[0].title}</h1>
                                                <div class="flex flex-rows justify-evenly">
                                                    <p class="text-gray-500 text-md truncate">{blog[0].author}</p>
                                                    <p class="text-gray-500 text-md truncate">{blog[0].tags}</p>
                                                    <p class="text-gray-500 text-md truncate">{blog[0].dateWritten}</p>
                                                </div>
                                            </div>
                                        </center>
                                    {/if}
                                {/if}
                            {/each}
                        {/await}
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
