"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import useSound from "use-sound";

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playClick: () => void;
  playHover: () => void;
  playSuccess: () => void;
  playOpen: () => void;
  playClose: () => void;
  playCopy: () => void;
  playToggle: () => void;
  playWelcome: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);

  // Load sound preference from localStorage on mount
  useEffect(() => {
    const savedMuteState = localStorage.getItem("foundry-sound-muted");
    if (savedMuteState === "true") {
      setIsMuted(true);
    }
  }, []);

  // Load sound files
  const [playClickSound] = useSound(
    "/sounds/ES_Button Press Click, Tap, Video Game, Main Menu, Select, Positive 05 - Epidemic Sound.mp3",
    {
      volume: 0.5,
      preload: true,
    },
  );

  const [playHoverSound] = useSound(
    "/sounds/ES_Neutral, Select Tone 03 - Epidemic Sound.mp3",
    {
      volume: 0.3,
      preload: true,
    },
  );

  const [playSuccessSound] = useSound(
    "/sounds/ES_Access Granted 05 - Epidemic Sound.mp3",
    {
      volume: 0.6,
      preload: true,
    },
  );

  const [playOpenSound] = useSound(
    "/sounds/ES_Sci Fi Games, UI Menu, Very Short, Open 05 - Epidemic Sound.mp3",
    {
      volume: 0.5,
      preload: true,
    },
  );

  const [playCloseSound] = useSound(
    "/sounds/ES_Sci Fi Games, UI Menu, Very Short, Close 09 - Epidemic Sound.mp3",
    {
      volume: 0.5,
      preload: true,
    },
  );

  const [playCopySound] = useSound(
    "/sounds/ES_Sci Fi Games, UI Menu, Very Short, Open 12 - Epidemic Sound.mp3",
    {
      volume: 0.5,
      preload: true,
    },
  );

  const [playToggleSound] = useSound(
    "/sounds/ES_Bring Up Hud - Epidemic Sound.mp3",
    {
      volume: 0.5,
      preload: true,
    },
  );

  const [playWelcomeSound] = useSound(
    "/sounds/ES_Pops, Wobble, Bloop, Pops - Epidemic Sound.mp3",
    {
      volume: 0.5,
      preload: true,
    },
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newState = !prev;
      localStorage.setItem("foundry-sound-muted", String(newState));
      return newState;
    });
  }, []);

  const playClick = useCallback(() => {
    if (!isMuted) {
      playClickSound();
    }
  }, [isMuted, playClickSound]);

  const playHover = useCallback(() => {
    if (!isMuted) {
      playHoverSound();
    }
  }, [isMuted, playHoverSound]);

  const playSuccess = useCallback(() => {
    if (!isMuted) {
      playSuccessSound();
    }
  }, [isMuted, playSuccessSound]);

  const playOpen = useCallback(() => {
    if (!isMuted) {
      playOpenSound();
    }
  }, [isMuted, playOpenSound]);

  const playClose = useCallback(() => {
    if (!isMuted) {
      playCloseSound();
    }
  }, [isMuted, playCloseSound]);

  const playCopy = useCallback(() => {
    if (!isMuted) {
      playCopySound();
    }
  }, [isMuted, playCopySound]);

  const playToggle = useCallback(() => {
    if (!isMuted) {
      playToggleSound();
    }
  }, [isMuted, playToggleSound]);

  const playWelcome = useCallback(() => {
    if (!isMuted) {
      playWelcomeSound();
    }
  }, [isMuted, playWelcomeSound]);

  return (
    <SoundContext.Provider
      value={{
        isMuted,
        toggleMute,
        playClick,
        playHover,
        playSuccess,
        playOpen,
        playClose,
        playCopy,
        playToggle,
        playWelcome,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSoundContext() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error("useSoundContext must be used within a SoundProvider");
  }
  return context;
}
