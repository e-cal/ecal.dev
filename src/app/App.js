import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    BrowserRouter as Router,
    useLocation,
    withRouter,
} from "react-router-dom";
import AppRoutes from "./routes";
import Headermain from "../header";
import "./App.css";
import { ParticleEffect } from "../components/particles.js";

function _ScrollToTop(props) {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return props.children;
}
const ScrollToTop = withRouter(_ScrollToTop);

export default function App() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <ParticleEffect />
            <ScrollToTop>
                <Headermain />
                <AppRoutes />
            </ScrollToTop>
        </Router>
    );
}
