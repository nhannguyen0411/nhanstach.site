"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
import { MusicPlayer } from "@/components/music-player";

export default function LandingPage() {
  const [canScroll, setCanScroll] = useState(false);
  const [musicTriggered, setMusicTriggered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const autoScrollTimeoutRef = useRef<number | null>(null);
  const isAutoScrollingRef = useRef(false);
  const accumulatedScrollRef = useRef(0);
  const lastTimestampRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const startAutoScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    if (isAutoScrollingRef.current) return;
    isAutoScrollingRef.current = true;
    accumulatedScrollRef.current = container.scrollTop ?? 0;
    lastTimestampRef.current = null;

    const performScroll = (timestamp: number) => {
      const el = scrollRef.current;
      if (!el || !isAutoScrollingRef.current) return;

      const maxScrollTop = el.scrollHeight - el.clientHeight;

      if (maxScrollTop > 0) {
        // Dùng delta thời gian để tốc độ nhất quán trên mọi màn hình (60/90/120fps)
        // Cap 100ms để tránh nhảy lớn khi đổi tab
        const elapsed = lastTimestampRef.current !== null
          ? Math.min(timestamp - lastTimestampRef.current, 100)
          : 0;
        const delta = (elapsed / 1000) * 85; // 45px/s
        accumulatedScrollRef.current = Math.min(accumulatedScrollRef.current + delta, maxScrollTop);
        el.scrollTop = accumulatedScrollRef.current;
      }

      lastTimestampRef.current = timestamp;

      // Chỉ dừng khi thật sự đã chạm đáy (thêm sai số nhỏ cho Safari).
      if (maxScrollTop > 0 && accumulatedScrollRef.current >= maxScrollTop - 1) {
        isAutoScrollingRef.current = false;
        requestRef.current = null;
        return;
      }

      requestRef.current = requestAnimationFrame(performScroll);
    };
    requestRef.current = requestAnimationFrame(performScroll);
  };

  const stopAutoScroll = () => {
    isAutoScrollingRef.current = false;

    if (autoScrollTimeoutRef.current !== null) {
      window.clearTimeout(autoScrollTimeoutRef.current);
      autoScrollTimeoutRef.current = null;
    }

    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }
  };

  const handleOpen = () => {
    setCanScroll(true);
    setMusicTriggered(true);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartYRef.current = e.touches[0]?.clientY ?? null;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const startY = touchStartYRef.current;
    const currentY = e.touches[0]?.clientY;
    if (startY == null || currentY == null) return;

    // Chỉ stop khi người dùng kéo thật (tránh rung nhẹ khi tap trên iOS Safari)
    const delta = Math.abs(currentY - startY);
    const isPendingOrRunning = isAutoScrollingRef.current || autoScrollTimeoutRef.current !== null;
    if (isPendingOrRunning && delta > 10) {
      stopAutoScroll();
    }
  };

  useEffect(() => {
    if (!canScroll) return;

    // Clear timeout/RAF cũ (nếu có) rồi set lại
    stopAutoScroll();

    autoScrollTimeoutRef.current = window.setTimeout(() => {
      startAutoScroll();
    }, 2500); // Đợi mở thiệp xong mới cuộn

    return () => {
      stopAutoScroll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canScroll]);

  return (
    <main className="h-screen w-full flex items-center justify-center p-0 md:p-4 bg-[#f0f2f5] ">
      <MusicPlayer play={musicTriggered} />
      <div
        ref={scrollRef}
        onWheel={stopAutoScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className={`w-full max-w-[500px] h-full md:max-h-[90vh] bg-white relative shadow-2xl rounded-md custom-scrollbar overflow-x-hidden ${
          canScroll ? "allow-scroll" : "no-scroll"
        }`}
      >
        {/* GIỮ NGUYÊN HOA LÁ CỦA BẠN [cite: 179-182] */}
        <div className="absolute top-[16%] -left-14 md:w-[103px] md:h-[168px] w-[103px] h-[148px] z-20 pointer-events-none rotate-25">
          <Image src="/images/flower-1.webp" alt="Flower 1" fill className="object-contain" priority />
        </div>
        <div className="absolute top-1/5 -left-7 md:w-[103px] md:h-[168px] w-[103px] h-[148px] z-20 pointer-events-none rotate-45">
          <Image src="/images/flower-1.webp" alt="Flower 2" fill className="object-contain" priority />
        </div>
        <div className="absolute top-3/5 md:top-2/3 -right-14  md:w-[136px] md:h-[130px] w-[116px] h-[110px] z-20 pointer-events-none -rotate-35">
          <Image src="/images/flower-2.webp" alt="Flower 3" fill className="object-contain" priority />
        </div>

        <div className="relative z-10 w-full pb-12">
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