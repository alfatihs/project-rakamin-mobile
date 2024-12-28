import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';


const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const sound = useRef(null);
  const clicksound = useRef(null);
  const winSound = useRef(null);
  const loseSound = useRef(null);
  const drawSound = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const loadAndPlayMusic = async () => {
      const { sound: loadedSound } = await Audio.Sound.createAsync(
        require('./../../assets/bgmusic.mp3')
      );
      sound.current = loadedSound;
      await sound.current.setIsLoopingAsync(true);
      await sound.current.setVolumeAsync(0.3);
      await sound.current.playAsync();


      const { sound: loadedClickSound } = await Audio.Sound.createAsync(
        require('./../../assets/click.mp3')
      );
      clicksound.current = loadedClickSound;

      const { sound: loadedWinSound } = await Audio.Sound.createAsync(
        require('./../../assets/win.mp3')
      );
      winSound.current = loadedWinSound;

      const { sound: loadedLoseSound } = await Audio.Sound.createAsync(
        require('./../../assets/lose.mp3')
      );
      loseSound.current = loadedLoseSound;

      const { sound: loadedDrawSound } = await Audio.Sound.createAsync(
        require('./../../assets/draw.mp3')
      );
      drawSound.current = loadedDrawSound;


    };

    loadAndPlayMusic();

    return () => {
      if (sound.current) {
        sound.current.unloadAsync();
      }
      if (clicksound.current) {
        clicksound.current.unloadAsync();
      }
    };
  }, []);

  const playClickSound = async () => {
    if (clicksound.current) {
      await clicksound.current.replayAsync();
    }
  }

  const playWinSound = async () => {
    if (winSound.current) {
      await winSound.current.replayAsync();
    }
  }

  const playLoseSound = async () => {
    if (loseSound.current) {
      await loseSound.current.replayAsync();
    }
  }

  const playDrawSound = async () => {
    if (drawSound.current) {
      await drawSound.current.replayAsync();
    }
  }

  const pauseMusic = async () => {
    if (sound.current) {
      await sound.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  const resumeMusic = async () => {
    if (sound.current) {
      await sound.current.playAsync();
      setIsPlaying(true);
    }
  };

  const muteMusic = async () => {
    if (sound.current) {
      await sound.current.setVolumeAsync(0);
      setIsMuted(true);
    }
  };

  const unmuteMusic = async () => {
    if (sound.current) {
      await sound.current.setVolumeAsync(0.3);
      setIsMuted(false);
    }
  };

  return (
    <MusicContext.Provider value={{ isPlaying, isMuted, pauseMusic, resumeMusic, muteMusic, unmuteMusic, playClickSound, playWinSound, playLoseSound, playDrawSound }}>
      {children}
    </MusicContext.Provider>
  );
};


export const useMusic = () => useContext(MusicContext);
