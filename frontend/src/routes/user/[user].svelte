<script lang="ts">
	//#region Modules
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';
	import { page } from '$app/stores';
	//#endregion
	//#region Variables
	export let username
	export let info;
	export let about;
	export let user = $page.params.user;
	//#endregion
	//#region Fetch data
	async function fetchData() {
			let rawData = await fetch('https://arphros.vercel.app/api/user/user', {
				method: 'POST',
				body: JSON.stringify({id: user})
			});
			let data = await rawData.json();
			return data
		}
		//#endregion
</script>

<svelte:head>
	{#await fetchData() then data}
		<title>Arphros | {data.user.username}</title>
	{/await}
</svelte:head>
{#await fetchData()}
	<main class="flow text-gray-400">
		<div class="h-full min-h-screen flex justify-center">
			<div
					class="bg-white relative shadow-2xl lg:w-9/12 w-full md:m-6 my-4 rounded-xl backdrop-blur-xl bg-opacity-20 h-full"
			>
				<div
						class="max-h-72 h-full grid grid-cols-1 place-items-center static transition duration-300 justify-center items-center rounded-t-xl overflow-y-scroll border-b border-black"
				>
				<span class="z-50 absolute top-18 text-7xl text-white text-shadow-max"
				><img
						src="https://arphros.ddns.net:5000/storage/avatar/{user}.png?width=200&height=200&fit=crop&auto=compress&mask=ellipse&fm=png"
						onerror="this.src = 'https://arphros.ddns.net:5000/storage/avatar/__default.png'"
						alt="avatar"
						class="w-40 h-40 object-center object-cover rounded-full"
				/></span
				>
					<img
							src="https://arphros.ddns.net:5000/storage/banner/{user}.png"
							alt="banner"
							class="rounded-t-xl top-0 w-full min-w-full top-0 bottom-0 min-h-full object-bottom max-w-none h-full transition-all duration-100 darken-image"
							onerror="this.src = 'https://arphros.ddns.net:5000/storage/banner/__default.png'"
					/>
				</div>
				<h1 class="text-6xl font-bold text-center p-4 animate-pulse">...............</h1>
				<h1 class="text-xl font-bold text-gray-400 text-center border-b mb-2">#{user}</h1>
				<div class="flex md:flex-row flex-col border-b">
					<div class="h-full w-full animate-pulse">
						<h1 class="text-center font-bold text-3xl m-4 p-2 ">...............</h1>
						<div class="flex flex-row m-4 gap-2 space-x-2 justify-evenly flex-wrap">
						</div>
					</div>
					<div class="h-full w-full md:relative m-4 flex flex-col space-y-2 animate-pulse">
						<h1 class="text-center font-bold text-3xl m-4 p-2">...............</h1>
						<h1 class="text-2xl">
							........<span class="absolute right-4">.......</span>
						</h1>
						<h1 class="text-2xl">...<span class="absolute right-4">..........</span></h1>
						<h1 class="text-2xl">
							............... <span class="absolute right-4">...........</span>
						</h1>
						<h1 class="text-2xl">
							........... <span class="absolute right-4">.........</span>
						</h1>
					</div>
				</div>
				<div class="h-full w-full m-3 flex justify-center relative border-b p-3">
					<div class="wrapper w-9/12">
						<h1 class="text-4xl font-bold relative animate-pulse">.....................</h1>
						<div
								id="aboutme"
								class="container max-w-full max-h-96 mt-6 overflow-scroll border-2 border-black p-2 shadow-xl rounded-lg"
						>
							...
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
{:then data}
<main>
	<div class="h-full min-h-screen flex justify-center">
		<div
				class="bg-white relative {JSON.parse(data.user.info).badges.includes('Supporter') ? 'shadow-violet-800/30' : ''} shadow-2xl lg:w-9/12 w-full md:m-6 my-4 rounded-xl backdrop-blur-xl bg-opacity-20 h-full"
		>
			<div
					class="max-h-72 h-full grid grid-cols-1 place-items-center static transition duration-300 justify-center items-center rounded-t-xl overflow-y-scroll border-b border-black"
					id="bannerContainer"
			>
				<span class="z-50 absolute top-18 text-7xl text-white text-shadow-max"
				><img
						src="https://arphros.ddns.net:5000/storage/avatar/{user}.png?width=200&height=200&fit=crop&auto=compress&mask=ellipse&fm=png"
						id="user-avatar"
						onerror="this.src = 'https://arphros.ddns.net:5000/storage/avatar/__default.png'"
						alt="avatar"
						class="w-40 h-40 object-center object-cover rounded-full"
				/></span
				>
				<img
						id="user-banner"
						src="https://arphros.ddns.net:5000/storage/banner/{user}.png"
						alt="banner"
						class="rounded-t-xl top-0 w-full min-w-full top-0 bottom-0 min-h-full object-bottom max-w-none h-full transition-all duration-100 darken-image"
						onerror="this.src = 'https://arphros.ddns.net:5000/storage/banner/__default.png'"
				/>
			</div>
			<h1 class="text-6xl font-bold text-center p-4 {JSON.parse(data.user.info).badges.includes('Supporter') ? 'text-violet-500' : ''}">{data.user.username}</h1>
			<h1 class="text-xl font-bold text-gray-400 text-center border-b mb-2">#{user}</h1>
			<div class="flex md:flex-row flex-col border-b">
				<div class="h-full w-full">
					<h1 class="text-center font-bold text-3xl m-4 p-2">Badges</h1>
					<div class="flex flex-row m-4 gap-2 space-x-2 justify-evenly flex-wrap">
							{#each JSON.parse(data.user.info).badges as badge}
								<div class="has-tooltip">
									<span class='tooltip transition rounded shadow-lg p-1 bg-gray-100 border border-black -mt-10'>{badge.split('_').join(' ')}</span>
									<img src="/assets/badges/{badge.toLowerCase()}.png" width="60px" alt={badge} />
								</div>
							{/each}
					</div>
				</div>
				<div class="h-full w-full md:relative m-4 flex flex-col space-y-2">
					<h1 class="text-center font-bold text-3xl m-4 p-2">Info</h1>
						<h1 class="text-2xl">
							Levels: <span class="absolute right-4">{JSON.parse(data.user.info).levels} level(s)</span>
						</h1>
						<h1 class="text-2xl">Exp: <span class="absolute right-4">{JSON.parse(data.user.info).exp} exp(s)</span></h1>
						<h1 class="text-2xl">
							Play count: <span class="absolute right-4">{JSON.parse(data.user.info).playCount} time(s)</span>
						</h1>
						<h1 class="text-2xl">
							Replay watch: <span class="absolute right-4">{JSON.parse(data.user.info).replayWatch} time(s)</span>
						</h1>
				</div>
			</div>
			<div class="h-full w-full m-3 flex justify-center relative border-b p-3">
				<div class="wrapper w-9/12">
					<h1 class="text-4xl font-bold relative">About Me</h1>
					<div
						id="aboutme"
						class="container max-w-full max-h-96 mt-6 overflow-scroll border-2 border-black p-2 shadow-xl rounded-lg"
					>
						{@html data.user.about ? DOMPurify.sanitize(marked.parse(data.user.about)) : 'Nothing but darkness...'}
					</div>
				</div>
			</div>
		</div>
	</div>
</main>
{/await}