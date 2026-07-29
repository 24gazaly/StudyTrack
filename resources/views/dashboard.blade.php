<x-app-layout>

<div class="bg-[#F7FBFF] min-h-screen">

<div class="max-w-6xl mx-auto py-10">

<h1 class="text-5xl font-bold text-[#4B5E78]">

Good Morning, {{ Auth::user()->name }} ☁️

</h1>


<p class="mt-3 text-gray-500">

Stay productive and keep learning!

</p>


<!-- PROGRESS -->

<div class="mt-10 bg-white rounded-3xl shadow p-8">

<h2 class="text-2xl font-semibold text-[#4B5E78]">

Today's Progress

</h2>

<p class="text-4xl font-bold mt-4">

{{ $progress }}%

</p>


<div class="w-full bg-gray-200 rounded-full h-4 mt-5">

<div
class="bg-[#A7D8F2] h-4 rounded-full"
style="width: {{ $progress }}%">

</div>

</div>

</div>


<!-- STATISTICS -->

<div class="grid grid-cols-3 gap-6 mt-8">

<div class="bg-white rounded-3xl shadow p-6">

<h2>Total Tasks</h2>

<p class="text-5xl font-bold mt-3">
{{ $totalTasks }}
</p>

</div>



<div class="bg-white rounded-3xl shadow p-6">

<h2>Completed</h2>

<p class="text-5xl font-bold mt-3 text-green-400">
{{ $completedTasks }}
</p>

</div>



<div class="bg-white rounded-3xl shadow p-6">

<h2>Pending</h2>

<p class="text-5xl font-bold mt-3 text-yellow-400">
{{ $pendingTasks }}
</p>

</div>


</div>



<!-- UPCOMING DEADLINE -->


<div class="mt-8 bg-white rounded-3xl shadow p-8">

<h2 class="text-2xl font-bold text-[#4B5E78]">

Upcoming Deadline

</h2>

@if($upcomingTask)

<p class="mt-4 text-2xl font-semibold">

{{ $upcomingTask->title }}

</p>

<p class="text-gray-500 mt-2">

{{ $upcomingTask->deadline }}

</p>

@else

<p class="mt-4 text-gray-500">

You don't have any tasks yet!

</p>

@endif

</div>



<!-- PRODUCTIVITY QUOTE -->


<div class="mt-8 bg-white rounded-3xl shadow p-8">

<h2 class="text-xl font-semibold">

Quote of The Day

</h2>


<p class="mt-3 italic text-gray-500">

"Small progress is still progress."

</p>

</div>



<div class="mt-8">

<a href="/tasks"

class="bg-[#A7D8F2] px-6 py-4 rounded-2xl shadow font-semibold text-[#4B5E78] hover:bg-[#8DCBE6]">

See My Tasks →

</a>

</div>


</div>

</div>

</x-app-layout>

@if($totalTasks == 0)

<div class="mt-8 bg-white rounded-3xl shadow p-8 text-center">

<h2 class="text-2xl font-bold">

Let's start your productivity journey!

</h2>

<p class="mt-3 text-gray-500">

Create your first task and stay organized.

</p>

<a href="/tasks/create"

class="inline-block mt-5 bg-[#A7D8F2] px-5 py-3 rounded-2xl">

Create Your First Task

</a>

</div>

@endif