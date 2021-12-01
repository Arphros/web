<script context="module">
  export function load({ error, status }) {
      return {
          props: {
              message: error.message,
              status
          }
      };
  }
</script>
<script>
  export let message;
  export let status;
</script>

<main>
<div class="h-screen flex justify-center p-24">
    <div class="bg-white shadow-2xl max-w-9xl w-5/12 m-6 max-h-64 rounded-xl backdrop-blur-xbackdrop-filter bg-opacity-20 grid place-items-center">
        <div class="items">
            <h1 class="m-6 font-bold text-4xl text-center">T_T</h1>
            <p class="m-6 text-xl text-center">
                {#if status == 404}
                Nothing is here... Why not check out our Discord server? <pre><br>[Error with status {status}]</pre>
                {:else}
                Something went wrong at the server... <pre><br>[Error with status {status}]</pre>
                {/if}
            </p>
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