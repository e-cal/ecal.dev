import React from "react";
import "./content.scss";

type ContentProps = {
    children: React.ReactNode;
    className?: string;
};

const Content = ({ children, className = `` }: ContentProps) => (
    <div className={`content ${className}`}>
        <div className={`inner ${className}`}>{children}</div>
    </div>
);

export default Content;
