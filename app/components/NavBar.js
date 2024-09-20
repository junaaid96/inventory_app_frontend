import Link from "next/link";

export default function NavBar() {
    return (
        <div className="navbar bg-base-100 border-b shadow-md">
            <Link
                href={"/"}
             className="btn btn-ghost text-xl">Product_Inventory</Link>
        </div>
    );
}
