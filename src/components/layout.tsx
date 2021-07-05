import React from "react";
import Header from "./header";
import Footer from "./footer";
import "./styles/layout.scss";

export default function Layout({ children }) {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
