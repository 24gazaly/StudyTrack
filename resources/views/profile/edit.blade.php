<x-app-layout>

<div class="bg-[#F7FBFF] min-h-screen">

    <div class="max-w-4xl mx-auto py-10">

        <h1 class="text-5xl font-bold text-[#4B5E78]">
            My Profile 👤
        </h1>

        <p class="mt-2 text-gray-500">
            Manage your account settings.
        </p>


        <div class="mt-8 space-y-8">

            <div class="bg-white rounded-3xl shadow p-8">

                @include('profile.partials.update-profile-information-form')

            </div>


            <div class="bg-white rounded-3xl shadow p-8">

                @include('profile.partials.update-password-form')

            </div>


            <div class="bg-white rounded-3xl shadow p-8">

                @include('profile.partials.delete-user-form')

            </div>


        </div>


    </div>

</div>

</x-app-layout>