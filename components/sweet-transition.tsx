"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

// 1. Variants cho 3 chữ Header (Hội tụ cùng lúc)
const leftIn: Variants = {
  hidden: { opacity: 0, x: -60, y: -20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const topIn: Variants = {
  hidden: { opacity: 0, y: -60 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const rightIn: Variants = {
  hidden: { opacity: 0, x: 60, y: -20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

// 2. Variant cho Ảnh và Quote (Trượt lên từ từ)
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

export const SweetTransition = () => {
  return (
    <section className="relative w-full h-[850px] md:h-[950px] flex flex-col items-center bg-white overflow-hidden my-14">
      {/* 1. Lớp Ảnh Nền */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <Image
          src="/images/TSON5598.webp"
          alt="Sweet Wedding Transition"
          fill
          className="object-cover object-top"
        />
      </motion.div>

      {/* 2. Lớp Gradient Fade Out */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-linear-to-t from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

      {/* 3. Dòng chữ Header ở trên cùng (z-30 để cao nhất) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="absolute top-4 left-0 w-full px-4 md:px-8 flex justify-between z-30 font-serif text-white/90 text-sm md:text-md uppercase font-light drop-shadow-md"
      >
        <motion.span variants={leftIn}>Sweet</motion.span>
        <motion.span variants={topIn}>Wedding</motion.span>
        <motion.span variants={rightIn}>Invitation</motion.span>
      </motion.div>

      {/* 4. Khối Text Quote - Tăng z-index lên 30 và giảm amount để dễ xuất hiện hơn */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }} // Giảm từ 0.8 xuống 0.4 để hiện sớm hơn
        variants={fadeUp}
        className="absolute bottom-8 left-0 w-full px-10 z-30 flex flex-col items-center text-center"
      >
        <div className="font-serif text-xss md:text-sm leading-loose tracking-tight italic text-gray-500">
          Hết lần này đến lần khác, đem chuyện tình riêng khoe với thế gian,
          <br />
          Chỉ vì mỗi lần nhìn em, anh lại thấy đó là điều đáng tự hào nhất.
        </div>
      </motion.div>
    </section>
  );
};
