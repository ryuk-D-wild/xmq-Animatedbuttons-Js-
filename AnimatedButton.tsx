"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedButton = () => {
  console.log("AnimatedButton component is rendering..."); // Debugging

  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);

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
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: "power3.out",
      });

      gsap.to(bubble, {
        x: x * 0.1,
        y: y * 0.1,
        opacity: 1,
        scale: 1.3,
        duration: 0.4,
        ease: "power3.out",
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
      <button
        ref={buttonRef}
        className="relative w-48 h-16 bg-blue-500 text-white text-lg font-bold rounded-lg overflow-hidden border-2 border-blue-400"
      >
        <span
          ref={textRef}
          className="relative block transition-transform duration-300"
        >
          Hover Me
        </span>

        <div
          ref={bubbleRef}
          className="absolute inset-0 bg-blue-300 opacity-0 blur-xl transition-all duration-500"
        ></div>
      </button>
    </div>
  );
};

export default AnimatedButton;
