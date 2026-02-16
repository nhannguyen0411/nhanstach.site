import Image from "next/image";
import { WelcomeCountdown } from "@/components/welcome-countdown";
import { SweetTransition } from "@/components/sweet-transition";
import { CoupleProfiles } from "@/components/couple-profiles";
import { InvitationInfo } from "@/components/invitation-info";
import { EventTimeline } from "@/components/event-timeline";
import { FinalSection } from "@/components/final-section";
import { FallInLove } from "@/components/fall-in-love";
import { Envelope } from "@/components/envelope";
import { Heart } from "@/components/heart";
import { Wish } from "@/components/wish";

export default function LandingPage() {
  return (
    <main className="h-screen w-full flex items-center justify-center p-0 md:p-4 bg-[#f0f2f5]">
      {/* KHUNG THIỆP CHÍNH - Responsive chuẩn App-like [cite: 24] */}
      <div className="w-full max-w-[500px] h-full md:max-h-[90vh] bg-white relative shadow-2xl md:rounded-xl overflow-y-auto overflow-x-hidden custom-scrollbar">
        {/* --- LỚP TRANG TRÍ HOA LÁ (DECORATION LAYERS) --- */}

        {/* Hoa lá 1 bên trái - Vị trí top 1/6 [cite: 24] */}
        <div className="absolute top-[16%] -left-14 md:w-[103px] md:h-[168px] w-[103px] h-[148px] z-20 pointer-events-none rotate-25">
          <Image
            src="/images/flower-1.png"
            alt="Flower Decoration Left 1"
            fill
            className="object-contain"
          />
        </div>

        {/* Hoa lá 2 bên trái - Vị trí top 1/5 [cite: 25] */}
        <div className="absolute top-1/5 -left-7 md:w-[103px] md:h-[168px] w-[103px] h-[148px] z-20 pointer-events-none rotate-45">
          <Image
            src="/images/flower-1.png"
            alt="Flower Decoration Left 2"
            fill
            className="object-contain"
          />
        </div>

        {/* Hoa lá bên phải - Vị trí top 2/3 [cite: 26] */}
        <div className="absolute top-3/5 md:top-2/3 -right-14  md:w-[136px] md:h-[130px] w-[116px] h-[110px] z-20 pointer-events-none -rotate-35">
          <Image
            src="/images/flower-2.png"
            alt="Flower Decoration Right"
            fill
            className="object-contain"
          />
        </div>

        {/* === KHỐI NỘI DUNG CHÍNH (SCROLLABLE CONTENT) === */}
        <div className="relative z-10 w-full">
          <div className="flex justify-between items-center py-2 px-5 text-xss tracking-[0.3em] font-light uppercase">
            <span>YOU ARE</span>
            <span>THE LOVE OF</span>
            <span>MY LIFE</span>
          </div>

          <div className="my-14 font-corinthia text-center text-5xl md:text-6xl tracking-widest">
            Wedding Invitation
          </div>

          <Envelope />
          <InvitationInfo />
          <Wish />
          <FallInLove />

          <Heart />

          <CoupleProfiles />
          <WelcomeCountdown />
          <EventTimeline />
          <SweetTransition />
          <FinalSection />
        </div>
      </div>
    </main>
  );
}
