// import { graphql } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";
import App from "../components/App";
import { helmData } from "../data/helm";
import "./styles/index.scss";

export default function Index() {
    const { title, description } = helmData;

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
                <html lang={"en"} />
                <meta name="description" content={description} />
            </Helmet>
            <App />
        </>
    );
}
