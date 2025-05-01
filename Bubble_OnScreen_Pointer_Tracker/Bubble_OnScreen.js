"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedButton = ({
  children = "Hover Me",
  width = "192px",
  height = "64px",
  borderColor = "#ff4d9e",
  backgroundColor = "#0d0d2f",
  textColor = "#ff4d9e",
  glowColor = "#4d9eff",
  borderRadius = "0.5rem",
  transparent = false,
}) => {
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

      const distanceX = mouseX - centerX;
      const distanceY = mouseY - centerY;

      const middleLetterOffset = width / 6;
      const isNearBoundary =
        Math.abs(distanceX) > width / 2 - middleLetterOffset ||
        Math.abs(distanceY) > height / 2 - middleLetterOffset;

      gsap.to(button, {
        x: isNearBoundary ? distanceX * 0.15 : 0,
        y: isNearBoundary ? distanceY * 0.15 : 0,
        duration: 0.4,
        ease: "power3.out",
      });

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
        className="relative text-lg font-bold border-2 overflow-hidden transition-all"
        style={{
          width,
          height,
          borderRadius,
          borderColor,
          color: textColor,
          backgroundColor: transparent ? "transparent" : backgroundColor,
          backdropFilter: transparent ? "blur(10px)" : "none",
        }}
      >
        <span ref={textRef} className="relative block transition-transform duration-300">
          {children}
        </span>

        <div
          className="absolute inset-0 opacity-40 blur-xl transition-all duration-500"
          style={{
            backgroundColor: glowColor,
            zIndex: -1,
          }}
        />
      </button>
    </div>
  );
};

export default AnimatedButton;
