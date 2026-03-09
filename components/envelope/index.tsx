"use client";

import { useState } from "react";
import Image from "next/image";
import "./style.css";
import flowerTopLeft from "@/public/images/flower-top-left.webp";
import flowerBottomRight from "@/public/images/flower-bottom-right.webp";

interface EnvelopeProps {
  onOpen?: () => void;
}

type Phase = "front" | "flipped" | "open";

export const Envelope = ({ onOpen }: EnvelopeProps) => {
  const [phase, setPhase] = useState<Phase>("front");
  // Safari không hỗ trợ backface-visibility: hidden đáng tin cậy (bug với
  // will-change, box-shadow, compositing layer). Dùng opacity để ẩn front face
  // ngay khi click — trước khi back face xuất hiện (~180ms với ease-out curve).
  const [frontOpaque, setFrontOpaque] = useState(true);

  const handleOpen = () => {
    if (phase !== "front") return;
    setFrontOpaque(false); // ẩn ngay lập tức, transition 0.18s trong CSS
    setPhase("flipped");
    setTimeout(() => {
      setPhase("open");
      if (onOpen) onOpen();
    }, 850);
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
        {/* Flip outer: handles positioning + float animation */}
        <div className={`envelope-flip-outer ${phase !== "front" ? "flipped" : ""}`}>
          {/* Flip inner: handles 3D rotation */}
          <div className="envelope-flip-inner">

            {/* FRONT FACE */}
            <div className="envelope-face card-front" style={{ opacity: frontOpaque ? 1 : 0 }}>
              <div className="card-flower card-flower-tl">
                <Image
                  fill
                  alt="Flower Top Left"
                  src={flowerTopLeft}
                  placeholder="blur"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="card-flower card-flower-br">
                <Image
                  fill
                  alt="Flower Bottom Right"
                  className="object-contain"
                  src={flowerBottomRight}
                  placeholder="blur"
                  priority
                />
              </div>
              <div className="card-logo-wrap">
                <Image
                  src="/images/logo.webp"
                  alt="NT Monogram"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="card-text-block">
                <div className="card-names">TRỌNG NHÂN &amp; PHƯƠNG TRANG</div>
                <div className="card-date">CHỦ NHẬT — 05.04.2026</div>
                <div className="card-divider" />
              </div>
            </div>

            {/* BACK FACE */}
            <div className="envelope-face card-back">
              <div className={`envelope-container ${phase === "open" ? "open" : "close"}`}>
                <div className="front flap back-flap" />
                <div className="front pocket back-pocket" />
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
            </div>

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
