import { useEffect, useRef } from "react";

const useLightEffect = () => {
  const lightRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const lightEffect = lightRef.current;

    const handleMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      lightEffect.style.left = `${x - 200}px`;
      lightEffect.style.top = `${y - 200}px`;
      lightEffect.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      lightEffect.style.opacity = "0";
    };

    if (wrapper && lightEffect) {
      wrapper.addEventListener("mousemove", handleMouseMove);
      wrapper.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (wrapper) {
        wrapper.removeEventListener("mousemove", handleMouseMove);
        wrapper.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return { lightRef, wrapperRef };
};

export default useLightEffect;
