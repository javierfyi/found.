"use client";

import { useEffect, useRef, useState } from "react";
import { useSoundContext } from "@/contexts/sound-context";
import { VolumeIcon, type VolumeIconHandle } from "@/components/volume-icon";

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const period = hours >= 12 ? "p.m." : "a.m.";
      const displayHours = hours % 12 || 12;
      setTime(`${displayHours}:${minutes}:${seconds} ${period}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time}</span>;
}

export function HeaderSoundAndClock() {
  const { isMuted, toggleMute, playToggle } = useSoundContext();
  const volumeIconRef = useRef<VolumeIconHandle>(null);

  useEffect(() => {
    if (volumeIconRef.current) {
      if (isMuted) {
        volumeIconRef.current.stopAnimation();
      } else {
        volumeIconRef.current.startAnimation();
      }
    }
  }, [isMuted]);

  const handleToggleMute = () => {
    toggleMute();
    playToggle();
  };

  return (
    <div className="flex items-center gap-x-1">
      <button
        type="button"
        onClick={handleToggleMute}
        className="text-xs font-bold text-black/50 transition-colors hover:text-black"
        aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
      >
        <VolumeIcon ref={volumeIconRef} size={14} />
      </button>
      <div className="min-w-[100px] text-right text-xs font-bold text-black/40">
        <LiveClock />
      </div>
    </div>
  );
}
