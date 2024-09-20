"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import ProductTable from "./components/ProductTable";
import Link from "next/link";
import getAllProducts from "@/lib/getAllProducts";

export default function Home() {
    const { user, logout } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (user !== undefined) {
            setLoading(false);
            fetchProducts();
        }
    }, [user]);

    const fetchProducts = async () => {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
    };

    const handleLogout = async () => {
        await logout();
    };

    if (loading) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center">
                <div className="loading loading-spinner loading-lg" aria-label="Loading"></div>
            </main>
        );
    }

    return (
        <main className="flex min-h-screen flex-col p-6 md:p-24">
            <p className="text-center mb-6">
                {user ? (
                    <>
                        <span>Welcome, <strong>{user.username}</strong>!</span>
                        <button
                            onClick={handleLogout}
                            className="ms-2 btn btn-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        Please{" "}
                        <Link
                            className="text-primary hover:underline font-semibold"
                            href="/login"
                        >
                            login
                        </Link>{" "}
                        to manage this inventory.
                    </>
                )}
            </p>
            <ProductTable products={products} refreshProducts={fetchProducts} />
        </main>
    );
}
