import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content";
import { Link } from "react-router-dom";

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
          <div
            className="h_bg-image order-1 order-lg-2 h-100"
            style={{ backgroundImage: `url(${introdata.img})`, opacity: 0.8 }}
          ></div>
          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center ">
              <div className="intro mx-auto">
                <h2 className="mb-1x">{introdata.title}</h2>
                <h1 className="fluidz-48 mb-1x">
                  <Typewriter
                    options={{ loop: false, cursor: "▉" }}
                    onInit={(typewriter) => {
                      typewriter
                        .typeString(introdata.animated.static)
                        .typeString(introdata.animated.first)
                        .pauseFor(1500)
                        .deleteChars(introdata.animated.first.length)
                        .pauseFor(1000)
                        .typeString(introdata.animated.second)
                        .pauseFor(1500)
                        .deleteChars(introdata.animated.second.length)
                        .pauseFor(1000)
                        .typeString(introdata.animated.third)
                        .pauseFor(1500)
                        .deleteChars(introdata.animated.third.length)
                        .pauseFor(1000)
                        .typeString(introdata.animated.final)
                        .start();
                    }}
                  />
                </h1>
                <p className="mb-1x">{introdata.description.current}</p>
                <p>Previously:</p>
                <p className="mb-1x">{introdata.description.prev1}</p>
                <p className="mb-1x">{introdata.description.prev2}</p>
                <p className="mb-1x">{introdata.description.other}</p>
                <div className="intro_btn-action pb-5">
                  <Link to="/portfolio" className="text_2">
                    <div id="button_p" className="ac_btn btn ">
                      My Portfolio
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                  <Link to="/contact">
                    <div id="button_h" className="ac_btn btn">
                      Contact Me
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
