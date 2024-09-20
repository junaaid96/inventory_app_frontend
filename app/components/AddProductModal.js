"use client";

import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function AddProductModal({ onClose, refreshProducts }) {
    const { accessToken } = useContext(UserContext);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
    });
    const [errors, setErrors] = useState({}); // Changed from single error to errors object

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Clear previous errors
        try {
            await axios.post(
                "https://inventory-app-backend-1avz.onrender.com/api/products/products/",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            await refreshProducts();
            onClose();
        } catch (error) {
            console.error("Error adding product:", error);
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setErrors({ general: "Failed to add product. Please try again." });
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    Add New Product
                </h2>
                {errors.general && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{errors.general}</span>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`input input-bordered w-full focus:ring-2 focus:ring-primary ${
                                errors.name ? 'border-red-500' : ''
                            }`}
                            required
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name[0]}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={`textarea textarea-bordered w-full h-24 focus:ring-2 focus:ring-primary ${
                                errors.description ? 'border-red-500' : ''
                            }`}
                            required
                        ></textarea>
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">{errors.description[0]}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className={`input input-bordered w-full focus:ring-2 focus:ring-primary ${
                                errors.price ? 'border-red-500' : ''
                            }`}
                            required
                        />
                        {errors.price && (
                            <p className="mt-1 text-sm text-red-600">{errors.price[0]}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Quantity
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className={`input input-bordered w-full focus:ring-2 focus:ring-primary ${
                                errors.quantity ? 'border-red-500' : ''
                            }`}
                            required
                        />
                        {errors.quantity && (
                            <p className="mt-1 text-sm text-red-600">{errors.quantity[0]}</p>
                        )}
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-ghost hover:bg-gray-100 transition-colors duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary hover:bg-secondary transition-colors duration-300"
                        >
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
