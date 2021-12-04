<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from "svelte";

    export let username
    export let id
    export let user = $page.params.user

    onMount(async() => {
        const userBanner = document.getElementById("user-banner");
        if(userBanner.height === 24 || userBanner.height === 0) {
            userBanner.src = "/user/banner/__default.png";
        }
        fetch('http://localhost:3000/api/auth/user', { method: "POST", body: JSON.stringify({ id: user }) })
        .then(res => res.json())
        .then((data) => {
            username = data.user.username
        })
    })
</script>

<main>
    <div class="h-full flex justify-center">
        <div
                class="bg-white shadow-2xl max-w-9xl w-9/12 m-6 rounded-xl backdrop-blur-xl backdrop-filter bg-opacity-20 max-h-full h-full"
        >
            <div class="max-h-64 relative inline-block overflow-hidden border-b border-black">
                <span class="z-50 absolute text-7xl text-white text-shadow-max center">{username}</span>
                <img
                        id="user-banner"
                        src="/user/banner/{id}.png"
                        alt="banner"
                        class="rounded-t-xl w-full transition-all duration-100 darken-image"
                />
            </div>
            <h1 class="text-6xl font-bold text-center m-6 border-t p-4">User {username}</h1>
        </div>
    </div>
</main>