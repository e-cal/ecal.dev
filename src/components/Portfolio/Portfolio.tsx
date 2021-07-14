import React from "react";
import _ from "lodash";
import { Link } from "gatsby";
import { projects } from "../../data/projects";
import Content from "../../containers/content";
import Video from "../Video/Video";

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
                        <h6>Tools</h6>
                        {item.tools.map(renderTool)}
                    </div>
                    {item.description}
                    <Link
                        to={item.link}
                        type="button"
                        className="portfolioItemLink btn"
                        style={{ marginTop: "1em" }}
                    >
                        Check it out ➦
                    </Link>
                </div>
                <div className="portfolioItemImages">
                    {item.images &&
                        item.images.map((image, idx) =>
                            renderImage(image, idx, item.style)
                        )}
                    {item.component &&
                        renderComponent(item.component, item.style)}
                    {item.video && renderVideo(item.video, item.style)}
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
    function renderVideo(video, style = {}) {
        return (
            <div className="portfolioItemImage" style={style}>
                <Video id={video} />
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
        <Content className="portfolio">
            <h2>Projects</h2>
            {projects.map(renderCategory)}
        </Content>
    );
}
