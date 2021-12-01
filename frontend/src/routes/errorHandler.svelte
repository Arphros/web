<script>
import { onMount } from "svelte";
let status 
let msg;
onMount(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const statusParam = urlParams.get('status');
    const msgParam = urlParams.get('msg');
    status = statusParam;
    msg = msgParam;
});
    
</script>

<main>
<div class="h-screen flex justify-center p-24">
    <div class="bg-white shadow-2xl max-w-9xl w-5/12 m-6 max-h-64 rounded-xl backdrop-blur-xbackdrop-filter bg-opacity-20 grid place-items-center">
        <div class="items">
            <h1 class="m-6 font-bold text-4xl text-center">T_T</h1>
            <p class="m-6 text-xl text-center">
                {msg} <pre><br>[Error with status {status}]</pre>
            <div class="m-6 text-center">
                <a href="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-100">
                    Back to Homepage
                </a>
            </div>
        </div>
</div>
</main>

<style>
    pre {
    font-size: medium;
    }
</style>