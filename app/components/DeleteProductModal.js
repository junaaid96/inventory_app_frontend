"use client";

import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";

export default function DeleteProductModal({ productId, productName, onClose, refreshProducts }) {
    const { accessToken } = useContext(UserContext);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            await axios.delete(`https://inventory-app-backend-1avz.onrender.com/api/products/products/${productId}/`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            await refreshProducts();
            onClose();
        } catch (error) {
            console.error('Error deleting product:', error);
            setError(error.response?.data?.error || 'Failed to delete product');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Delete Product</h2>
                <p className="mb-6">Are you sure you want to delete the product "{productName}"?</p>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="flex justify-end space-x-3">
                    <button 
                        onClick={onClose} 
                        className="btn btn-ghost hover:bg-gray-100 transition-colors duration-300"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleDelete} 
                        className="btn btn-error hover:bg-red-600 transition-colors duration-300"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}