"use client";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Actions from "./Actions";

export default function ClientSideActions({ id, addedBy, productName, refreshProducts }) {
    const { user } = useContext(UserContext);

    return <Actions id={id} user={user} addedBy={addedBy} productName={productName} refreshProducts={refreshProducts} />;
}