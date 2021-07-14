import React from "react";
import PropTypes from "prop-types";
import "./video.scss";

const Video = ({ id }) => (
    <iframe
        className="video"
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
    />
);

Video.propTypes = {
    embedId: PropTypes.string.isRequired,
};

export default Video;
