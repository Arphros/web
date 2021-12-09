<script lang="ts">
	//#region Modules
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';
	import { page } from '$app/stores';
	//#endregion

	//#region Variables
	export let username = "Ghost";
	export let info;
	export let about;
	export let user = $page.params.user;
	//#endregion

	//#region onMount
	onMount(async () => {
		//#region Fetch data
		let rawData = await fetch('/api/user/user', {
			method: 'POST',
			body: JSON.stringify({ id: user })
		});
		let data = await rawData.json();
		username = data.user.username;
		about = data.user.about;
		info = JSON.parse(data.user.info);
		//#endregion
		//#region Render about me
		document.getElementById('aboutme').innerHTML = about ? DOMPurify.sanitize(marked.parse(about)) : '<center>Nothing here yet...</center>'

		//#endregion
	});
	//#endregion
</script>
<svelte:head>
	{#if username && username !== "Ghost"}
	<title>Arphros | {username}</title>
	{/if}
</svelte:head>


<main>
	<div class="h-full min-h-screen flex justify-center">
		<div
			class="bg-white shadow-2xl max-w-full md:w-9/12 w-full m-6 rounded-xl backdrop-blur-xl backdrop-filter bg-opacity-20 h-full"
		>
			<div
					class="max-h-72 h-full grid grid-cols-1 place-items-center static transition duration-300 justify-center items-center rounded-t-xl overflow-y-scroll border-b border-black"
					id="bannerContainer"
			>
				<span class="z-50 absolute top-18 text-7xl text-white text-shadow-max"
				><img
						src="https://arphros.imgix.net/avatar/{user}.png"
						id="user-avatar"
						onerror="this.src = 'https://arphros.imgix.net/user/avatar/__default.png'"
						alt="avatar"
						class="rounded-full w-40 h-auto"
				/></span
				>
				<img
						id="user-banner"
						src="https://arphros.imgix.net/banner/{user}.png"
						alt="banner"
						class="rounded-t-xl top-0 w-full min-w-full top-0 bottom-0 min-h-full object-bottom max-w-none h-full transition-all duration-100 darken-image"
						onerror="this.src = 'https://arphros.imgix.net/banner/__default.png'"
				/>
			</div>
			<h1 class="text-6xl font-bold text-center p-4">{username}</h1>
			<h1 class="text-xl font-bold text-gray-400 text-center border-b mb-2">#{user}</h1>
			<div class="flex md:flex-row flex-col border-b">
				<div class="h-full w-full">
					<h1 class="text-center font-bold text-3xl m-4 p-2">Badges</h1>
					<div class="flex flex-row m-4 gap-2 space-x-2 justify-evenly flex-wrap">
						{#if info}
							{#each info.badges as badge}
								<img src="/assets/badges/{badge.toLowerCase()}.png" width="60px" alt={badge} />
							{/each}
						{/if}
					</div>
				</div>
				<div class="h-full w-full md:relative m-4 flex flex-col space-y-2">
					<h1 class="text-center font-bold text-3xl m-4 p-2">Info</h1>
					{#if info}
						<h1 class="text-2xl">
							Levels: <span class="absolute right-4">{info.levels} level(s)</span>
						</h1>
						<h1 class="text-2xl">Exp: <span class="absolute right-4">{info.exp} exp(s)</span></h1>
						<h1 class="text-2xl">
							Play count: <span class="absolute right-4">{info.playCount} time(s)</span>
						</h1>
						<h1 class="text-2xl">
							Replay watch: <span class="absolute right-4">{info.replayWatch} time(s)</span>
						</h1>
					{/if}
				</div>
			</div>
			<div class="h-full w-full m-3 flex justify-center relative border-b p-3">
				<div class="wrapper w-9/12">
					<h1 class="text-4xl font-bold relative">About Me</h1>
					<div
						id="aboutme"
						class="container max-w-full max-h-96 mt-6 overflow-scroll border-2 border-black p-2 shadow-xl rounded-lg"
					/>
				</div>
			</div>
		</div>
	</div>
</main>
