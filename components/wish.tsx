"use client";

import { motion } from "framer-motion";

export const Wish = () => {
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
      className="w-full flex flex-col items-center justify-center px-5 text-center my-14"
    >
      <div className="text-xs md:text-sm leading-loose font-extralight">
        Gửi đến bạn tấm thiệp cưới đầy yêu thương. <br /> Bạn là người đặc biệt
        với bọn mình. <br /> Mong bạn và gia đình sẽ đến chung vui, <br /> Cùng
        chứng kiến khoảnh khắc hạnh phúc nhất của hai đứa.
        <br /> Cảm ơn vì luôn bên cạnh và yêu thương. <br /> Bọn mình rất mong
        được gặp bạn trong ngày vui này! ❤️
      </div>
    </motion.section>
  );
};
