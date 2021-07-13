import React from "react";
import _ from "lodash";
import { Link } from "gatsby";
import { projects } from "../../data/projects";

import "./portfolio.scss";

export default function Portfolio() {
    const renderCategory = (category, idx) => {
        return (
            <div className="portfolioCategory" key={idx}>
                <h6 className="portfolioCategoryLabel">{category.category}</h6>
                {category.projects.map(renderItem)}
            </div>
        );
    };

    const renderItem = (item, idx) => {
        return (
            <div className="portfolioItem" key={idx}>
                <h2>{item.title}</h2>
                <div className="portfolioItemDescription">
                    <div className="portfolioItemTools">
                        <h6>Tools Used</h6>
                        {item.tools.map(renderTool)}
                    </div>
                    {item.description}
                    <Link
                        to={item.link}
                        type="button"
                        className="portfolioItemLink btn"
                    >
                        Check it out ⇛
                    </Link>
                </div>
                <div className="portfolioItemImages">
                    {item.images &&
                        item.images.map((image, idx) =>
                            renderImage(image, idx, item.imageContentStyle)
                        )}
                    {item.component &&
                        renderComponent(item.component, item.imageStyle)}
                </div>
            </div>
        );
    };

    function renderComponent(component, style = {}) {
        let Component = component;
        return (
            <div className="portfolioItemImage" style={style}>
                <Component />
            </div>
        );
    }

    function renderTool(tool, idx) {
        return (
            <div className="portfolioItemTool" key={idx}>
                <div className="pill">{tool}</div>
            </div>
        );
    }

    const renderImage = (image, idx, imageContentStyle = {}) => {
        return (
            <div className="portfolioItemImage" key={idx}>
                <div
                    className="portfolioItemImageContent"
                    style={{
                        backgroundImage: `url(${image})`,
                        ...imageContentStyle,
                    }}
                />
            </div>
        );
    };
    return (
        <div>
            <h2>Projects</h2>
            {projects.map(renderCategory)}
        </div>
    );
}
