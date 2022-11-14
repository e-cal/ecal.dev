import React from "react";
import "./style.css";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { socials } from "../../content";

export const Socialicons = (params) => {
  return (
    <div className="stick_follow_icon">
      <ul>
        {socials.email && (
          <li>
            <a href={socials.email}>
              <FaEnvelope />
            </a>
          </li>
        )}
        {socials.linkedin && (
          <li>
            <a href={socials.linkedin}>
              <FaLinkedin />
            </a>
          </li>
        )}
        {socials.github && (
          <li>
            <a href={socials.github}>
              <FaGithub />
            </a>
          </li>
        )}
        {socials.twitter && (
          <li>
            <a href={socials.twitter}>
              <FaTwitter />
            </a>
          </li>
        )}
      </ul>
      <p>Connect</p>
    </div>
  );
};
