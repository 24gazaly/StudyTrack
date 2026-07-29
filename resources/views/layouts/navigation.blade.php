<nav class="bg-[#CDEFFF] shadow-sm">
    <div class="max-w-7xl mx-auto px-6">

        <div class="flex justify-between items-center h-16">

            <div>
                <a href="/dashboard"
                    class="text-2xl font-bold text-[#4B5E78]">

                    StudyTrack

                </a>
            </div>

            <div class="flex gap-8 items-center">

                <a href="/dashboard"
                    class="text-[#4B5E78] hover:underline">
                    Dashboard
                </a>

                <a href="/tasks"
                    class="text-[#4B5E78] hover:underline">
                    Tasks
                </a>

                <a href="/profile"
                    class="text-[#4B5E78] hover:underline">
                    Profile
                </a>

                <form method="POST" action="{{ route('logout') }}">
                    @csrf

                    <button
                        class="text-[#4B5E78] hover:underline">

                        Logout

                    </button>
                </form>

            </div>

        </div>

    </div>
</nav>