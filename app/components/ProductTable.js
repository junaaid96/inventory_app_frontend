import ClientSideActions from "./ClientSideActions";
import AddProductButton from "./AddProductButton";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const metadata = {
    title: "Product Inventory App",
    description: "Product Inventory App",
};

export default function ProductTable({ products, refreshProducts }) {
    const { user } = useContext(UserContext);

    return (
        <div className="overflow-x-auto">
            {user && <AddProductButton refreshProducts={refreshProducts} />}
            {products.length === 0 ? (
                <p>No Products Added</p>
            ) : (
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Added By</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    {product.added_by.first_name}{" "}
                                    {product.added_by.last_name} (
                                    {product.added_by.username})
                                </td>
                                <ClientSideActions
                                    id={product.id}
                                    addedBy={product.added_by.username}
                                    productName={product.name}
                                    refreshProducts={refreshProducts}
                                />
                            </tr>
                        ))}
                    </tbody>
                    <tfoot></tfoot>
                </table>
            )}
        </div>
    );
}
