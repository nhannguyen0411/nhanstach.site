"use client";

import Image from "next/image";
import { useState, useRef } from "react";
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
  const [canScroll, setCanScroll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  const startAutoScroll = () => {
    const performScroll = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop += 0.7; // Tốc độ cuộn từ từ
        requestRef.current = requestAnimationFrame(performScroll);
      }
    };
    requestRef.current = requestAnimationFrame(performScroll);
  };

  const stopAutoScroll = () => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  };

  const handleOpen = () => {
    setCanScroll(true);
    setTimeout(startAutoScroll, 2500); // Đợi mở thiệp xong mới cuộn
  };

  return (
    <main className="h-screen w-full flex items-center justify-center p-0 md:p-4 bg-[#f0f2f5]">
      <div 
        ref={scrollRef}
        onWheel={stopAutoScroll}
        onTouchStart={stopAutoScroll}
        className={`w-[500px] bg-white h-[90vh] mx-auto relative border border-gray-300 shadow-md rounded-md custom-scrollbar overflow-x-hidden ${
          canScroll ? "allow-scroll" : "no-scroll"
        }`}
      >
        {/* GIỮ NGUYÊN HOA LÁ CỦA BẠN [cite: 179-182] */}
        <div className="absolute top-[16%] -left-14 md:w-[103px] md:h-[168px] w-[103px] h-[148px] z-20 pointer-events-none rotate-25">
          <Image src="/images/flower-1.png" alt="Flower 1" fill className="object-contain" />
        </div>
        <div className="absolute top-1/5 -left-7 md:w-[103px] md:h-[168px] w-[103px] h-[148px] z-20 pointer-events-none rotate-45">
          <Image src="/images/flower-1.png" alt="Flower 2" fill className="object-contain" />
        </div>
        <div className="absolute top-3/5 md:top-2/3 -right-14  md:w-[136px] md:h-[130px] w-[116px] h-[110px] z-20 pointer-events-none -rotate-35">
          <Image src="/images/flower-2.png" alt="Flower 3" fill className="object-contain" />
        </div>

        <div className="relative z-10 w-full">
          <div className="flex justify-between items-center py-2 px-5 text-xss tracking-[0.3em] font-light uppercase">
            <span>YOU ARE</span>
            <span>THE LOVE OF</span>
            <span>MY LIFE</span>
          </div>

          <div className="my-14 font-corinthia text-center text-5xl md:text-6xl tracking-widest">
            Wedding Invitation
          </div>

          <Envelope onOpen={handleOpen} />
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