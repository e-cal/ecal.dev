import React from "react";
import Content from "../../containers/content";
// @ts-ignore
import AboutMe from "../../text/about";

export default function About() {
    return (
        <div>
            <Content className="about">
                <a id="about" />
                <AboutMe />
            </Content>
        </div>
    );
}
