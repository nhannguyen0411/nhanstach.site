"use client";

import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const WeddingVenue = () => {
  return (
    <section className="w-full flex flex-col items-center space-y-4">
      {/* KHỐI 1: Nhóm các thành phần hiện sớm */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-center space-y-4"
      >
        <motion.div
          variants={itemVariants}
          className="text-sm md:text-base tracking-wide uppercase leading-relaxed font-light"
        >
          Hôn lễ được cử hành tại
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="text-gold text-xl md:text-2xl font-bold tracking-wide uppercase leading-snug"
        >
          TƯ GIA NHÀ GÁI
        </motion.div>
      </motion.div>

      {/* KHỐI 2: Địa chỉ - Kích hoạt độc lập khi lộ 80% */}
      <motion.div
        initial={{ opacity: 0, y: 40 }} // Thay vì y: 200 có thể gây khoảng trắng quá lớn trên mobile
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }} // Chìa khóa: Lộ 80% mới chạy
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-sm md:text-base tracking-wide uppercase leading-relaxed font-light text-center"
      >
        58/A ấp Hòa Hiệp, xã Long Hòa, huyện Cần Giờ
      </motion.div>

      {/* KHỐI 3: Nút bấm - Thường hiện sau địa chỉ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex justify-center"
      >
        <a
          href="https://byvn.net/LO9q"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold text-white px-10 py-2 rounded-full shadow-md active:scale-95 transition-transform inline-block"
        >
          Xem đường đi
        </a>
      </motion.div>
    </section>
  );
};
