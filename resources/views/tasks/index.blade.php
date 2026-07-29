<x-app-layout>

<div class="bg-[#F7FBFF] min-h-screen">

    <div class="max-w-5xl mx-auto py-10">

        <!-- TITLE -->
        <h1 class="text-5xl font-bold text-[#4B5E78]">
            My Tasks
        </h1>

        <p class="mt-2 text-gray-500">
            Keep track of your assignments and stay productive.
        </p>


        <!-- SEARCH BAR -->
        <div class="mt-8">
            <form method="GET" action="{{ route('tasks.index') }}">

                <input
                    type="text"
                    name="search"
                    value="{{ request('search') }}"
                    placeholder="🔍 Search your task..."
                    class="w-full rounded-2xl border border-gray-200 bg-white shadow-sm p-4 focus:outline-none focus:ring-2 focus:ring-[#A7D8F2]"
                >

            </form>
        </div>


        <!-- ADD TASK BUTTON -->
        <div class="mt-6">
            <a href="{{ route('tasks.create') }}"
               class="inline-block bg-[#A7D8F2] px-6 py-3 rounded-2xl shadow text-[#4B5E78] font-semibold hover:bg-[#8DCBE6] transition duration-300">

                + Add New Task

            </a>
        </div>


        <!-- TASK LIST -->
        <div class="mt-10 space-y-6">

            @if($tasks->isEmpty())

                <div class="bg-white rounded-3xl shadow p-8 text-center">

                    <h2 class="text-2xl font-bold text-[#4B5E78]">
                        Task Not Found
                    </h2>

                    <p class="mt-3 text-gray-500">
                        Try searching with another keyword or create a new task.
                    </p>

                </div>

            @endif


            @foreach($tasks as $task)

                <div class="bg-white rounded-3xl shadow p-8">

                    <!-- TITLE -->
                    <h2 class="text-3xl font-bold text-[#4B5E78]">
                        {{ $task->title }}
                    </h2>


                    <!-- DESCRIPTION -->
                    <p class="mt-4 text-gray-500">
                        {{ $task->description }}
                    </p>


                    <!-- DETAILS -->
                    <div class="mt-5 space-y-2 text-[#4B5E78]">

                        <p>
                            <strong>Subject :</strong>
                            {{ $task->subject }}
                        </p>

                        <p>
                            <strong>Deadline :</strong>
                            {{ $task->deadline }}
                        </p>

                        @if($task->status == 'Completed')

                        <p class="text-green-500 font-semibold">
                            Status : Completed
                        </p>

                        @else

                        <p class="text-orange-400 font-semibold">
                            Status : Pending
                        </p>

                        @endif

                    </div>


                    <!-- BUTTONS -->
                    <div class="flex gap-4 mt-6">

                        <!-- EDIT BUTTON -->
                        <a href="{{ route('tasks.edit', $task->id) }}"
                           class="bg-[#CDEFFF] px-5 py-2 rounded-xl text-[#4B5E78] font-semibold hover:bg-[#B6E7FF] transition duration-300">

                            Edit

                        </a>


                        <!-- DELETE BUTTON -->
                        <form action="{{ route('tasks.destroy', $task->id) }}"
                              method="POST">

                            @csrf
                            @method('DELETE')

                            <button
                                type="submit"
                                class="bg-[#FFE8A3] px-5 py-2 rounded-xl text-[#4B5E78] font-semibold hover:bg-[#FFD977] transition duration-300">

                                Delete

                            </button>

                        </form>

                    </div>

                </div>

            @endforeach

        </div>

    </div>

</div>

</x-app-layout>