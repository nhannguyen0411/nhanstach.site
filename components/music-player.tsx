"use client";

import { useEffect, useRef, useState } from "react";

interface MusicPlayerProps {
  play: boolean; // trigger từ parent sau khi envelope mở (user gesture đã có)
}

export const MusicPlayer = ({ play }: MusicPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Bắt đầu phát nhạc khi envelope mở
  useEffect(() => {
    if (!play) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Autoplay bị block — user có thể tự bấm nút để bật
      });
  }, [play]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/phep-mau-piano.mp3" loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
        style={{ right: "max(10px, calc((100vw - 500px) / 2 + 10px))" }}
        className="fixed top-5 md:top-18 z-50 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100 flex items-center justify-center transition-all active:scale-90"
      >
        <span className={isPlaying ? "music-shake" : ""}>
          {isPlaying ? <IconMusicOn /> : <IconMusicOff />}
        </span>
      </button>
    </>
  );
};

function IconMusicOn() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gold"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

function IconMusicOff() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-400"
    >
      {/* Đường gạch ngang trước để nằm dưới các path khác */}
      <line x1="2" y1="2" x2="22" y2="22" />
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}
