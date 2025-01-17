"use client";
import { signIn } from "next-auth/react";

const AdminPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Admin Login</h1>
            <button
                className="bg-blue-500 text-white px-6 py-3 text-lg rounded hover:bg-blue-600 transition duration-300"
                onClick={() => signIn()}
            >
                Logga in som admin
            </button>
        </div>
    );
};

export default AdminPage;