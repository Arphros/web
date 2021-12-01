<svelte:head>
    <title>Arphros | Home</title>
</svelte:head>
<main>
    <div class="h-screen flex justify-center">
        <div class="bg-white shadow-2xl max-w-9xl w-9/12 m-6 rounded-xl backdrop-blur-xl backdrop-filter bg-opacity-20">
            <div class="top-0 left-0 w-full h-20 bg-blue-600 backdrop-blur-xl backdrop-filter bg-opacity-70 flex justify-center items-center rounded-t-xl">
                <h1 class="text-white text-4xl font-bold">Home</h1>
            </div>
            <div class="grid grid-cols-2 m-6 h-full w-full">
                <div class="blog">
                    <h1 class="text-3xl font-bold">Blog</h1>
                </div>
                <div class="levels">
                    <h1 class="text-3xl font-bold">Play Arphros</h1>
                    <div class="flex flex-col items-stretch max-w-lg">
                        <a href="#download"><button class="w-full mt-4 p-3 bg-blue-500 bg-opacity-80 backdrop-blur-xl backdrop-filter shadow-xl  text-white rounded-lg">Download Arphros</button></a>
                        <a href="arphros://"><button class="w-full mt-4 p-3 shadow-xl bg-blue-500 bg-opacity-80 backdrop-blur-xl backdrop-filter text-white rounded-lg">Play Arphros</button></a>
                    </div>
                    <h1 class="text-3xl font-bold mt-4">Latest Levels</h1>
                </div>
            </div>
        </div>
    </div>
</main>