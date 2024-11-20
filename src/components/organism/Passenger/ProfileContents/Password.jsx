
const Password = () => {

    return (
        <div className={`p-6  rounded-xl max-w-lg mx-auto mt-6  animate-fadeIn`}>
            {/* Header */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>

            {/* Current Password */}
            <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Current Password
                </label>
                <div className="relative">
                    <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter your current password"
                    />

                </div>
            </div>

            {/* New Password */}
            <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    New Password
                </label>
                <div className="relative">
                    <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Enter your new password"
                    />

                </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm New Password
                </label>
                <div className="relative">
                    <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Re-enter your new password"
                    />

                </div>
            </div>

            {/* Update Button */}
            <div className="flex justify-end">
                <button
                    className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                >
                    Update Password
                </button>
            </div>
        </div>
    );
};

export default Password;
