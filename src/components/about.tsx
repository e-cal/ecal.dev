import React from "react";
import Content from "../elements/content";
// @ts-ignore
import AboutMe from "../text/about";

export default function About({
    offset,
    factor = 1,
}: {
    offset: number;
    factor?: number;
}) {
    return (
        <div>
            <Content
                speed={1.5}
                offset={offset}
                factor={factor}
                className="about"
            >
                <a id="about" />
                <AboutMe />
            </Content>
        </div>
    );
}
