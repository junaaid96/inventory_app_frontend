"use client";

import { useState } from "react";
import EditProductModal from "./EditProductModal";
import DeleteProductModal from "./DeleteProductModal";

export default function Actions({ id, user, addedBy, productName, refreshProducts }) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <td className="flex gap-2">
            {user && user.username === addedBy ? (
                <>
                    <button 
                        className="btn btn-sm btn-primary"
                        onClick={() => setIsEditModalOpen(true)}
                    >
                        Edit
                    </button>
                    <button 
                        className="btn btn-sm btn-error"
                        onClick={() => setIsDeleteModalOpen(true)}
                    >
                        Delete
                    </button>
                    {isEditModalOpen && (
                        <EditProductModal 
                            productId={id} 
                            onClose={() => setIsEditModalOpen(false)} 
                            refreshProducts={refreshProducts}
                        />
                    )}
                    {isDeleteModalOpen && (
                        <DeleteProductModal 
                            productId={id} 
                            productName={productName}
                            onClose={() => setIsDeleteModalOpen(false)} 
                            refreshProducts={refreshProducts}
                        />
                    )}
                </>
            ) : null}
        </td>
    );
}
