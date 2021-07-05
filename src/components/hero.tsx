import React, { useContext, useState } from "react";
import { Context } from "../utils/store";
import VisibilitySensor from "react-visibility-sensor";
import Content from "../elements/content";
import "./styles/hero.scss";
import { Link } from "gatsby";

export default function Hero({
    offset,
    factor = 1,
}: {
    offset: number;
    factor?: number;
}) {
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

    const visibilityChange = (val: boolean) => {
        if (val && top) {
            dispatch({ type: "START" });
        } else {
            dispatch({ type: "NOT_START" });
        }
    };

    return (
        <div>
            <VisibilitySensor onChange={topVisChange}>
                <div style={{ height: "10px" }} />
            </VisibilitySensor>

            <Content speed={0.4} offset={offset} factor={factor}>
                <h1 className="introTitle">Hey, I'm Ethan</h1>
                <h2 className="introText">
                    I <span className="rotate">code.</span>
                    <span className="rotate">make.</span>
                    <span className="rotate">design.</span>
                    <span className="rotate">research.</span>
                    <span className="rotate"> solve problems.</span>
                </h2>
                <div className="for">
                    <div className="clientsContainer">
                        <h3>For Clients</h3>
                    </div>
                    <div className="funContainer">
                        <h3>For Fun</h3>
                    </div>
                </div>
            </Content>

            <Content speed={0.1} offset={offset + 0.3}>
                <VisibilitySensor onChange={visibilityChange}>
                    <div style={{ height: "10px" }} />
                </VisibilitySensor>
                <div className="buttons">
                    <button>
                        <h3>
                            <a href="#about">About Me</a>
                        </h3>
                    </button>
                    <button>
                        <h3>Resume</h3>
                    </button>
                    <button>
                        <h3>Contact</h3>
                    </button>
                </div>
            </Content>
        </div>
    );
}
