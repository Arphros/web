<script lang="ts">
    //#region Modules
    import { marked } from 'marked';
    import { page } from '$app/stores';
    //#endregion
    //#region Variables
    export let id = $page.params.id;
    //#endregion
    //#region Fetch data
    async function fetchData() {
        let rawData = await fetch(`http://localhost:5000/blogs/getBlog?id=${id}`, {
            method: 'GET',
        });
        let data = await rawData.json();
        return data
    }
    //#endregion
</script>

<svelte:head>
    {#await fetchData() then data}
        <title>Bloggers | {data.title}</title>
    {/await}
</svelte:head>
{#await fetchData() then data}
    <main>
        <div class="h-full min-h-screen flex justify-center">
            <div
                    class="bg-white relative shadow-2xl lg:w-9/12 w-full md:m-6 my-4 rounded-xl backdrop-blur-xl bg-opacity-20 h-full"
            >
                <img
                        src="/blog-assets/{id}/main.png"
                        class="rounded-t-xl w-full filter"
                />
                <div class="flex flex-col justify-center p-6" id="aboutme">
                    <h1 class="text-4xl font-bold text-center">{data.title}</h1>
                    <div class="flex flex-row justify-evenly">
                        <p class="text-gray-500">Author: {data.author}</p>
                        <p class="text-gray-500">Date: {data.dateWritten}</p>
                        <p class="text-gray-500">Category: {data.tags}</p>
                    </div>
                    {@html marked.parse(data.content)}
                </div>
            </div>
        </div>
    </main>
{/await}

<style>
    :global(img) {
        width: 400px;
        height: auto;
        transition: all 0.3s cubic-bezier(0.87, 0, 0.13, 1);
    }

    :global(img:hover) {
        width: 1000px;
        height: auto;
    }
</style>