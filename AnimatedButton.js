"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedButton = () => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const bubbleRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    const bubble = bubbleRef.current;
    if (!button || !text || !bubble) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      // Attraction Strength (Inverse of Distance)
      const maxDistance = window.innerWidth / 2;
      const strength = Math.max(0, 1 - distance / maxDistance);

      gsap.to(text, {
        x: distanceX * strength * 0.6,
        y: distanceY * strength * 0.6,
        duration: 0.4,
        ease: "power3.out",
      });

      gsap.to(bubble, {
        x: distanceX * strength * 0.4,
        y: distanceY * strength * 0.4,
        opacity: 0.7 + strength * 0.3, // Slight glow effect
        scale: 1.2 + strength * 0.5,
        duration: 0.4,
        ease: "power3.out",
        backgroundColor: "#e6bc87", // Nebula Blue glow effect
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative">
      {/* Gooey Effect Filter */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 60">
        <filter id="gooey">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
          />
        </filter>
      </svg>

      {/* Button */}
      <button
        ref={buttonRef}
        className="relative w-48 h-16 text-lg font-bold rounded-lg overflow-hidden border-2 border-[#0b0d2f] text-[#e6bc87]"
        style={{
          backgroundColor: "#0b0d2f", // Nebula blue background
          position: "relative",
          transition: "background 0.3s",
        }}
      >
        {/* Tracking Text */}
        <span ref={textRef} className="relative block transition-transform duration-300">
          Hover Me
        </span>

        {/* Animated Bubble */}
        <div
          ref={bubbleRef}
          className="absolute inset-0 opacity-50 blur-xl transition-all duration-500"
          style={{ backgroundColor: "#0b0d2f" }}
        ></div>
      </button>
    </div>
  );
};

export default AnimatedButton;
