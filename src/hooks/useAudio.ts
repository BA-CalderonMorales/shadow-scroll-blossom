import { useEffect, useRef } from 'react';
import { useSettings } from '@/contexts/SettingsContext';

export const useAudio = () => {
  const { audioVibe } = useSettings();
  const audioRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    if (audioVibe === 'none') {
      audioRef.current?.pause();
      return;
    }

    const audio = new Audio(`/audio/${audioVibe}.mp3`);
    audio.loop = true;
    audioRef.current = audio;
    audio.play().catch(() => {});

    return () => {
      audio.pause();
    };
  }, [audioVibe]);

  const registerInteraction = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
    }
  };

  return { registerInteraction };
};
