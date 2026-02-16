"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Heart } from "./heart";

// Variant chung cho hiệu ứng trượt từ dưới lên
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const FinalSection = () => {
  return (
    <section className="w-full flex flex-col items-center my-14 px-4 space-y-16 overflow-hidden">
      {/* 1. KHỐI HỘP QUÀ CƯỚI - Trigger khi hiện 50% */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
        className="flex flex-col items-center space-y-10"
      >
        <Heart />

        {/* Giữ nguyên animate-shake-gift và các class custom của bạn */}
        <div className="relative w-[80px] h-[80px] animate-shake-gift origin-bottom transition-transform">
          <Image
            src="https://assets.cinelove.me/resources/flowchartIcons/bc7ro23uqhun7ge954163l.png"
            alt="Wedding Gift Box Icon"
            fill
            className="object-contain"
          />
        </div>

        <div className="text-lg font-extralight">Hộp quà cưới</div>
      </motion.div>

      {/* 2. KHỐI FORM XÁC NHẬN THAM DỰ (RSVP) - Trigger riêng khi cuộn tới form */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="w-[90%] max-w-[360px] bg-white rounded-md shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-7 border border-gray-100"
      >
        <h3 className="text-center font-bold mb-6">Xác nhận tham dự</h3>

        <form className="space-y-5 text-sm">
          <div className="space-y-2">
            <label className="block">Họ và tên</label>
            <input
              type="text"
              placeholder="Nhập tên của bạn"
              className="w-full border border-gray-300 rounded-md px-3 py-2.5 outline-none focus:border-[#b29d88] focus:ring-1 focus:ring-[#b29d88] transition-all"
            />
          </div>

          <div className="space-y-3 pt-1">
            <label className="block">Bạn sẽ tham dự chứ?</label>
            <div className="space-y-2.5 text-xs md:text-sm">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  defaultChecked
                  className="w-4 h-4 text-blue-500 focus:ring-blue-500 cursor-pointer"
                />
                <span>Có, tôi sẽ tham dự</span>
              </label>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  className="w-4 h-4 text-blue-500 focus:ring-blue-500 cursor-pointer"
                />
                <span>Tôi bận, rất tiếc không thể tham dự</span>
              </label>
            </div>
          </div>

          <div className="space-y-2 pt-1">
            <label className="block text-[#333]">Số lượng người tham dự</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2.5 outline-none focus:border-[#b29d88] focus:ring-1 focus:ring-[#b29d88] bg-white transition-all cursor-pointer">
              <option value="1">1 người</option>
              <option value="2">2 người</option>
              <option value="3">3 người</option>
              <option value="4">4 người</option>
              <option value="5">5 người</option>
            </select>
          </div>

          <div className="pt-4">
            <button
              type="button"
              className="w-full bg-[#b29d88] text-white font-medium py-3 rounded-md hover:bg-[#a38e79] active:scale-[0.98] transition-all"
            >
              Gửi xác nhận
            </button>
          </div>
        </form>
      </motion.div>

      {/* 3. KHỐI CHIBI & THANK YOU - Trigger khi cuộn tới đáy thiệp */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={fadeUp}
        className="flex flex-col items-center space-y-10 pt-8"
      >
        <div className="relative w-[110px] h-[120px]">
          <Image
            src="https://assets.cinelove.me/resources/characters/h4py3okq2aoga2u5n94fcq.png"
            alt="Groom and Bride Chibi Characters"
            fill
            className="object-contain"
          />
        </div>

        <div className="relative w-[220px] h-[60px]">
          <Image
            src="https://assets.cinelove.me/templates/assets/0189eb35-5cf1-4525-a8d0-867f70e0bf67/b2369584-b526-46a5-851b-034c9f2e1e0f.png"
            alt="Thank You Decorative Text"
            fill
            className="object-contain"
          />
        </div>
      </motion.div>
    </section>
  );
};
