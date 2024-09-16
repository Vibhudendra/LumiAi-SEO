"use client";

import Button from "@/components/Button";
import starsBg from "@/assets/stars.png";
import gridLines from "@/assets/grid-lines.png";
import { RefObject, useEffect, useRef } from "react";
import {
  motion,
  motionValue,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";

const useRelativeMousePosition = (to: RefObject<HTMLElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const updateMousePosiion = (event: MouseEvent) => {
    if (!to.current) return;
    const { top, left } = to.current.getBoundingClientRect();
    mouseX.set(event.x - left);
    mouseY.set(event.y - top); 
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosiion);

    return () => {
      window.removeEventListener("mousemove", updateMousePosiion);
    };
  });

  return [mouseX, mouseY];
};

const CallToAction = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const borderedDivRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundPositionY = useTransform(
    scrollYProgress,
    [0, 1],
    [-300, 300]
  );

  const [mouseX, mouseY] = useRelativeMousePosition(borderedDivRef);

  const maskImage = useMotionTemplate`radial-gradient(50% 50% at ${mouseX}px, ${mouseY}px, black, transparent)`;

  return (
    <section ref={sectionRef} className="py-20 md:py-24">
      <div className="container">
        <motion.div
          ref={borderedDivRef}
          className="border border-white/15 py-24 rounded-xl overflow-hidden relative group"
          animate={{
            backgroundPositionX: starsBg.width,
          }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
          style={{
            backgroundImage: `url(${starsBg.src})`,
            backgroundPositionY,
          }}
        >
          {/* Static  - start */}
          {/* <div
            className="absolute inset-0 bg-[rgb(74,32,138,0.7)] bg-blend-overlay group-hover:opacity-0 transition duration-700"
            style={{
              backgroundImage: `url(${gridLines.src})`,
            }}
          ></div> */}
          {/* Static  - End */}
          {/* While hovered - start */}
          <motion.div
            className="absolute inset-0 bg-[rgb(74,32,138,0.5)] bg-blend-overlay [mask-image:radial-gradient(50%_50%_at_50%_35%,black,transparent)] opacity-0 group-hover:opacity-100 transition duration-700"
            style={{
              maskImage,
              backgroundImage: `url(${gridLines.src})`,
            }}
          ></motion.div>
          {/* While hovered - End */}
          <div className="relative">
            <h2 className="text-5xl md:text-6xl max-w-sm mx-auto text-center font-medium tracking-tighter">
              AI-driven SEO for everyone
            </h2>
            <p className="text-lg md:text-xl max-w-xs mx-auto text-center text-white/70 px-4 tracking-tight mt-5">
              Achieve clear, impactful results without the complexity.
            </p>
            <div className="flex justify-center mt-8">
              <Button title="Join waitlist" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
