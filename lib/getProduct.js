export async function getProduct(id) {
    const res = await fetch(
        `https://inventory-app-backend-1avz.onrender.com/api/products/products/${id}/`,
        {
            cache: "no-store",
        }
    );
    return res.json();
}
