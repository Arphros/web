<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import '../css/tailwind.css';
	import '../app.css';
</script>

<Navbar />
<slot />
<Footer />
