import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { intro, meta } from "../../content";
import { Link } from "react-router-dom";

<div
    className="h_bg-image order-1 order-lg-2 h-90"
    style={{
        backgroundImage: `url(${intro.img})`,
        opacity: 0.9,
    }}
></div>
export const Home = () => {
    return (
        <HelmetProvider>
            <section id="home" className="home">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title> {meta.title}</title>
                    <meta name="description" content={meta.description} />
                </Helmet>
                <div className="intro_sec d-block d-lg-flex align-items-center ">
                    <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
                        <div className="align-self-center ">
                            <div className="intro mx-auto">
                                <h2 className="mb-1x">{intro.title}</h2>
                                <h1 className="fluidz-48 mb-1x">
                                    <Typewriter
                                        options={{ loop: false, cursor: "▉" }}
                                        onInit={(typewriter) => {
                                            typewriter
                                                .typeString(
                                                    intro.animated.static,
                                                )
                                                .typeString(
                                                    intro.animated.first,
                                                )
                                                .pauseFor(1500)
                                                .deleteChars(
                                                    intro.animated.first.length,
                                                )
                                                .pauseFor(1000)
                                                .typeString(
                                                    intro.animated.second,
                                                )
                                                .pauseFor(1500)
                                                .deleteChars(
                                                    intro.animated.second
                                                        .length,
                                                )
                                                .pauseFor(1000)
                                                .typeString(
                                                    intro.animated.third,
                                                )
                                                .pauseFor(1500)
                                                .deleteChars(
                                                    intro.animated.third.length,
                                                )
                                                .pauseFor(1000)
                                                .typeString(
                                                    intro.animated.final,
                                                )
                                                .start();
                                        }}
                                    />
                                </h1>
                                <p className="mb-1x">{intro.description.a}</p>
                                <p className="m-1x">{intro.description.b}</p>
                                <p className="mb-0">{intro.description.c}</p>
                                <p className="mb-0 pl-3">{intro.description.d}</p>
                                <p className="mb-0 pl-3">{intro.description.e}</p>
                                <p className="mb-0 pl-3">{intro.description.f}</p>
                                <p className="mb-0 pl-3">{intro.description.g}</p>
                                <div className="intro_btn-action pb-5 mt-3">
                                    <a href="https://terminal.ecal.dev" className="text_2">
                                        <div
                                            id="button_p"
                                            className="ac_btn btn"
                                        >
                                            {">_"}
                                            <div className="ring one"></div>
                                            <div className="ring two"></div>
                                            <div className="ring three"></div>
                                        </div>
                                    </a>
                                    <Link to="/about">
                                        <div
                                            id="button_h"
                                            className="ac_btn btn"
                                        >
                                            About
                                            <div className="ring one"></div>
                                            <div className="ring two"></div>
                                            <div className="ring three"></div>
                                        </div>
                                    </Link>
                                    <Link to="/projects" className="text_2">
                                        <div
                                            id="button_p"
                                            className="ac_btn btn"
                                        >
                                            Projects
                                            <div className="ring one"></div>
                                            <div className="ring two"></div>
                                            <div className="ring three"></div>
                                        </div>
                                    </Link>
                                    <Link to="/contact">
                                        <div
                                            id="button_h"
                                            className="ac_btn btn"
                                        >
                                            Contact
                                            <div className="ring one"></div>
                                            <div className="ring two"></div>
                                            <div className="ring three"></div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </HelmetProvider>
    );
};
