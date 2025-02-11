import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ButtonWrapper from "./BookLoader";

export const LandingPage = () => {  
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="https://cdn.pixabay.com/photo/2024/12/03/08/08/ai-generated-9241538_1280.jpg"
        subheading="Find Your Next Dream Job"
        heading="JobHub"
      >
        <ExampleContent />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1616587894289-86480e533129?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGludGVydmlld3xlbnwwfHwwfHx8MA%3D%3D"
        subheading="JobHub – Your Smart Job Search Assistant"
      >
        <ExampleContent2 />
       </TextParallaxContent>
      
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-3xl"
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
        {subheading}
      </p>
      <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
    </motion.div>
  );
};

const ExampleContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Key Features of JobHub
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
✔ Resume Parsing – Upload your resume, and JobHub extracts your skills to match relevant job opportunities.
  <br/>
✔ Personalized Job Recommendations – Get job listings tailored to your skillset and experience.
<br/>
✔ Multi-Platform Job Aggregation – Find jobs from LinkedIn, Internshala, Indeed, and more in one place.
<br/>
✔ JobLetter Alerts – Receive personalized job notifications straight to your email.
<br/>
✔ Seamless Job Search Experience – Easy-to-use platform to help you land your dream job faster!
      </p>
    </div>
  </div>
);

const ExampleContent2 = () => {
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate('/sign-up');
  };

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
      <div className="col-span-1 md:col-span-8">
        <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
          Unlock endless career opportunities with JobHub – your all-in-one smart job search assistant! 🚀 Start now and land your dream job effortlessly!
        </p>
      </div>
      <button onClick={handleBtnClick}>
        <ButtonWrapper />
      </button>
    </div>
  );
};
