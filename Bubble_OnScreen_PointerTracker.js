"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedButton = () => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    if (!button || !text) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Distance from button center
      const distanceX = mouseX - centerX;
      const distanceY = mouseY - centerY;

      // Check if middle text letter hits the button boundary
      const middleLetterOffset = width / 6; // Adjust this for sensitivity
      const isNearBoundary =
        Math.abs(distanceX) > width / 2 - middleLetterOffset ||
        Math.abs(distanceY) > height / 2 - middleLetterOffset;

      // Move button only when the text "touches" the button edge
      gsap.to(button, {
        x: isNearBoundary ? distanceX * 0.15 : 0, // Slight movement effect
        y: isNearBoundary ? distanceY * 0.15 : 0,
        duration: 0.4,
        ease: "power3.out",
      });

      // Text moves independently for tracking effect
      gsap.to(text, {
        x: distanceX * 0.3,
        y: distanceY * 0.3,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <button
        ref={buttonRef}
        className="relative w-48 h-16 text-lg font-bold border-2 rounded-lg overflow-hidden transition-all"
        style={{
          borderColor: "#ff4d9e",
          color: "#ff4d9e",
          backgroundColor: "#0d0d2f",
          position: "relative",
        }}
      >
        {/* Text inside button */}
        <span ref={textRef} className="relative block transition-transform duration-300">
          Hover Me
        </span>

        {/* Bubble Glow Effect */}
        <div
          className="absolute inset-0 opacity-40 blur-xl transition-all duration-500"
          style={{
            backgroundColor: "#4d9eff", // Blue Glow
            zIndex: -1,
          }}
        ></div>
      </button>
    </div>
  );
};

export default AnimatedButton;
