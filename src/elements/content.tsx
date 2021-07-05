import React from "react";
import "./styles/content.scss";

type ContentProps = {
    speed: number;
    offset: number;
    children: React.ReactNode;
    className?: string;
    factor?: number;
};

const Content = ({ children, className = `` }: ContentProps) => (
    <div className={`content ${className}`}>
        <div className={`inner ${className}`}>{children}</div>
    </div>
);

export default Content;
