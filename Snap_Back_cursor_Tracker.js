"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedButton = () => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    const glow = glowRef.current;
    if (!button || !text || !glow) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      // Calculate distance
      const distanceX = mouseX - centerX;
      const distanceY = mouseY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      // Attraction effect range
      const maxDistance = 250; // How far the effect works
      const intensity = Math.max(0, 1 - distance / maxDistance); // Closer = stronger pull

      // Apply attraction effect
      gsap.to(button, {
        x: distanceX * intensity * 0.3,
        y: distanceY * intensity * 0.3,
        duration: 0.4,
        ease: "power3.out",
      });

      // Move text separately for tracking effect
      gsap.to(text, {
        x: distanceX * intensity * 0.5,
        y: distanceY * intensity * 0.5,
        duration: 0.4,
        ease: "power3.out",
      });

      // Glow effect: Increase when closer
      gsap.to(glow, {
        opacity: intensity * 0.8 + 0.2,
        scale: 1 + intensity * 0.3,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      gsap.to(text, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      gsap.to(glow, { opacity: 0.4, scale: 1, duration: 0.6, ease: "power3.out" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <button
        ref={buttonRef}
        className="relative w-48 h-16 text-lg font-bold border-2 rounded-lg overflow-hidden transition-all"
        style={{
          borderColor: "#5b7f97",
          color: "#ff4d9e",
          backgroundColor: "#A4D0AD",
          position: "relative",
        }}
      >
        {/* Text inside button */}
        <span ref={textRef} className="relative block transition-transform duration-300">
          Hover Me
        </span>

        {/* Neon Glow Effect */}
        <div
          ref={glowRef}
          className="absolute inset-0 opacity-40 blur-xl transition-all duration-500"
          style={{
            backgroundColor: "#4d9eff", // Blue Glow
            zIndex: -1,
            filter: "blur(15px)",
          }}
        ></div>
      </button>
    </div>
  );
};

export default AnimatedButton;
