"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

// 1. Variants cho 3 chữ Header (Chạy cùng lúc từ 3 hướng)
// const leftIn: Variants = {
//   hidden: { opacity: 0, x: -60, y: -20 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     y: 0,
//     transition: { duration: 1, ease: "easeOut" },
//   },
// };

// const topIn: Variants = {
//   hidden: { opacity: 0, y: -60 },
//   visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
// };

// const rightIn: Variants = {
//   hidden: { opacity: 0, x: 60, y: -20 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     y: 0,
//     transition: { duration: 1, ease: "easeOut" },
//   },
// };

// 2. Variants cho Ảnh và Chữ (Trượt lên độc lập)
const imageFadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const textFadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.3, ease: "easeOut" },
  },
};

export const WelcomeCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Lưu ý: Đã cập nhật ngày sang 05.04.2026 như yêu cầu trước đó của bạn
    const targetDate = new Date("2026-04-05T16:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full flex flex-col items-center my-14 bg-white overflow-hidden">
      {/* 1. Tiêu đề Welcome To Wedding (3 chữ hội tụ) */}
      {/* <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full flex justify-between px-2 md:px-5 mb-2 text-base md:text-lg tracking-widest uppercase font-light"
      >
        <motion.span variants={leftIn}>Welcome</motion.span>
        <motion.span variants={topIn}>To</motion.span>
        <motion.span variants={rightIn}>Wedding</motion.span>
      </motion.div> */}

      {/* 2. Khối nền tối chứa Khung Ảnh & Quote */}
      <div className="w-full bg-black flex flex-col items-center">
        <div
          className="relative w-full aspect-500/900 bg-no-repeat bg-center bg-size-[100%_100%] flex flex-col justify-between space-y-2 py-[5.5%] px-[9.5%]"
          style={{
            backgroundImage: "url('/images/countdown-frame.webp')",
          }}
        >
          {/* Ảnh 1 + Quote 1 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative w-full h-[32.5%] overflow-hidden"
          >
            <motion.div
              variants={imageFadeUp}
              className="relative w-full h-full"
            >
              <Image
                src="/images/TSON5818.webp"
                alt="Phuong Trang & Trong Nhan Gallery 1"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>
            </motion.div>
          </motion.div>

          {/* Ảnh 2 + Quote 2 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative w-full h-[32.5%] overflow-hidden"
          >
            <motion.div
              variants={imageFadeUp}
              className="relative w-full h-full"
            >
              <Image
                src="/images/TSON6107.webp"
                alt="Phuong Trang & Trong Nhan Gallery 2"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>
            </motion.div>
          </motion.div>

          {/* Ảnh 3 + Quote 3 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative w-full h-[32.5%] overflow-hidden"
          >
            <motion.div
              variants={imageFadeUp}
              className="relative w-full h-full"
            >
              <Image
                src="/images/TSON6195.webp"
                alt="Phuong Trang & Trong Nhan Gallery 3"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent pointer-events-none"></div>
            </motion.div>
          </motion.div>
        </div>

        {/* 3. Đồng hồ đếm ngược (Countdown) - Trượt lên */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="w-[85%] bg-black border border-[#333] mb-6 p-6 rounded-md shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <div className="flex justify-between items-center text-white">
            <div className="flex flex-col items-center w-1/4">
              <span className="text-2xl md:text-4xl font-medium tracking-wider text-gold">
                {timeLeft.days}
              </span>
              <span className="text-xss uppercase tracking-widest mt-2 text-gray-400">
                ngày
              </span>
            </div>
            <div className="flex flex-col items-center w-1/4 border-l border-[#333]">
              <span className="text-2xl md:text-4xl font-medium tracking-wider text-gold">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-xss uppercase tracking-widest mt-2 text-gray-400">
                giờ
              </span>
            </div>
            <div className="flex flex-col items-center w-1/4 border-l border-[#333]">
              <span className="text-2xl md:text-4xl font-medium tracking-wider text-gold">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-xss uppercase tracking-widest mt-2 text-gray-400">
                phút
              </span>
            </div>
            <div className="flex flex-col items-center w-1/4 border-l border-[#333]">
              <span className="text-2xl md:text-4xl font-medium tracking-wider text-gold">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-xss uppercase tracking-widest mt-2 text-gray-400">
                giây
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
