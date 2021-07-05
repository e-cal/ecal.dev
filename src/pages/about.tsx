import React from "react";
import * as styles from "./about.module.css";
import Layout from "../components/layout";
import { graphql } from "gatsby";

const User = (props) => (
    <div className={styles.user}>
        <img src={props.avatar} className={styles.avatar} alt="" />
        <div className={styles.description}>
            <h2 className={styles.username}>{props.username}</h2>
            <p className={styles.excerpt}>{props.excerpt}</p>
        </div>
    </div>
);

export default function About() {
    return (
        <Layout>
            <h1>About Me</h1>
            <User
                username="Ethan Callanan"
                avatar="https://avatars.githubusercontent.com/u/47398876?v=4"
                excerpt="Hi, I'm Ethan Callanan."
            />
        </Layout>
    );
}
