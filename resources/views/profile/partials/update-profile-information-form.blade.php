<section>

<h2 class="text-3xl font-bold text-[#4B5E78]">

Profile Information

</h2>

<p class="mt-2 text-gray-500">

Update your name and email address.

</p>

<form method="post"
      action="{{ route('profile.update') }}"
      class="mt-6 space-y-6">

    @csrf
    @method('patch')


    <div>

        <label class="font-semibold text-[#4B5E78]">
            Name
        </label>

        <input
            type="text"
            name="name"
            value="{{ old('name', $user->name) }}"
            required
            class="w-full mt-2 rounded-2xl border p-3 focus:ring-2 focus:ring-[#A7D8F2]"
        >

    </div>


    <div>

        <label class="font-semibold text-[#4B5E78]">
            Email
        </label>

        <input
            type="email"
            name="email"
            value="{{ old('email', $user->email) }}"
            required
            class="w-full mt-2 rounded-2xl border p-3 focus:ring-2 focus:ring-[#A7D8F2]"
        >

    </div>


    <button
        class="bg-[#A7D8F2] px-6 py-3 rounded-2xl font-semibold text-[#4B5E78]">

        Save Changes

    </button>

</form>

</section>