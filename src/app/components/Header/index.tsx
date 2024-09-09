import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowCircleLeft } from "react-icons/fa";

const Header: React.FC = () => {
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  return (
    <header
      className={`fixed z-50 w-full p-4 text-white shadow-md transition-colors duration-300 ease-in-out ${
        isScrolled ? "bg-black" : "bg-transparent"
      } flex justify-between items-center`}
    >
      {typeof window !== "undefined" && window.location.pathname !== "/" && (
        <FaArrowCircleLeft
          className="cursor-pointer text-xl"
          onClick={() => router.push("/")}
        />
      )}

      <h1 className="text-xl font-bold flex-1 text-center">
        MD Music Playlist
      </h1>
    </header>
  );
};

export default Header;
