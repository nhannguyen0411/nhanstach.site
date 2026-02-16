"use client";

import { motion } from "framer-motion";

export const Heart = () => {
  return (
    <motion.section
      // 1. Trạng thái ban đầu: mờ và tụt xuống 30px
      initial={{ opacity: 0, y: 30 }}
      // 2. Khi lướt tới: hiện rõ và trượt lên vị trí gốc
      whileInView={{ opacity: 1, y: 0 }}
      // 3. Chạy 1 lần duy nhất khi khối hiện ra 20%
      viewport={{ once: true, amount: 0.2 }}
      // 4. Chuyển động mượt mà trong 0.8 giây
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full flex flex-col items-center justify-center px-5 text-center"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="currentColor"
        />
      </svg>
    </motion.section>
  );
};
