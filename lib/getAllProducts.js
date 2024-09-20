export default async function getAllProducts() {
    const res = await fetch(
        "https://inventory-app-backend-1avz.onrender.com/api/products/products/",
        {
            cache: "no-store",
        }
    );
    const data = await res.json();
    return data;
}
