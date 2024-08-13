import React, { useState } from "react";
import GalleryListing from "./GalleryListing";
import GalleryOverlay from "./GalleryOverlay";
import GalleryModal from "./GalleryModal";
import { AnimatePresence } from "framer-motion";

const GalleryCards = ({ data }) => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <GalleryListing data={data} open={openModal} />
      <AnimatePresence>
        {open && (
          <GalleryOverlay close={closeModal}>
            <GalleryModal data={data} close={closeModal} />
          </GalleryOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryCards;