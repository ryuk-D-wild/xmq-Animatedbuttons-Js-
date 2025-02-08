"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { createParticles } from "./particles"; // Helper function for spark particles

const AnimatedButton = () => {
  const buttonRef = useRef(null);
  const textRef = useRef(null);
  const glowRef = useRef(null);
  const particleContainerRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;
    const glow = glowRef.current;
    const particleContainer = particleContainerRef.current;
    if (!button || !text || !glow || !particleContainer) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const distanceX = mouseX - centerX;
      const distanceY = mouseY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      const maxDistance = 250;
      const intensity = Math.max(0, 1 - distance / maxDistance);

      // Button attraction wobble effect
      gsap.to(button, {
        x: distanceX * intensity * 0.3,
        y: distanceY * intensity * 0.3,
        rotate: distanceX * intensity * 3, // Wobble rotation
        scale: 1 + intensity * 0.05, // Slight scale effect
        duration: 0.4,
        ease: "power3.out",
      });

      // Text separate tracking effect
      gsap.to(text, {
        x: distanceX * intensity * 0.5,
        y: distanceY * intensity * 0.5,
        duration: 0.4,
        ease: "power3.out",
      });

      // Bubbling glow effect
      gsap.to(glow, {
        opacity: intensity * 0.8 + 0.2,
        scale: 1 + intensity * 0.4,
        filter: `blur(${intensity * 20}px)`,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const handleMouseEnter = () => {
      createParticles(particleContainer); // Create spark particles
    };

    const handleMouseLeave = () => {
      gsap.to(button, { x: 0, y: 0, rotate: 0, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      gsap.to(text, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      gsap.to(glow, { opacity: 0.4, scale: 1, filter: "blur(5px)", duration: 0.6, ease: "power3.out" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      <button
        ref={buttonRef}
        className="relative w-48 h-16 text-lg font-bold border-2 rounded-lg overflow-hidden transition-all"
        style={{
          borderColor: "#6EBCAD",
          color: "#A4D0AD",
          backgroundColor: "#0d0d2f",
          position: "relative",
        }}
      >
        <span ref={textRef} className="relative block transition-transform duration-300">
          Hover Me
        </span>

        {/* Bubbling Glow Effect */}
        <div
          ref={glowRef}
          className="absolute inset-0 opacity-40 blur-xl transition-all duration-500"
          style={{
            background: "radial-gradient(circle, #6EBCAD 20%, #A4D0AD 60%, #906D97 90%)",
            zIndex: -1,
            filter: "blur(15px)",
          }}
        ></div>

        {/* Spark Particles */}
        <div ref={particleContainerRef} className="absolute inset-0 pointer-events-none"></div>
      </button>
    </div>
  );
};

export default AnimatedButton;
