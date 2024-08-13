import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Events from './Components/Events';
import Gallery from './Components/Gallery';
import FAQs from './Components/faqs';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useEffect } from 'react';

function App() {
  const location = useLocation();
    const onTop = () => {
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        onTop()
    }, [location.pathname]);
  return (
      <div className='App'>
        <Navbar />
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.pathname}>
              <Route path="/" element = {<Home/>} />
              <Route path="about" element = {<About/>} />
              <Route path="contact" element = {<Contact/>} />
              <Route path="events" element = {<Events/>} />
              <Route path="gallery" element = {<Gallery/>} />
              <Route path="faqs" element = {<FAQs/>} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
  );
}

export default App;
