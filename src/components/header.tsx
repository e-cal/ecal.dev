import { Link } from "gatsby";
import React, { useContext } from "react";
import { Context } from "../utils/store";
import "./styles/header.scss";

export default function Header() {
    const [state, _] = useContext(Context);

    let show = true;

    if (state.start) show = false;

    return (
        <>
            <header className={`header ${show ? "" : "hide"}`}>
                <Link to="/" className="logo">
                    <h1>
                        <span className="logoMain">
                            <span style={{ transitionDelay: "0.2s" }}>e</span>
                            <span style={{ transitionDelay: "0.4s" }}>c</span>
                            <span style={{ transitionDelay: "0.6s" }}>a</span>
                            <span style={{ transitionDelay: "0.8s" }}>l</span>
                        </span>
                        <span className="logoDot">.</span>
                        <span className="logoExt">dev</span>
                    </h1>
                </Link>
                <nav>
                    <ul className="navList">
                        <Link to="/about">
                            <li>About</li>
                        </Link>
                        <Link to="/projects">
                            <li>Projects</li>
                        </Link>
                        <Link to="/resume">
                            <li>Resume</li>
                        </Link>
                    </ul>
                </nav>
            </header>
        </>
    );
}
