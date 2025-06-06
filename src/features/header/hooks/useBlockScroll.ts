import { useEffect, useState } from "react";

const useBlockScroll = () => {
  const [openSearch, setOpenSearch] = useState(false);

  useEffect(() => {
    if (openSearch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openSearch]);

  return { openSearch, setOpenSearch };
};

export default useBlockScroll;
