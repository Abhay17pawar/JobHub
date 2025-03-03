import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./NewsLetter.css";

const Example = () => {
  return (
    <div className="flex h-[40px] w-[146px] justify-center ml-[4px] bg-neutral-900 px-2 py-2 font-medium rounded">
      <FlyoutLink href="#" FlyoutContent={PricingContent}>
        Job Letter
      </FlyoutLink>
    </div>
  );
};

const FlyoutLink = ({ children, href, FlyoutContent }) => {
    const [open, setOpen] = useState(false);
    const [isInteracting, setIsInteracting] = useState(false); // Track input focus
  
    const showFlyout = FlyoutContent && (open || isInteracting); // Keep open if interacting
  
    return (
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => !isInteracting && setOpen(false)} // Don't close if interacting
        className="relative w-fit h-fit"
      >
        <a href={href} className="relative text-white">
          {children}
          <span
            style={{
              transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
            }}
            className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-indigo-300 transition-transform duration-300 ease-out"
          />
        </a>
        <AnimatePresence>
          {showFlyout && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute left-full top-0 bg-white text-black"
            >
              <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
              <div className="absolute left-0 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
              <FlyoutContent setIsInteracting={setIsInteracting} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };
  

  const PricingContent = ({ setIsInteracting, navigate }) => {
    return (
      <div>
        <div className="card">
          <span className="card__title">JOBLETTER</span>
          <p className="card__content">
            Get curated job listings delivered to your email every day!  
            <br />  
            <strong>T&Cs :</strong> This is a paid service.  
          </p>
  
          <form className="card__form">
            <input
              required=""
              type="email"
              placeholder="email"
              onFocus={() => setIsInteracting(true)} 
              onBlur={() => setTimeout(() => setIsInteracting(false), 200)} 
            />
            <Link to="/payment" className="card__button">Subscribe</Link>
          </form>
        </div>
      </div>
    );
  };
  

export default Example;