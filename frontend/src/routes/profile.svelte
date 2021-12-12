<script context="module">
	//#region Load Session
	export async function load({ session }) {
		if (session.authenticated === true) {
			return {
				props: {
					username: session.username,
					id: session.id,
					info: session.info,
					about: session.about,
				}
			};
		} else {
			return {
				status: 302,
				redirect: '/auth/login'
			};
		}
	}
	//#endregion
</script>

<script lang="ts">
	//#region Modules
	import { onMount } from 'svelte';
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';
	//#endregion

	//#region Variables
	export let username;
	export let id;
	export let info;
	export let about;
	//#endregion

	//#region onMount
	onMount(() => {
		//#region Render about me
		document.getElementById('aboutme').innerHTML = about ? DOMPurify.sanitize(marked.parse(about)) : '<center>Nothing here...</center>'
		//#endregion

		//#region Image
		const fileToBase64 = async (file) =>
			new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result);
				reader.onerror = (e) => reject(e);
			});

		function isImage(file) {
			return !!file.type.match('image.*');
		}
		//#endregion

		//#region Banner
		document.getElementById('banner-form').addEventListener('submit', async (e) => {
			e.preventDefault();
			if(!info.badges.includes("Supporter")) {
				return alert("You need beta tester role to change banner!")
			}
			const file = document.getElementById('banner').files[0];
			if (!isImage(file)) {
				return alert('Not supported file type!');
			}
			const imageStr = await fileToBase64(file);
			await fetch('/api/user/banner', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
      				'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: id, img: imageStr })
			})
			alert('Success! It may take 30 minutes to update');
			window.location.reload();
		});
		//#endregion

		//#region Avatar
		document.getElementById('avatar-form').addEventListener('submit', async (e) => {
			e.preventDefault();			
			const file = document.getElementById('file').files[0];
			if (!isImage(file)) {
				return alert('Not supported file type!');
			}
			const imageStr = await fileToBase64(file);
			fetch('/api/user/avatar', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
      				'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: id, img: imageStr })
			});
			alert('Success! It may take 30 minutes to update');
			window.location.reload();
		});
		//#endregion

		//#region Name
		document.getElementById('name-form').addEventListener('submit', async (e) => {
			e.preventDefault();
			const newUsername = document.getElementById('username').value;
			if (!newUsername || newUsername === username) {
				return alert('Username must be different or not null!!');
			} else if(newUsername.length > 30) {
				return alert('Username length should less than 30 characters!')
			} else if (parseInt(info.ticket) < 200) {
				return alert("Not enough money!")
			}
			fetch('/api/user/name', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
      				'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: id, username: newUsername })
			});
			alert('Success!');
		});
		//#endregion

		//#region Logout
		document.getElementById('logout-form').addEventListener('submit', async (e) => {
			e.preventDefault();
			let confirmation = confirm("Are you sure you want to logout?")
			if(confirmation) {
				fetch('/api/auth/logout', {
					method: 'POST',
					body: JSON.stringify({id: id})
				});
				alert('Success!');
				window.location.href = '/auth/login'
			}
		});
		//#endregion

		//#region Don't like the game
		document.getElementById('delete-form').addEventListener('submit', async (e) => {
			e.preventDefault();
			let confirmation = confirm("All of your subscription and data WILL BE GONE FOREVER!\nAre you sure you want to delete your account?")
			if(confirmation) {
				window.location.href = "/profile/delete"
			}
		});
		//#endregion
	});
	//#endregion
</script>

<svelte:head>
	<title>{username}</title>
</svelte:head>

