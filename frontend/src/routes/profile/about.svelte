<script context="module">
	//#region Load Session
	export async function load({ session }) {
		if (session.authenticated === true) {
			return {
				props: {
					id: session.id,
					about: session.about,
					info: session.info
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
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';
	import { onMount } from 'svelte';
	//#endregion

	//#region Variables
	export let id;
	export let about;
	export let info;
	//#endregion

	//#region OnMount
	onMount(async () => {
		//#region Save
		document.getElementById('save').addEventListener('click', async (e) => {
			e.preventDefault();
			let value = document.getElementById('textarea').value;
			if(!info.badges.includes("Supporter")) {
				return alert("You need to be supporter to save!")
			}
			fetch('/api/user/about', { method: 'POST', body: JSON.stringify({ value: value, id: id }) })
				.then((res) => res.json())
				.then((data) => {
					if (!data.message === 'Success!') {
						alert('Error while saving data!');
					} else {
						alert('Success!');
					}
				});
		});
		//#endregion

		//#region Render Markdown
		document.getElementById('form').addEventListener('submit', (e) => {
			e.preventDefault();
			document.getElementById('aboutme').innerHTML = DOMPurify.sanitize(
				marked.parse(document.getElementById('textarea').value)
			);
		});
		//#endregion
	});
	//#endregion
</script>

<main class="min-h-screen">
	<div class="flex md:flex-row flex-col space-x-2 items-stretch">
		<div class="flex justify-center">
			<form id="form">
				<h1 class="m-4 text-sm">
					Powered by Marked and DOMPurify <br /> ( Markdown, HTML, CSS and TailwindCSS supported )
				</h1>
				<textarea
					id="textarea"
					cols="100"
					rows="15"
					class="m-4 p-4 focus:outline-none focus:ring ring-blue-500 ring-offset-2 rounded-lg transition duration-200 border border-black shadow-xl"
					>{about}</textarea
				>
				<div class="flex justify-center space-x-2">
					<center
						><input
							type="submit"
							value="Render!"
							class="p-2 rounded-lg text-white bg-blue-800 cursor-pointer"
						/></center
					>
					<center
						><button class="p-2 rounded-lg text-white bg-green-600 cursor-pointer" id="save"
							>Save</button
						></center
					>
				</div>
			</form>
		</div>
		<div
			id="aboutme"
			class="container m-4 overflow-scroll max-h-screen border rounded-lg shadow-inner shadow-xl p-2"
		/>
	</div>
</main>

<style>
	textarea {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;

		width: 95%;
	}
</style>
