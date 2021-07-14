import React from "react";
import Store from "../utils/store";
import Layout from "../containers/layout";
import Hero from "./Hero/Hero";
import Portfolio from "./Portfolio/Portfolio";
import Footer from "./Footer/Footer";
import "./app.scss";

function App() {
    return (
        <Store>
            <Layout>
                <Hero />
                <Portfolio />
                <Footer />
            </Layout>
        </Store>
    );
}

export default App;