<main>
	<div class="h-full min-h-screen flex justify-center">
		<div
				class="bg-white relative {info.badges.includes('Supporter') ? 'shadow-violet-800/30' : ''} shadow-2xl lg:w-9/12 w-full md:m-6 my-4 rounded-xl backdrop-blur-xl bg-opacity-20 h-full"
		>
			<div
				class="max-h-72 h-full grid grid-cols-1 place-items-center static transition duration-300 justify-center items-center rounded-xl overflow-y-scroll border-b border-black"
				id="bannerContainer"
			>
				<span class="z-50 absolute top-18 text-7xl text-white text-shadow-max"
					><img
						src="https://arphros.imgix.net/storage/avatar/{id}.png?width=200&height=200&fit=crop&auto=compress&mask=ellipse&fm=png"
						id="user-avatar"
						onerror="this.src = 'https://arphros.imgix.net/storage/avatar/__default.png?width=200&height=200&fit=crop&auto=compress&mask=ellipse&fm=png'"
						alt="avatar"
						class="w-40 h-auto"
					/></span
				>
				<img
					id="user-banner"
					src="https://arphros.imgix.net/storage/banner/{id}.png"
					alt="banner"
					class="rounded-xl top-0 w-full min-w-full top-0 bottom-0 min-h-full object-bottom max-w-none h-full transition-all duration-100 darken-image"
					onerror="this.src = 'https://arphros.imgix.net/storage/banner/__default.png'"
				/>
			</div>
			<h1 class="text-6xl font-bold text-center p-4 {info.badges.includes('Supporter') ? 'text-violet-500' : ''}">{username}</h1>
			<h1 class="text-xl font-bold text-gray-400 text-center border-b mb-2">#{id}</h1>
			<div class="flex md:flex-row flex-col border-b">
				<div class="h-full w-full">
					<h1 class="text-center font-bold text-3xl m-4 p-2">Badges</h1>
					<div class="flex flex-row m-4 gap-2 space-x-2 justify-evenly flex-wrap">
						{#each info.badges as badge}
							<div class="has-tooltip">
								<span class='tooltip transition rounded shadow-lg p-1 bg-gray-100 border border-black -mt-10'>{badge.split('_').join(' ')}</span>
								<img src="/assets/badges/{badge.toLowerCase()}.png" width="60px" alt={badge} class="hover:scale-125 duration-150"/>
							</div>
						{/each}
					</div>
				</div>
				<div class="h-full w-full md:relative m-4 flex flex-col space-y-2">
					<h1 class="text-center font-bold text-3xl m-4 p-2">Info</h1>
					<h1 class="text-2xl">
						Coins: <span class="absolute right-4">{info.coins} coin(s)</span>
					</h1>
					<h1 class="text-2xl">
						Tickets: <span class="absolute right-4">{info.ticket} ticket(s)</span>
					</h1>
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
				</div>
			</div>
			<div class="h-full w-full m-3 flex justify-center relative border-b p-3">
				<div class="wrapper w-9/12">
					<h1 class="text-4xl font-bold relative">About Me</h1>
					<span
						class="absolute top-2 right-10 bg-blue-500 p-2 text-white rounded-lg backdrop-filter cursor-pointer backdrop-blur-xl"
						on:click={() => (window.location.href = '/profile/about')}>Edit</span
					>
					<div
						id="aboutme"
						class="container max-w-full max-h-96 mt-6 overflow-scroll border-2 border-black p-2 shadow-xl rounded-lg"></div>
				</div>
			</div>
			<div class="h-full w-full m-6 flex flex-row justify-left relative">
				<div class="wrapper">
					<h1 class="font-bold text-4xl">Settings</h1>
					<div class="space-y-4 flex flex-col">
						<div class="flex flex-col p-3">
							<form id="name-form" class="space-y-3 space-x-3">
								<label for="username" class="text-2xl">Change username:</label><br />
								<input
									type="text"
									name="username"
									id="username"
									placeholder="Enter new username..."
									class="focus:outline-none p-1 shadow-lg shadow-blue-500/40 focus:ring ring-blue-500 ring-offset-2 rounded-sm border duration-200 border-blue-400 rounded-md "
								/>
								<input
										type="submit"
										value="Submit"
										class="duration-200 p-2 rounded-full text-white bg-green-300/30 hover:bg-green-300/50 text-green-500 cursor-pointer shadow-lg shadow-green-500/30"
								/>
								<h1 class="text-gray-400">[ Require 200 tickets ]</h1>
							</form>
						</div>
						<div class="flex flex-col p-3">
							<form id="avatar-form" class="space-y-3">
								<label for="file" class="text-2xl">Change avatar:</label>
								<input type="file" name="avatar" id="file"
									   class="block w-full text-sm text-gray-500
									   file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
									   file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700
									   hover:file:bg-violet-100"
								/>
								<input
									type="submit"
									value="Submit"
									class="duration-200 p-2 rounded-full text-white bg-green-300/30 hover:bg-green-300/50 text-green-500 cursor-pointer shadow-lg shadow-green-500/30"
								/>
							</form>
						</div>
						<div class="flex flex-col p-3">
							<form id="banner-form" class="space-y-3">
								<label for="username" class="text-2xl">Change banner:</label>
								<input type="file" name="banner" id="banner"
									   class="block w-full text-sm text-gray-500
									   file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
									   file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700
									   hover:file:bg-violet-100"
								/>
								<input
									type="submit"
									value="Submit"
									id="banner-submit"
									class="duration-200 p-2 rounded-full text-white bg-green-300/30 hover:bg-green-300/50 text-green-500 cursor-pointer shadow-lg shadow-green-500/30"
								/>
							</form>
						</div>
						<div class="flex md:flex-row flex-col gap-8 p-3">
							<form id="logout-form" class="space-y-3">
								<label for="login" class="text-2xl text-red-500">Logout of the account</label><br />
								<input
										type="submit"
										value="Logout"
										class="duration-200 p-2 rounded-full text-white bg-red-300/30 hover:bg-red-300/50 text-red-500 cursor-pointer shadow-lg shadow-red-500/30"
								/>
							</form>
						<form id="delete-form" class="space-y-3">
								<label for="delete" class="text-2xl text-red-500">Delete the account</label><br />
								<input
										type="submit"
										value="Delete"
										class="duration-200 p-2 rounded-full text-white bg-red-300/30 hover:bg-red-300/50 text-red-500 cursor-pointer shadow-lg shadow-red-500/30"
								/>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>