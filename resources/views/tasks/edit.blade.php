<x-app-layout>

<div class="bg-[#F7FBFF] min-h-screen">

    <div class="max-w-xl mx-auto py-10">

        <h1 class="text-5xl font-bold text-[#4B5E78] mb-8">
            Edit Task
        </h1>

        <div class="bg-white shadow rounded-3xl p-8">

            <form action="{{ route('tasks.update', $task->id) }}" method="POST">

                @csrf
                @method('PUT')

                <div class="space-y-5">

                    <div>
                        <label class="text-[#4B5E78] font-semibold">
                            Task Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value="{{ $task->title }}"
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
                            value="{{ $task->subject }}"
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
                            required
                            class="w-full mt-2 rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#A7D8F2]"
                        >{{ $task->description }}</textarea>
                    </div>


                    <div>
                        <label class="text-[#4B5E78] font-semibold">
                            Deadline
                        </label>

                        <input
                            type="date"
                            name="deadline"
                            value="{{ $task->deadline }}"
                            required
                            class="w-full mt-2 rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#A7D8F2]"
                        >
                    </div>


                    <div>
                        <label class="text-[#4B5E78] font-semibold">
                            Status
                        </label>

                        <select
                            name="status"
                            class="w-full mt-2 rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#A7D8F2]"
                        >

                            <option value="Pending"
                                {{ $task->status == 'Pending' ? 'selected' : '' }}>
                                Pending
                            </option>

                            <option value="Completed"
                                {{ $task->status == 'Completed' ? 'selected' : '' }}>
                                Completed
                            </option>

                        </select>

                    </div>


                    <button
                        type="submit"
                        class="w-full bg-[#A7D8F2] text-[#4B5E78] font-semibold py-4 rounded-2xl shadow hover:bg-[#8DCBE6] transition duration-300"
                    >

                        Save Changes

                    </button>

                </div>

            </form>

        </div>

    </div>

</div>

</x-app-layout>