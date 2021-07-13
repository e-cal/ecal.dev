import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./layout.scss";

export default function Layout({ children }) {
    return (
        <div>
            // <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
