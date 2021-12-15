<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		let lastScrollTop = 0;
		window.addEventListener('scroll', () => {
			let st = window.pageYOffset || document.documentElement.scrollTop;
			if (st > lastScrollTop) {
				document.getElementById('footer').style.transform = 'translateY(100px)';
			} else {
				document.getElementById('footer').style.transform = 'translateY(0px)';
			}
			lastScrollTop = st;
		});
	});
</script>

<nav
	id="footer"
	class='bg-gradient-to-r from-indigo-700/70 via-violet-700/70 to-blue-700/70 fixed bottom-0 w-full backdrop-blur-2xl z-50 m-0 p-3 text-white duration-200'
>
	<div class="flex gap-3 w-full">
		<div class="text-center text-sm w-full">
			<div class="flex justify-center align-middle mb-1 flex-row space-x-4">
				<h1 class="cursor-pointer" on:click={() => goto('https://arphros.readthedocs.io/')}>API</h1>
				<h1 class="cursor-pointer" on:click={() => goto('/about/terms/')}>ToS</h1>
				<h1 class="cursor-pointer" on:click={() => goto('/about/privacy/')}>Privacy</h1>
				<h1 class="cursor-pointer" on:click={() => goto('/about/copyright/')}>Copyright</h1>
				<h1 class="cursor-pointer" on:click={() => goto('/about/teams/')}>Teams</h1>
			</div>
			<div class="flex flex-row justify-center space-x-4">
				<h1>© Tinvv 2020-2021</h1>
			</div>
		</div>
	</div>
	<h1 class="absolute bottom-0 md:right-2 md:text-md text-xs">1.beta-3</h1>
</nav>
