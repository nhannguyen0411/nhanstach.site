"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import tson5627 from "@/public/images/TSON5627.webp";

// 1. Variant cho Header và Ảnh
const topContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Đã loại bỏ staggerChildren để các phần tử con chạy song song
      delayChildren: 0.1,
    },
  },
};

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

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.2 }, // Thêm chút delay để ảnh lên sau 3 chữ một xíu cho mượt
  },
};

export const FallInLove = () => {
  return (
    <section className="w-full flex flex-col items-center my-14 bg-white overflow-hidden">
      {/* KHỐI 1: Header + Ảnh (Dùng chung một trigger cuộn) */}
      <motion.div
        variants={topContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full flex flex-col items-center"
      >
        {/* Header 3 chữ hội tụ - Sẽ bắt đầu và kết thúc cùng lúc */}
        {/* <div className="w-full flex justify-between px-2 md:px-5 text-base md:text-lg tracking-wider text-gray-500 uppercase font-extralight">
          <motion.span variants={leftIn}>Fall In</motion.span>
          <motion.span variants={topIn}>Love</motion.span>
          <motion.span variants={rightIn}>Wedding</motion.span>
        </div> */}

        {/* Khối Ảnh */}
        <motion.div
          variants={fadeUp}
          className="w-full bg-black pt-6 pb-3 flex flex-col"
        >
          <div className="relative w-full h-[260px]">
            <Image
              src={tson5627}
              alt="Fall in love couple portrait"
              fill
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="text-white text-xss md:text-xs font-montserrat text-center mt-3 px-2 font-light tracking-wide">
          We choose to stay by each other’s side for the journey ahead
          </div>
        </motion.div>
      </motion.div>

      {/* KHỐI 2: Lời cảm ơn (Dùng trigger cuộn RIÊNG BIỆT) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="w-full px-2 md:px-6 mt-14 text-center text-sm md:text-base leading-relaxed font-light text-gray-600"
      >
        To Our Family And Friends, <br />
        Thank You For Celebrating Our Special Day, <br />
        For Your Support And For Sharing In Our Joy.
      </motion.div>
    </section>
  );
};
