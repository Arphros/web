<script lang="ts">
	import { onMount } from 'svelte';

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
	class="bg-blue-600 bg-opacity-70 fixed bottom-0 w-full backdrop-blur-2xl z-50  backdrop-filter p-3 text-white transition-all duration-200"
>
	<div class="flex gap-3 w-full">
		<div class="text-center text-sm w-full">
			<div class="flex justify-center align-middle mb-1 flex-row space-x-4">
				<a href="/docs/api"><h1 class="text-center">Developers</h1></a>
				<a href="/about/terms"><h1>Terms of Services</h1></a>
				<a href="/about/privacy"><h1>Privacy Policy</h1></a>
				<a href="/about/copyright"><h1>Copyright (DMCA)</h1></a>
				<a href="/about/teams"><h1>Teams</h1></a>
			</div>
			<div class="flex flex-row justify-center space-x-4">
				<h1>© Tinvv & Arphros Teams 2020-2021</h1>
			</div>
		</div>
	</div>
</nav>
