"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Heart } from "./heart";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// const calendarContentFade: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.8, delay: 0.3, ease: "easeOut" },
//   },
// };

export const EventTimeline = () => {
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: 3 }, (_, i) => i);

  return (
    <section className="w-full flex flex-col items-center bg-white my-14 px-4 space-y-14 overflow-hidden">
      {/* 1. Header (Giữ nguyên) */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        className="w-full flex flex-col items-center text-center space-y-10"
      >
        <motion.div variants={fadeUp}>
          <Heart />
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="relative w-[280px] h-[45px] md:w-[320px] md:h-[50px]"
        >
          <Image
            src="/images/save-the-date.webp"
            alt="Save The Date"
            fill
            className="object-contain"
          />
        </motion.div>
        <motion.div
          variants={fadeUp}
          className="text-sm md:text-md leading-relaxed tracking-wide"
        >
          Đi một vòng lớn rồi vẫn gặp anh, <br /> Từ đó, thế gian bỗng hóa dịu
          dàng.
        </motion.div>
      </motion.div>

      {/* 2. KHỐI LỊCH */}
      <div className="w-full flex justify-center">
        <div
          className="relative w-full max-w-[450px] aspect-500/850 bg-no-repeat bg-center bg-size-[100%_100%] shadow-2xl"
          style={{
            backgroundImage: "url('/images/date-frame.png')",
          }}
        >
          <div className="absolute top-[3%] left-[5%] right-[5%] bottom-[17%] overflow-hidden rounded-sm bg-gray-200">
            {/* Ảnh nền trượt lên trước khi chạm 20% khung hình */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full"
            >
              <Image
                fill
                className="object-cover"
                alt="Calendar Background"
                src="/images/TSON5976.webp"
              />
              <div className="absolute inset-x-0 bottom-0 h-[65%] bg-linear-to-t from-black/80 via-black/30 to-transparent pointer-events-none"></div>
            </motion.div>

            {/* Bảng lịch hiện ra sau ảnh 0.3s */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute bottom-6 left-0 w-full px-6"
            >
              <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center text-white text-xs md:text-sm">
                {emptyDays.map((_, idx) => (
                  <div key={`empty-${idx}`}></div>
                ))}
                {daysInMonth.map((day) => (
                  <div
                    key={day}
                    className="relative flex justify-center items-center h-8"
                  >
                    {day === 5 ? (
                      <>
                        <span className="relative z-10 font-bold">{day}</span>
                        <div className="absolute z-0 w-[40px] h-[40px] top-[60%] left-[50%] -translate-x-[50%] -translate-y-[50%] opacity-90">
                          <Image
                            fill
                            alt="Heart Marker"
                            className="object-contain"
                            src="/images/calen-heart.webp"
                          />
                        </div>
                      </>
                    ) : (
                      <span>{day}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CHỖ CẦN SỬA: Tách riêng phần Text này ra với amount: 0.9 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.9 }} // Chỉ hiện khi cuộn thấy 90% phần đáy khung
            transition={{ duration: 0.8 }}
            className="absolute bottom-[6%] left-0 w-full text-center text-gray-300 flex flex-col items-center space-y-2"
          >
            <div className="w-[70%] border-t border-[#333] mb-3"></div>
            <div className="text-base md:text-xl tracking-wide">
              Chủ Nhật, 05/04/2026
            </div>
            <div className="text-base md:text-xl font-light tracking-wide">
              Âm lịch 18/02 | 16:00 PM
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. Lời kết (Sửa amount lên cao để hiện sau cùng) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="w-full text-center text-sm md:text-base italic leading-relaxed pt-2"
      >
        Hạnh phúc lớn nhất chính là được nắm tay anh, <br /> Cùng nhau đi hết
        cuộc đời lãng mạn này
      </motion.div>
    </section>
  );
};
