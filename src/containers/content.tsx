import React, { CSSProperties } from "react";
import "./content.scss";

type ContentProps = {
    children: React.ReactNode;
    className?: string;
    style?: CSSProperties;
};

const Content = ({ children, className = ``, style = {} }: ContentProps) => (
    <div className={`content ${className}`}>
        <div className={`inner ${className}`} style={style}>
            {children}
        </div>
    </div>
);

export default Content;
