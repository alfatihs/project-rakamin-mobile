import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Audio } from 'expo-av';


const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const sound = useRef(null);
  const clicksound = useRef(null);
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
      console.log('click sound played');
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
    <MusicContext.Provider value={{ isPlaying, isMuted, pauseMusic, resumeMusic, muteMusic, unmuteMusic, playClickSound }}>
      {children}
    </MusicContext.Provider>
  );
};


export const useMusic = () => useContext(MusicContext);
