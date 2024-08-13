import React from "react";
import Feature from "./Feature";
import "../Styles/gallerylisting.css";
import { motion } from "framer-motion";

const GalleryListing = ({ data, open }) => {
  const { imageUrl, name, location, date} =
    data;

  return (
    <motion.div className="gallerylisting" onClick={open} whileHover={{ scale: 1.1 }}>
      <div className="gallerylisting__content">
        <div className="galleryimage-container">
            <div className="gallerylisting__image-container">
            <img
                className="gallerylisting__image"
                alt="Event Pic"
                src={imageUrl[0]}
            />
            </div>
        </div>
        <div className="gallerylisting__details">
          <div className="gallerylisting__row">
            <span className="listing__name">{name}</span>
          </div>
          <div className="gallerylisting__row">
            <span className="gallerylisting__role">{location}</span>
          </div>
          <div className="gallerylisting__row">
            <span className="gallerylisting__role">{date}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryListing;