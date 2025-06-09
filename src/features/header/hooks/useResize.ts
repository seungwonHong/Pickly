import { useEffect, useState } from "react";

const useResize = () => {
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setClicked(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { clicked, setClicked };
};

export default useResize;
