import React from "react";

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Admin Dashboard</h1>
            <p className="text-lg text-gray-700">Welcome to the admin dashboard. Manage policies, users, and more.</p>
            <div className="mt-6 space-y-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Manage Policies
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Manage Users
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    View Reports
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;