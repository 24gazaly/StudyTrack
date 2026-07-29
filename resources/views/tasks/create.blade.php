<x-app-layout>

<div class="bg-[#F7FBFF] min-h-screen">

    <div class="max-w-xl mx-auto py-10">

        <h1 class="text-5xl font-bold text-[#4B5E78]">
            Create New Task ✨
        </h1>

        <p class="mt-2 text-gray-500">
            Stay organized and never miss your assignments.
        </p>

        <div class="bg-white shadow rounded-3xl p-8 mt-8">

            <form action="{{ route('tasks.store') }}" method="POST">

                @csrf

                <div class="space-y-5">

                    <div>
                        <label class="text-[#4B5E78] font-semibold">
                            Task Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Mathematics Assignment"
                            required
                            class="w-full mt-2 rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#A7D8F2]"
                        >
                    </div>


                    <div>
                        <label class="text-[#4B5E78] font-semibold">
                            Subject
                        </label>

                        <input
                            type="text"
                            name="subject"
                            placeholder="e.g. Mathematics"
                            required
                            class="w-full mt-2 rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#A7D8F2]"
                        >
                    </div>


                    <div>
                        <label class="text-[#4B5E78] font-semibold">
                            Description
                        </label>

                        <textarea
                            name="description"
                            placeholder="Write your task description here..."
                            required
                            class="w-full mt-2 rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#A7D8F2]"
                        ></textarea>
                    </div>


                    <div>
                        <label class="text-[#4B5E78] font-semibold">
                            Deadline
                        </label>

                        <input
                            type="date"
                            name="deadline"
                            required
                            class="w-full mt-2 rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#A7D8F2]"
                        >
                    </div>


                    <button
                        type="submit"
                        class="w-full bg-[#A7D8F2] text-[#4B5E78] font-semibold py-4 rounded-2xl shadow hover:bg-[#8DCBE6] transition duration-300"
                    >
                        Save Task
                    </button>

                </div>

            </form>

        </div>

    </div>

</div>

</x-app-layout>