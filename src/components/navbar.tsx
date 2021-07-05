import React from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import "./styles/navbar.scss";

function HomeLink() {
    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `
    );
    return (
        <div className="HomeLink">
            <Link to="/">{data.site.siteMetadata.title}</Link>
        </div>
    );
}

const NavLink = (props: any) => (
    <li className="NavLink">
        <Link to={props.to}>{props.children}</Link>
    </li>
);

export default function Navbar() {
    return (
        <ul className="Navbar">
            <HomeLink />
            <NavLink to="/about/">About</NavLink>
            <NavLink to="/contact/">Contact</NavLink>
        </ul>
    );
}
