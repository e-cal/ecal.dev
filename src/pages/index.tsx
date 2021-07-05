// import { graphql } from "gatsby";
import React from "react";
import Store from "../utils/store";
import Layout from "../components/layout";
import Hero from "../components/hero";
import About from "../components/about";
import "./styles/index.scss";

export default function Home() {
    return (
        <Store>
            <Layout>
                <Hero offset={0.75} />
                <About offset={1.1} />
            </Layout>
        </Store>
    );
}
