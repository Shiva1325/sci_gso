import React from "react";
import "../Styles/gallerymodal.css";
import Feature from "./Feature";
import { IoCloseCircleOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import Carousel from "./ImageCarousel";

const GalleryModal = ({ data, close }) => {
  const {
    imageUrl,
    name, location, date, about, department
  } = data;

  const modalVariants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 0.2 },
    },
    closed: { opacity: 0 },
  };

  // const imageVariants = {
  //   open: { opacity: 1, y: "0vh" },
  //   closed: { opacity: 0, y: "-10vh" },
  // };

  const modalInfoVariants = {
    open: { opacity: 1, transition: { staggerChildren: 0.2 } },
    closed: { opacity: 0 },
  };

  const modalRowVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "10%" },
  };

  return (
    <motion.div
      className="modal"
      variants={modalVariants}
      onClick={(e) => e.stopPropagation()}
    >
      {/* <motion.img
        className="gallery_modal__image"
        alt="Event Pic"
        src={imageUrl[1]}
        variants={imageVariants}
      ></motion.img> */}
          <Carousel images={imageUrl} />
          <motion.div className="gallery_modal__info" variants={modalInfoVariants}>
            <motion.div className="gallery_modal__row" variants={modalRowVariants}>
              <span className="gallery_modal__price">{name}</span>
            </motion.div>
            <motion.div className="gallery_modal__row" variants={modalRowVariants}>
              <span className="gallery_modal__address">{location}</span>
            </motion.div>
            <motion.div className="gallery_modal__row" variants={modalRowVariants}>
              <span className="gallery_modal__address">{date}</span>
            </motion.div>
            <motion.div className="gallery_modal__row" variants={modalRowVariants}>
              <span className="gallery_modal__address">{department}</span>
            </motion.div>
            <motion.div
              className="gallery_modal__description-wrapper"
              variants={modalRowVariants}
            >
              <p className="gallery_modal__description">{about}</p>
            </motion.div>
            {/* <motion.div className="gallery_modal__row" variants={modalRowVariants}>
              <span className="gallery_modal__address">{about}</span>
            </motion.div> */}
            
            {/* <motion.div className="modal__row" variants={modalRowVariants}>
                <Feature iconName={"FaEnvelope"} />
                <Feature iconName={"FaGithub"} />
                <Feature iconName={"FaLinkedin"} />
                <Feature iconName={"FaInstagram"} />
            </motion.div> */}
            <motion.button
              className="gallery_modal__close-wrapper"
              whileHover={{ scale: 1.2 }}
              onClick={close}
            >
              <IoCloseCircleOutline className="gallery_modal__close-icon" />
            </motion.button>
            
          </motion.div>
      
    </motion.div>
  );
};

export default GalleryModal;