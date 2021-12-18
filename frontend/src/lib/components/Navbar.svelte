<script lang="ts">
    import {goto} from '$app/navigation';
    import {onMount} from "svelte";

    let states = 0
    onMount(() => {
        document.getElementById("en-mb-nav").addEventListener('click', (e) => {
            e.preventDefault();
            if (states === 0) {
                document.getElementById("mb-nav").classList.remove("hidden");
                states = 1;
            } else {
                document.getElementById("mb-nav").classList.add("hidden");
                states = 0;
            }
        })
    })
</script>

<nav
        class="md:block hidden bg-gradient-to-r from-indigo-700/70 via-violet-700/70 to-blue-700/70 backdrop-blur-2xl top-0 z-50 sticky w-full md:p-2 text-white duration-200"
>
    <div class="flex md:flex-row flex-col gap-3 w-full relative">
        <h1 class="nav-btn" on:click={() => goto('/')}>Home</h1>
        <h1 class="nav-btn" on:click={() => goto('/levels')}>Levels</h1>
        <h1 class="nav-btn" on:click={() => goto('/chat/chat')}>Chat</h1>
        <h1 class="nav-btn" on:click={() => goto('/donations')}>Donations</h1>
        <h1 class="nav-btn md:right-0 md:absolute" on:click={() => goto('/profile')}>Profile</h1>
    </div>
</nav>

<nav
        class="block md:hidden bg-gradient-to-r from-indigo-700/70 to-violet-700/70 backdrop-blur-2xl top-0 z-50 sticky w-full md:p-2 text-white duration-200"
>
    <div class="p-2 flex flex-row relative">
        <h1 class="nav-btn" on:click={() => goto('/')}>Arphros</h1>
        <a href="/"><h1 class="absolute m-2 right-0" id="en-mb-nav"><img
                src="https://img.icons8.com/material-outlined/24/ffffff/menu--v3.png"/></h1></a>
    </div>
    <div class="hidden flex md:flex-row flex-col gap-3 w-full relative" id="mb-nav">
        <h1 class="nav-btn" on:click={() => goto('/levels')}>Levels</h1>
        <h1 class="nav-btn" on:click={() => goto('/chat/chat')}>Chat</h1>
        <h1 class="nav-btn" on:click={() => goto('/support')}>Support</h1>
        <h1 class="nav-btn md:right-0 md:absolute" on:click={() => goto('/profile')}>Profile</h1>
    </div>
</nav>
