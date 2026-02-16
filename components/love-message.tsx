import Image from "next/image";

export const LoveMessage = () => {
  return (
    <section className="w-full bg-white pb-16 pt-10 flex flex-col items-center">
      {/* 1. Đoạn thơ tình yêu mở đầu (Giữ nguyên) */}
      <div className="px-8 font-serif text-[17px] md:text-[19px] leading-[1.8] text-center italic mb-16">
        Có lẽ thế gian này có vô vàn điều tươi đẹp, <br />
        Nhưng trong lòng em, đẹp nhất vẫn chỉ có anh
      </div>

      {/* === KHỐI BỐ CỤC CHÍNH (LAYERED DESIGN) === */}
      {/* Khối relative này là khung chứa, quy định chiều cao tổng thể để chứa các thành phần absolute bên trong */}
      <div className="relative w-full h-[650px] md:h-[750px] overflow-hidden">
        {/* Lớp 1: Dòng chữ MY LOVE FOREVER xoay dọc nằm ở bên trái */}
        <div className="absolute top-[80px] left-[-40px] md:left-[-20px] -rotate-90 flex gap-12 font-montserrat text-gold tracking-[0.4em] uppercase font-medium text-sm md:text-base z-10">
          <span>MY LOVE</span>
          <span>FOREVER</span>
        </div>

        {/* Lớp 2: Ảnh nền dọc (Bên phải) */}
        {/* Đặt width khoảng 70-75% và đẩy sang phải */}
        <div className="absolute top-0 right-[5%] w-[72%] h-[60%] md:h-[65%] shadow-lg border-4 border-white z-0">
          <Image
            src="https://assets.cinelove.me/templates/assets/0189eb35-5cf1-4525-a8d0-867f70e0bf67/e986b1a5-2f6a-4562-ba4b-1ae07685f39e.jpeg" // Thay bằng ảnh thật
            alt="Main Photo"
            fill
            className="object-cover"
          />
        </div>

        {/* Lớp 3: Ảnh cắt viền (Cut-out) của Cô dâu Chú rể nằm đè lên (Bên trái, góc dưới ảnh gốc) */}
        <div className="absolute top-[35%] md:top-[38%] left-[5%] w-[55%] h-[40%] md:h-[45%] z-20 drop-shadow-2xl">
          {/* Lưu ý: Ảnh này bắt buộc phải là ảnh PNG đã tách nền (trong suốt) có viền trắng mờ thì mới ra đúng hiệu ứng */}
          <Image
            src="https://assets.cinelove.me/templates/assets/0189eb35-5cf1-4525-a8d0-867f70e0bf67/8a449f7f-2368-4990-98bc-bd7c9b619f30.jpeg" // Đang mượn tạm ảnh cũ. Bạn CẦN TẠO ẢNH CẮT NỀN PNG ĐỂ THAY VÀO ĐÂY.
            alt="Cut-out Couple"
            fill
            className="object-contain"
          />
        </div>

        {/* Lớp 4: Khối Text "I LOVE YOU" và Đoạn thơ nhỏ (Góc dưới bên phải) */}
        <div className="absolute bottom-[5%] right-[5%] w-[55%] flex flex-col items-center z-20 space-y-6">
          {/* Chữ I LOVE YOU */}
          <div className="relative w-full h-[35px] md:h-[45px]">
            <Image
              src="https://assets.cinelove.me/templates/assets/0189eb35-5cf1-4525-a8d0-867f70e0bf67/b298e6ad-dd15-475c-aca4-c3f0850f44fc.png"
              alt="I Love You"
              fill
              className="object-contain"
            />
          </div>

          {/* Đoạn thơ nhỏ dưới chữ I Love You */}
          <div className="font-serif text-md md:text-base leading-[1.8] text-right italic">
            Mong gió xuân dịu dàng với em hơn, <br />
            Xua tan muộn phiền, <br />
            Để mọi thứ chỉ còn lại dịu êm.
          </div>
        </div>
      </div>
    </section>
  );
};
