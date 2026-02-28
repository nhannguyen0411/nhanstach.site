"use client";

import { motion, Variants } from "framer-motion";
import { WeddingVenue } from "./wedding-venue";

// Định nghĩa hiệu ứng cho Khối Cha (điều phối thời gian)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Các con hiện cách nhau 0.2s
      delayChildren: 0.1, // Đợi 0.1s mới bắt đầu
    },
  },
};

// Định nghĩa hiệu ứng cho Khối Con (trượt từ dưới lên)
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const InvitationInfo = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full flex flex-col items-center my-14"
    >
      <div className="w-full flex flex-col items-center justify-center space-y-4 text-center">
        {/* 1. Câu dẫn nhập tiệc */}
        <motion.div
          variants={itemVariants}
          className="text-sm md:text-base tracking-wide uppercase leading-relaxed font-light"
        >
          Đến dự buổi tiệc chung vui <br />
          cùng gia đình chúng tôi vào lúc
        </motion.div>

        {/* 2. Ngày giờ dương lịch */}
        <motion.div
          variants={itemVariants}
          className="text-gold text-lg md:text-2xl font-bold tracking-wide uppercase leading-snug"
        >
          18 Giờ 00 | Chủ Nhật | 05.04.2026
        </motion.div>

        {/* 3. Ngày âm lịch */}
        <motion.div
          variants={itemVariants}
          className="text-xs md:text-sm italic font-light"
        >
          (Nhằm ngày 18 tháng 02 năm Canh Tuất)
        </motion.div>

        {/* 4. Divider Image */}
        <motion.div
          variants={itemVariants}
          className="w-full flex justify-center"
        >
          <div
            className="w-[200px] h-[30px] bg-size-[100%_auto] bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/footer-main-page.svg')",
            }}
          />
        </motion.div>

        {/* 5. Nơi diễn ra hôn lễ (Component con này sẽ tự chạy animation của nó) */}
        <WeddingVenue />
      </div>
    </motion.section>
  );
};
