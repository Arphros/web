<svelte:head>
    <title>Arphros | Login</title>
</svelte:head>
<main>
    <div class="h-full flex justify-center p-24">
        <div class="bg-white shadow-2xl max-w-9xl px-6 border m-6 py-8 rounded-xl backdrop-blur-xl backdrop-filter bg-opacity-20 grid place-items-center relative">
        <form action="/auth/login" method="post">
            <h1 class="text-center font-bold text-4xl">Login</h1>
            <div class="flex flex-col space-y-4 justify-center">
            <div class="usr">
            <label for="username">Username:</label>
            <input type="text" class="border shadow-xl p-2 rounded-lg focus:outline-none focus:ring-2 ring-blue-400 ring-offset-2 transition-all duration-150 w-full" placeholder="Username" name="username" />
            </div>
            <div class="password">
            <label for="username">Password:</label>
            <input type="password" class="border shadow-xl p-2 rounded-lg focus:outline-none focus:ring-2 ring-blue-400 ring-offset-2 transition-all duration-150 w-full" placeholder="Password" name="password" />
            </div>
            <center><input type="submit" value="Submit" class="px-4 py-2 bg-blue-500 rounded-lg text-white font-bold w-4/6"></center>
            </div>
        </form>
        <p class="m-4">Don't have an account? <a href="/auth/register" class="text-blue-500">Register here.</a></p>
    </div>
</main>