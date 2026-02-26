"use client";

import { useState } from "react";
import "./style.css";

interface EnvelopeProps {
  onOpen?: () => void;
}

export const Envelope = ({ onOpen }: EnvelopeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      if (onOpen) onOpen();
    }
  };

  return (
    <section className="w-full h-[300px] md:h-[350px] my-24 md:my-28 flex flex-col items-center">
      <div className="text-center text-base md:text-xl font-extralight mb-6 md:mb-10">
        Chạm để mở thiệp
      </div>

      <div
        className="relative w-full flex justify-center cursor-pointer"
        onClick={handleOpen}
      >
        <div className={`envelope-container ${isOpen ? "open" : "close"} scale-90 md:scale-100`}>
          <div className="front flap" />
          <div className="front pocket" />

          <div
            className="wax-seal"
            style={{ backgroundImage: "url('/images/wax-seal.webp')" }}
          />

          <div
            className="letter"
            style={{
              backgroundImage: "url('/images/TSON5866.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="hearts">
            <div className="heart a1" />
            <div className="heart a2" />
            <div className="heart a3" />
          </div>
        </div>

        <div className="envelope-shadow scale-90 md:scale-100" />

        <div className="absolute top-[235px] md:top-[250px] w-full text-center z-10 font-extralight text-md-plus md:text-lg text-gray-500 tracking-wide pointer-events-none">
          TRÂN TRỌNG KÍNH MỜI
        </div>
      </div>
    </section>
  );
};