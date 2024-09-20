"use client";

import { useState } from "react";
import AddProductModal from "./AddProductModal";

export default function AddProductButton({ refreshProducts }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                className="btn btn-primary mb-6 px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                onClick={() => setIsModalOpen(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Product
            </button>
            {isModalOpen && <AddProductModal onClose={() => setIsModalOpen(false)} refreshProducts={refreshProducts} />}
        </>
    );
}
