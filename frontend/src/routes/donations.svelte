<script>
    let check = 0;
</script>

<svelte:head>
    <title>Arphros | Support</title>
</svelte:head>
<main>
    <div class="h-full flex justify-center">
        <div
                class="bg-white relative shadow-2xl lg:w-9/12 w-full md:m-6 my-4 rounded-xl backdrop-blur-xl backdrop-filter bg-opacity-20 h-full"
        >
            <div class="max-h-64 relative inline-block overflow-hidden border-b border-black">
                <span class="z-50 absolute text-7xl text-white text-shadow-max center">Arphros</span>
                <img
                        alt="banner"
                        class="rounded-t-xl w-full duration-100 filter blur-sm hover:blur-none hover:scale-150 darken-image"
                        src="/assets/images/banner_supporter.png"
                />
            </div>
            <!--
        <span class="m-3">
            🎉You are supporter! Valid until: <span class="text-green-500">{validUntil}</span>
        </span>
        -->
            <p class="m-6 said text-xl leading-relaxed">
                I used to use free hosting for this website. But it was very limited so I couldn't do
                everything I wanted. I am not rich and a kind adult supported me when I needed them and
                because of him, I am able to host this website.
            </p>
            <p class="m-6 said text-xl leading-relaxed">
                Arphros is completely free to use and I do not make any money off of the site. If I cannot
                afford to pay for hosting, Arphros will have to be shut down. That is why I need your
                support.
            </p>
            <p class="m-6 said text-xl leading-relaxed">
                I would like to thank everyone who has become a supporter! It means a lot to me and I really
                appreciate the donations
            </p>
            <p class="text-right m-6 text-2xl font-bold">- Kidjanate (Lead developer of Arphros)</p>
            <h1 class="text-6xl font-bold text-center m-6 border-t p-4">Did you know...</h1>
            <p class="text-3xl text-yellow-500 m-6 underline decoration-yellow-500 underline-offset-2">Arphros is not
                cheap and not free to run.</p>
            <p class="text-lg said m-6">
                While we provide this game for free, but we still have to pay for it. And if we always took
                the money out from our pockets. We would be broke and we wouldn't be able to upgrade our
                server to accommodate our users. While we do having more users, we need more server
                performance. So we are asking you for help on this :D
            </p>
            <p class="text-3xl text-yellow-500 m-6 underline decoration-yellow-500 underline-offset-2">We are all still
                students.</p>
            <p class="text-lg said m-6">
                Arphros developers don't have a job. This means we don't get any income except the savings
                money that parents give us.
            </p>
            <p class="text-3xl text-yellow-500 m-6 underline decoration-yellow-500 underline-offset-2">We are using an
                old PC to run it.</p>
            <p class="text-lg said m-6">
                We don't have a powerful PC, except this old PC that's running the server. We really pity
                it. It works harder to handle the server while it's online.
            </p>
            <p class="text-3xl text-yellow-500 m-6 underline decoration-yellow-500 underline-offset-2">Arphros doesn't
                have ads, and never will.</p>
            <p class="text-lg said m-6">
                Ads are so annoying, right? Yeah, we think so too. We don't have ads in our game or on our
                website because we believe in no ads.
            </p>
            <h1 class="md:text-6xl text-2xl font-bold text-center m-6 border-t p-4">
                Why should you support us?
            </h1>
            <div class="grid grid-flow-cols place-items-center md:grid-cols-2 grid-cols-1 m-4 gap-3">
                <div class="relative">
                    <img
                            alt="gameplay"
                            class="rounded-2xl darken-image transition-all duration-100"
                            src="/assets/examples/gameplay_ex.png"
                    />
                    <span class="absolute center text-4xl text-shadow-max text-white"
                    >Keep Arphros Running!</span
                    >
                </div>
                <div class="sidewords">
                    <center><img alt="db" src="/assets/icons/database.png"/></center>
                    <p class="text-2xl text-gray-600 text-center">
                        Your support allows the developers to keep the servers running.
                    </p>
                </div>
                <div class="relative">
                    <img
                            alt="gameplay"
                            class="rounded-2xl darken-image transition-all duration-100"
                            src="/assets/examples/gameplay_2_ex.png"
                    />
                    <span class="absolute center text-4xl text-shadow-max text-white">Support the team!</span>
                </div>
                <div class="sidewords">
                    <center><img alt="team" src="/assets/icons/team.png"/></center>
                    <p class="text-2xl text-gray-600 text-center">
                        It'll also help support the team behind the game, so they'll make and release better
                        content!
                    </p>
                </div>
            </div>
            <h1 class="md:text-6xl text-2xl font-bold text-center m-6 border-t p-4">There's more!</h1>
            <div class="grid grid-flow-cols place-items-center md:grid-cols-2 grid-cols-1 m-4 gap-3">
                <div class="relative">
                    <img
                            alt="about"
                            class="rounded-2xl darken-image transition-all duration-100"
                            src="/assets/examples/about_ex.png"
                    />
                    <span class="absolute center text-4xl text-shadow-max text-white">Be Unique!</span>
                </div>
                <div class="sidewords">
                    <center><img alt="about" src="/assets/icons/about.png"/></center>
                    <p class="text-2xl text-gray-600 text-center">
                        You can customizable your own about me and have that cool badges!.
                    </p>
                </div>
                <div class="relative">
                    <img
                            alt="banner"
                            class="rounded-2xl darken-image transition-all duration-100"
                            src="/assets/examples/banner_ex.png"
                    />
                    <span class="absolute center text-4xl text-shadow-max text-white">More unique!</span>
                </div>
                <div class="sidewords">
                    <center><img alt="man" src="/assets/icons/man.png"/></center>
                    <p class="text-2xl text-gray-600 text-center">
                        You will receive further profile customizations! Do you want gif images as an banner? sure!
                    </p>
                </div>
                <div class="relative">
                    <img
                            alt="chat"
                            class="rounded-2xl darken-image transition-all duration-100"
                            src="/assets/examples/chat_ex.png"
                    />
                    <span class="absolute center text-4xl text-shadow-max text-white">Super unique!</span>
                </div>
                <div class="sidewords">
                    <center><img alt="chat" src="/assets/icons/chat.png"/></center>
                    <p class="text-2xl text-gray-600 text-center">
                        You will receive an ability to use markdown and other commands in chat, isn't it amazing!?
                    </p>
                </div>
            </div>
            <h1 class="md:text-6xl text-2xl font-bold text-center m-6 border-t p-4">
                What are you waiting for?
            </h1>
            <center><img alt="supporter-badge" src="/assets/badges/supporter.png" width="100px"/></center
            >
            <h1 class="m-6 font-bold text-2xl text-center">Choose your package that you want!</h1>
            <div class="flex lg:flex-row flex-col">
                <button
                        class="p-16 m-6 shadow-xl text-center hover:bg-gray-200 hover:scale-110 transition-all duration-150 rounded-lg"
                        on:click={() => (check = 1)}
                ><span class="text-3xl font-bold">1 Month</span><br/>2 USD
                </button
                >
                <button
                        class="p-16 m-6 shadow-xl text-center hover:bg-gray-200 hover:scale-110 transition-all duration-150 rounded-lg"
                        on:click={() => (check = 2)}
                ><span class="text-3xl font-bold">2 Month</span><br/>4 USD
                </button
                >
                <button
                        class="p-16 m-6 shadow-xl text-center hover:bg-gray-200 hover:scale-110 transition-all duration-150 rounded-lg"
                        on:click={() => (check = 3)}
                ><span class="text-3xl font-bold">3 Month</span><br/>5 USD
                </button
                >
                <button
                        class="p-16 m-6 shadow-xl text-center hover:bg-gray-200 hover:scale-110 transition-all duration-150 rounded-lg"
                        on:click={() => (check = 4)}
                ><span class="text-3xl font-bold">4 Month</span><br/>6 USD
                </button
                >
            </div>
            {#if check !== 0}
                <h1 class="m-6 font-bold text-2xl text-center">
                    Thanks! You chose the {check} month{check === 1 ? '' : 's'} package!
                </h1>
            {/if}
            <div class="flex flex-row justify-center w-full">
                <button
                        class="p-3 text-white m-6 shadow-xl text-center bg-blue-400 hover:bg-blue-600 hover:scale-110 transition-all duration-150 rounded-lg"
                        on:click={() => {
						check !== 0 ? (location.href = `/payment/support/${check}`) : '';
					}}><span class="text-3xl font-bold">Tip us!</span></button
                >
            </div>
        </div>
    </div>
</main>
