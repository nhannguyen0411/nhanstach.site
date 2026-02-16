"use client";

import { useState } from "react";
import "./style.css";

export const Envelope = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Sử dụng my-10 để giảm khoảng cách trên Mobile, my-20 trên Desktop
    <section className="w-full h-[300px] md:h-[350px] my-24 md:my-28 flex flex-col items-center">
      {/* Dòng chữ hướng dẫn - Dùng text-md đã định nghĩa */}
      <div className="text-center text-base md:text-xl font-extralight mb-6 md:mb-10">
        Chạm để mở thiệp
      </div>

      {/* --- PHẦN PHONG BÌ CHÍNH --- */}
      <div
        className="relative w-full flex justify-center cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {/* envelope-container cần được đảm bảo không tràn lề trên mobile */}
        <div
          className={`envelope-container ${isOpen ? "open" : "close"} scale-90 md:scale-100`}
        >
          {/* Nắp phong bì */}
          <div className="front flap" />
          {/* Thân phong bì */}
          <div className="front pocket" />

          {/* Con dấu sáp đỏ */}
          <div
            className="wax-seal"
            style={{
              backgroundImage: "url('/images/wax-seal.webp')",
            }}
          />

          {/* Ruột thư bên trong */}
          <div
            className="letter"
            style={{
              backgroundImage: "url('/images/TSON5866.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Hiệu ứng trái tim bay ra */}
          <div className="hearts">
            <div className="heart a1" />
            <div className="heart a2" />
            <div className="heart a3" />
          </div>
        </div>

        {/* Bóng đổ phong bì */}
        <div className="envelope-shadow scale-90 md:scale-100" />

        {/* Dòng chữ trân trọng kính mời - Dùng text-md-plus (17px) cho Mobile */}
        <div className="absolute top-[235px] md:top-[250px] w-full text-center z-10 font-extralight text-md-plus md:text-lg text-gray-500 tracking-wide pointer-events-none">
          TRÂN TRỌNG KÍNH MỜI
        </div>
      </div>
    </section>
  );
};
