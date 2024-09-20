"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function Register() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });
    const [errors, setErrors] = useState({}); // New state for field-specific errors
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors
        setIsLoading(true);

        try {
            const response = await axios.post(
                "https://inventory-app-backend-1avz.onrender.com/api/users/register/",
                formData
            );
            if (response.status === 201) {
                router.push("/login");
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setErrors({ general: "An error occurred during registration" });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-10 rounded-xl shadow-2xl">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Create an Account
                    </h1>
                    <p className="text-gray-600">Sign up to get started</p>
                </div>

                {errors.general && (
                    <div
                        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
                        role="alert"
                    >
                        <p>{errors.general}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label
                                htmlFor="first_name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                First Name
                            </label>
                            <input
                                id="first_name"
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                                    errors.first_name
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                                placeholder="Enter your first name"
                            />
                            {errors.first_name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.first_name[0]}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="last_name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Last Name
                            </label>
                            <input
                                id="last_name"
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                                    errors.last_name
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                                placeholder="Enter your last name"
                            />
                            {errors.last_name && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.last_name[0]}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                                    errors.username
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                                placeholder="Enter your username"
                            />
                            {errors.username && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.username[0]}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.email[0]}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                                    errors.non_field_errors
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                                placeholder="Enter your password"
                            />
                            {errors.non_field_errors && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.non_field_errors[0]}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="confirm_password"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="confirm_password"
                                type="password"
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                required
                                className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                                    errors.confirm_password
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                                placeholder="Confirm your password"
                            />
                            {errors.confirm_password && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.confirm_password[0]}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-150 ease-in-out"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Registering...
                                </span>
                            ) : (
                                "Register"
                            )}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-primary hover:text-secondary"
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
