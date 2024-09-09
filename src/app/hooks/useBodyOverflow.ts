import { useEffect } from "react";
import useIsMobile from "./useIsMobile";

const useBodyOverflow = (condition: boolean) => {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      if (condition) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    }
    return () => {
      if (isMobile) {
        document.body.classList.remove("overflow-hidden");
      }
    };
  }, [condition]);
};

export default useBodyOverflow;
