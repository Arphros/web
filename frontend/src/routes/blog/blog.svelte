<script lang="ts">
    import { goto } from '$app/navigation';

    export let blogs = fetch('https://arphros.ddns.net:5000/blogs/getAllBlogs').then(res => res.json())
</script>

<svelte:head>
    <title>Arphros | Blog</title>
</svelte:head>

<main>
    <div class="h-full min-h-screen flex justify-center">
        <div
                class="bg-white static shadow-2xl lg:w-9/12 w-full md:m-6 my-4 rounded-xl backdrop-blur-xl backdrop-filter bg-opacity-20 h-full"
        >
            <div
                    class="top-0 left-0 w-full h-20 bg-gradient-to-r from-indigo-700/70 via-violet-700/70 to-blue-700/70 mb-4 backdrop-blur-xl backdrop-filter bg-opacity-70 flex justify-center items-center rounded-t-xl"
            >
                <h1 class="text-white text-4xl font-bold">Blogs</h1>
            </div>
            <div class="grid md:grid-cols-1 grid-rows-1 h-full w-full">
                <div class="blog">
                    <div class="flex flex-col gap-y-8">
                        {#await blogs then allBlog}
                            {#each allBlog.blogs as blog}
                                <center>
                                <div on:click={() => { goto(`/blog/${blog[0].id}`) }} class="relative container cursor-pointer grid grid-cols-1 border shadow-lg shadow-violet-600/30 rounded-lg max-h-48 max-w-xl">
                                    <img src="/blog-assets/{blog[0].id}/main.png"  alt="" class="rounded-t-lg top-0 w-full min-w-full top-0 bottom-0 min-h-full object-bottom max-w-none h-full"/>
                                    <h1 class="text-black text-3xl font-bold p-2 truncate">{blog[0].title}</h1>
                                </div>
                                </center>
                            {/each}
                        {/await}
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
