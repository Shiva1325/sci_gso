import React from "react";
import Feature from "./Feature";
import "../Styles/listing.css";
import { motion } from "framer-motion";

const Listing = ({ data, open }) => {
  const { imageUrl, name, role, phone, mail, about, department, SocialMediaHandles } =
    data;

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
          
          <div className="listing__row socialmediaHandles">
            <Feature iconName={"FaEnvelope"} />
            <Feature iconName={"FaGithub"} />
            <Feature iconName={"FaLinkedin"} />
            <Feature iconName={"FaInstagram"} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Listing;