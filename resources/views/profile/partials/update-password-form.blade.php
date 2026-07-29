<section>

    <h2 class="text-3xl font-bold text-[#4B5E78]">
        Change Password 🔒
    </h2>

    <p class="mt-2 text-gray-500">
        Keep your account secure by updating your password regularly.
    </p>

    <form method="POST" action="{{ route('password.update') }}" class="mt-6 space-y-5">

        @csrf
        @method('PUT')


        <!-- Current Password -->
        <div>

            <label class="font-semibold text-[#4B5E78]">
                Current Password
            </label>

            <input
                type="password"
                name="current_password"
                autocomplete="current-password"
                class="w-full mt-2 rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#A7D8F2]"
            >

            @error('current_password', 'updatePassword')
                <p class="text-red-500 mt-2 text-sm">
                    {{ $message }}
                </p>
            @enderror

        </div>


        <!-- New Password -->
        <div>

            <label class="font-semibold text-[#4B5E78]">
                New Password
            </label>

            <input
                type="password"
                name="password"
                autocomplete="new-password"
                class="w-full mt-2 rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#A7D8F2]"
            >

            @error('password', 'updatePassword')
                <p class="text-red-500 mt-2 text-sm">
                    {{ $message }}
                </p>
            @enderror

        </div>


        <!-- Confirm Password -->
        <div>

            <label class="font-semibold text-[#4B5E78]">
                Confirm New Password
            </label>

            <input
                type="password"
                name="password_confirmation"
                autocomplete="new-password"
                class="w-full mt-2 rounded-2xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#A7D8F2]"
            >

            @error('password_confirmation', 'updatePassword')
                <p class="text-red-500 mt-2 text-sm">
                    {{ $message }}
                </p>
            @enderror

        </div>


        <!-- Save Button -->
        <button
            type="submit"
            class="bg-[#A7D8F2] px-6 py-3 rounded-2xl text-[#4B5E78] font-semibold shadow hover:bg-[#8DCBE6] transition duration-300"
        >

            Update Password

        </button>


        <!-- Success Message -->
        @if (session('status') === 'password-updated')

            <p class="text-green-500 font-medium">
                Password updated successfully!
            </p>

        @endif

    </form>

</section>