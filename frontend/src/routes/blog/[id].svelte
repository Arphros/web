<script lang="ts">
    //#region Modules
    import { marked } from 'marked';
    import { page } from '$app/stores';
    import DOMPurify from "dompurify";
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
                        <p class="text-gray-500">Author: <a href="/blog/blog?author={data.author}">{data.author}</a></p>
                        <p class="text-gray-500">Date: {data.dateWritten}</p>
                        <p class="text-gray-500">Category:
                            {#each data.tags as tag, idx}
                                <a href="/blog/blog?tags={tag.trim()}">{idx + 1 === data.tags.length ? tag.trim() : tag.trim() + ', '}</a>
                            {/each}
                        </p>
                    </div>
                    {@html DOMPurify.sanitize(marked.parse(data.content))}
                </div>
            </div>
        </div>
    </main>
{/await}