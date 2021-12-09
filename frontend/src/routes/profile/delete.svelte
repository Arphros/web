<script context="module">
    export async function load({ session }) {
        if (session.authenticated === false) {
            return {
                status: 302,
                redirect: '/auth/login'
            };
        } else {
            return {
                props: {
                    id: session.id
                }
            };
        }
    }
</script>
<script lang="ts">
    export let id
</script>


<svelte:head>
    <title>Arphros | Auth</title>
</svelte:head>
<main>
    <div class="h-full flex justify-center p-24">
        <div
                class="bg-white shadow-2xl max-w-9xl px-6 border m-6 py-8 rounded-xl backdrop-blur-xl backdrop-filter bg-opacity-20 grid place-items-center relative"
        >
            <form action="/api/auth/delete" method="post">
                <h1 class="text-center font-bold text-4xl">Enter your password</h1>
                    <div class="formdata">
                        <div class="flex flex-col space-y-4 mt-4 justify-center">
                            <label for="id">User id:</label>
                            <input
                                    type="text"
                                    class="border shadow-xl p-2 rounded-lg w-full"
                                    name="id"
                                    value={id}
                                    id="id"
                                    on:click={() => {return false}}
                            />
                        <label for="password">Password:</label>
                        <input
                                type="password"
                                class="border shadow-xl p-2 rounded-lg focus:outline-none focus:ring-2 ring-blue-400 ring-offset-2 transition-all duration-150 w-full"
                                placeholder="Password"
                                name="password"
                                id="password"
                        />
                    </div>
                    <center
                    ><input
                            type="submit"
                            value="Submit"
                            class="px-4 mt-4 py-2 bg-blue-500 rounded-lg text-white font-bold w-4/6"
                    /></center
                    >
                </div>
            </form>
        </div>
    </div>
</main>
