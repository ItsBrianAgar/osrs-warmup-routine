import { useEffect, useRef, useState } from "react";

const useLightEffect = (ease = 0.1) => {
  const lightRef = useRef(null);
  const wrapperRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const lightPosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const lightEffect = lightRef.current;

    const handleMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => {
      lightEffect.style.opacity = ".5";
    };

    const handleMouseLeave = () => {
      lightEffect.style.opacity = "0";
    };

    const animateLight = () => {
      lightPosition.current.x +=
        (mousePosition.x - lightPosition.current.x) * ease;
      lightPosition.current.y +=
        (mousePosition.y - lightPosition.current.y) * ease;

      lightEffect.style.left = `${lightPosition.current.x - 200}px`;
      lightEffect.style.top = `${lightPosition.current.y - 200}px`;

      animationFrameId.current = requestAnimationFrame(animateLight);
    };

    if (wrapper && lightEffect) {
      wrapper.addEventListener("mousemove", handleMouseMove);
      wrapper.addEventListener("mouseenter", handleMouseEnter);
      wrapper.addEventListener("mouseleave", handleMouseLeave);
      animateLight();
    }

    return () => {
      if (wrapper) {
        wrapper.removeEventListener("mousemove", handleMouseMove);
        wrapper.removeEventListener("mouseenter", handleMouseEnter);
        wrapper.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [ease, mousePosition]);

  return { lightRef, wrapperRef };
};

export default useLightEffect;
