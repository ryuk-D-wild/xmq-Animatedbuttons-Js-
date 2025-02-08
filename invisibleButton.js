"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedButton = () => {
  console.log("AnimatedButton component is rendering..."); // Debugging

  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const bubbleRef = useRef(null);

  useEffect(() => {
    console.log("useEffect ran inside AnimatedButton"); // Debugging

    const button = buttonRef.current;
    const text = textRef.current;
    const bubble = bubbleRef.current;
    if (!button || !text || !bubble) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = e.clientX - (left + width / 2);
      const y = e.clientY - (top + height / 2);

      gsap.to(text, {
        x: x * 0.4, // Increased effect
        y: y * 0.4,
        duration: 0.2,
        ease: "power3.out",
      });

      gsap.to(bubble, {
        x: x * 0.3, // Increased effect
        y: y * 0.3,
        opacity: 1,
        scale: 1.6, // Bigger bubble
        duration: 0.3,
        ease: "power3.out",
        backgroundColor: "#e6bc87", // Color update
      });
    };

    const handleMouseLeave = () => {
      gsap.to(text, { x: 0, y: 0, duration: 0.3, ease: "power3.out" });
      gsap.to(bubble, { opacity: 0, scale: 1, duration: 0.4, ease: "power3.out" });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative">
      {/* Gooey Filter for the Bubble Effect */}
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
        className="relative w-48 h-16 text-lg font-bold rounded-lg overflow-hidden border-2 border-[#e6bc87] text-[#e6bc87]"
        style={{
          backgroundColor: "transparent",
          filter: "url(#gooey)",
          transition: "background 0.3s",
        }}
      >
        {/* Moving Text */}
        <span ref={textRef} className="relative block transition-transform duration-300">
          Hover Me
        </span>
hello
        {/* Bubble Effect */}
        <div
          ref={bubbleRef}
          className="absolute inset-0 opacity-0 blur-xl transition-all duration-500"
          style={{ backgroundColor: "#e6bc87" }}
        ></div>
      </button>
    </div>
  );
};

export default AnimatedButton;
