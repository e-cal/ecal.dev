import React, { useState, useContext } from "react";
import { Link } from "gatsby";
import { Context } from "../../utils/store";
import VisibilitySensor from "react-visibility-sensor";
import Content from "../../containers/content";
import "./hero.scss";

export default function Hero() {
    const [top, setTop] = useState(true);

    // @ts-ignore
    const [_, dispatch] = useContext(Context);

    const topVisChange = (val: boolean) => {
        if (val) {
            setTop(true);
            dispatch({ type: "START" });
        } else {
            setTop(false);
        }
    };

    const heroVisChange = (val: boolean) => {
        if (val && top) {
            dispatch({ type: "START" });
        } else {
            dispatch({ type: "NOT_START" });
        }
    };

    return (
        <div className="hero">
            <VisibilitySensor onChange={topVisChange}>
                <div style={{ height: "10px" }} />
            </VisibilitySensor>

            <Content>
                <h3 className="introTitle">Hey, I'm </h3>
                <h1 className="introTitle">Ethan Callanan</h1>
                <h2 className="introText">
                    I <span className="rotate">code.</span>
                    <span className="rotate">design.</span>
                    <span className="rotate">research.</span>
                    <span className="rotate"> solve problems.</span>
                </h2>
            </Content>

            <Content>
                <div className="buttons neumorphic">
                    <button>
                        <h3>
                            <a href="#projects">Projects</a>
                        </h3>
                    </button>
                    <button>
                        <h3>Resume</h3>
                    </button>
                    <button>
                        <h3>Contact</h3>
                    </button>
                </div>
                <VisibilitySensor onChange={heroVisChange}>
                    <div style={{ height: "10px" }} />
                </VisibilitySensor>
            </Content>
        </div>
    );
}
