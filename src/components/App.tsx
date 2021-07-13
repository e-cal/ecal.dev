import React from "react";

import Store from "../utils/store";

import Layout from "../containers/layout";
import Hero from "./Hero/Hero";
// import About from "./About/About";
import Portfolio from "./Portfolio/Portfolio";
// import Contact from "./Contact/Contact";
import Footer from "./Footer/Footer";

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
