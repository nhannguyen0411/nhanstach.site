"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import tson5475 from "@/public/images/TSON5475.webp";
import tson6302 from "@/public/images/TSON6302.webp";

// Định nghĩa các bộ hiệu ứng (Variants)
const brushVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const leftSideVariant: Variants = {
  hidden: { opacity: 0, x: -50, y: -20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const rightSideVariant: Variants = {
  hidden: { opacity: 0, x: 50, y: -20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export const CoupleProfiles = () => {
  return (
    <section className="w-full flex flex-col items-center my-14 bg-white space-y-14 overflow-hidden">
      {/* 1. Họa tiết trang trí nét cọ - Xuất hiện từ dưới lên */}
      <motion.div
        variants={brushVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="font-imperial-script text-gold text-5xl md:text-6xl tracking-widest"
      >
        My Love
      </motion.div>

      {/* 2. Khối Ảnh Chân Dung (Bố cục song song) */}
      <div className="flex w-full justify-center gap-6 px-8">
        {/* Khối Ảnh Chú Rể (Bên trái) - Xuất hiện từ trái xéo lên */}
        <motion.div
          variants={leftSideVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center w-1/2"
        >
          {/* Sửa lỗi cú pháp aspect ratio: aspect-[180/258] */}
          <div className="relative w-full aspect-180/258 mb-5">
            <Image
              fill
              alt="Groom"
              className="object-cover"
              src={tson6302}
              placeholder="blur"
            />
          </div>
          <div className="text-center">
            <div className="font-light mb-1 text-gray-400 text-sm md:text-base">
              Út Nam
            </div>
            <div className="text-2xl md:text-3xl font-imperial-script">Trọng Nhân</div>
          </div>
        </motion.div>

        {/* Khối Ảnh Cô Dâu (Bên phải) - Xuất hiện từ phải xéo lên */}
        <motion.div
          variants={rightSideVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center w-1/2"
        >
          <div className="relative w-full aspect-180/258 mb-5">
            <Image
              src={tson5475}
              alt="Bride"
              fill
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="text-center">
            <div className="font-light mb-1 text-gray-400 text-sm md:text-base">
              Út Nữ
            </div>
            <div className="text-xl md:text-3xl font-imperial-script">Phương Trang</div>
          </div>
        </motion.div>
      </div>

      {/* 3. Đoạn thơ tình yêu - Xuất hiện từ dưới lên */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col items-center text-center px-10 space-y-8"
      >
        <div className="text-sm md:text-base leading-relaxed italic">
          Không cần lý do lớn, <br />
          Không cần lời hứa dài. <br />
          Chỉ cần có nhau. <br />
        </div>
      </motion.div>
    </section>
  );
};
