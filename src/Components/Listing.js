import React from "react";
import Feature from "./Feature";
import "../Styles/listing.css";
import { motion } from "framer-motion";

const Listing = ({ data, open }) => {
  const { imageUrl, name, role, phone, mail, about, department, SocialMediaHandles } =
    data;

  const handleSocialMediaClick = (event) => {
    event.stopPropagation();
  };

  return (
    <motion.div className="listing" onClick={open} whileHover={{ scale: 1.1 }}>
      {/* <div className="overlay"></div> */}
      <div className="listing__content">
        <div className="image-container">
          <div className="listing__image-container">
            <img
              className="listing__image"
              alt="real estate mansion"
              src={imageUrl}
            />
          </div>
        </div>

        <div className="listing__details">
          {/* <div className="listing__type">{name}</div>
          <div className="listing__row">
            <span className="listing__address">{department}</span>
          </div> */}
          <div className="listing__row">
            <span className="listing__name">{name}</span>
          </div>
          <div className="listing__row">
            <span className="listing__role">{role}</span>
          </div>
          {/* <div className="listing__row">
            <span className="listing__address">{about}</span>
          </div> */}

          <div className="listing__row socialmediaHandles" onClick={handleSocialMediaClick}>
            <Feature iconName={"FaEnvelope"} />
            <a href={SocialMediaHandles.github} target="_blank" rel="noopener noreferrer">
              <Feature iconName={"FaGithub"} />
            </a>
            <a href={SocialMediaHandles.linkedin} target="_blank" rel="noopener noreferrer">
              <Feature iconName={"FaLinkedin"} />
            </a>
            <a href={SocialMediaHandles.instagram} target="_blank" rel="noopener noreferrer">
              <Feature iconName={"FaInstagram"} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Listing;
