import { Audio } from 'expo-av';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

const AudioContext = createContext();

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [backgroundSound, setBackgroundSound] = useState(null);
  const [foregroundSound, setForegroundSound] = useState(null);
  const appState = useRef(AppState.currentState);

  // Configurar audio al inicializar
  useEffect(() => {
    const setupAudio = async () => {
      try {
        // Configurar el modo de audio para la aplicación
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.log('Error setting up audio mode:', error);
      }
    };

    setupAudio();
  }, []);

  // Manejar cambios en el estado de la aplicación
  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
        if (backgroundSound) {
          backgroundSound.setVolumeAsync(0.7);
        }
      } else {
        console.log('App is inactive');
        if (backgroundSound) {
          backgroundSound.setVolumeAsync(0);
        }
        if (foregroundSound) {
          foregroundSound.setVolumeAsync(0);
        }
      }
      appState.current = nextAppState;
    });

    return () => {
      if (subscription) subscription.remove();
    };
  }, [backgroundSound, foregroundSound]);

  // Cargar sonido de fondo usando expo-av
  const loadBackgroundSound = useCallback(async (audioFile, shouldLoop = true) => {
    try {
      console.log('Loading background sound:', audioFile);
      const { sound } = await Audio.Sound.createAsync(
        audioFile,
        {
          shouldPlay: true,
          isLooping: shouldLoop,
          volume: isMuted || appState.current.match(/inactive|background/) ? 0.0 : 0.7,
        }
      );
      
      console.log('Background sound created successfully');
      setBackgroundSound(sound);
      
      // Configurar listener para cuando termine la reproducción
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish && !shouldLoop) {
          // El audio terminó
        }
      });
      
      await sound.playAsync();
      console.log('Background sound playing');
      return sound;
    } catch (error) {
      console.log('Error loading background sound:', error);
      return null;
    }
  }, [isMuted]);

  // Cargar sonido de primer plano usando expo-av (para efectos, narraciones, etc.)
  const loadForegroundSound = useCallback(async (audioFile, shouldLoop = false) => {
    try {
      console.log('Loading foreground sound:', audioFile);
      const { sound } = await Audio.Sound.createAsync(
        audioFile,
        {
          shouldPlay: false,
          isLooping: shouldLoop,
          volume: isMuted ? 0.0 : 0.1,
        }
      );
      
      console.log('Foreground sound created successfully');
      setForegroundSound(sound);
      return sound;
    } catch (error) {
      console.log('Error loading foreground sound:', error);
      return null;
    }
  }, [isMuted]);

  // Reproducir sonido de primer plano
  const playForegroundSound = useCallback(async () => {
    if (foregroundSound) {
      try {
        await foregroundSound.playAsync();
        console.log('Foreground sound playing');
      } catch (error) {
        console.log('Error playing foreground sound:', error);
      }
    } else {
      console.log('No foreground sound loaded');
    }
  }, [foregroundSound]);

  // Detener sonido de primer plano
  const stopForegroundSound = useCallback(async () => {
    if (foregroundSound) {
      try {
        await foregroundSound.stopAsync();
        console.log('Foreground sound stopped');
      } catch (error) {
        console.log('Error stopping foreground sound:', error);
      }
    } else {
      console.log('No foreground sound to stop');
    }
  }, [foregroundSound]);

  // Cambiar volumen del sonido de fondo
  const setBackgroundVolume = useCallback(async (volume) => {
    if (backgroundSound) {
      try {
        await backgroundSound.setVolumeAsync(volume);
        console.log('Background volume set to:', volume);
      } catch (error) {
        console.log('Error setting background volume:', error);
      }
    } else {
      console.log('No background sound loaded to set volume');
    }
  }, [backgroundSound]);

  // Cambiar volumen del sonido de primer plano
  const setForegroundVolume = useCallback(async (volume) => {
    if (foregroundSound) {
      try {
        await foregroundSound.setVolumeAsync(volume);
        console.log('Foreground volume set to:', volume);
      } catch (error) {
        console.log('Error setting foreground volume:', error);
      }
    } else {
      console.log('No foreground sound loaded to set volume');
    }
  }, [foregroundSound]);

  // Detener sonido de fondo
  const stopBackgroundSound = useCallback(async () => {
    if (backgroundSound) {
      try {
        await backgroundSound.stopAsync();
      } catch (error) {
        console.log('Error stopping background sound:', error);
      }
    }
  }, [backgroundSound]);

  // Pausar sonido de fondo
  const pauseBackgroundSound = useCallback(async () => {
    if (backgroundSound) {
      try {
        await backgroundSound.pauseAsync();
      } catch (error) {
        console.log('Error pausing background sound:', error);
      }
    }
  }, [backgroundSound]);

  // Reanudar sonido de fondo
  const resumeBackgroundSound = useCallback(async () => {
    if (backgroundSound) {
      try {
        await backgroundSound.playAsync();
      } catch (error) {
        console.log('Error resuming background sound:', error);
      }
    }
  }, [backgroundSound]);

  // Cambiar estado de mute
  const toggleMute = useCallback(async () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (backgroundSound) {
      await setBackgroundVolume(newMutedState ? 0.0 : 0.7);
    }
    if (foregroundSound) {
      await setForegroundVolume(newMutedState ? 0.0 : 0.1);
    }
  }, [isMuted, backgroundSound, setBackgroundVolume, setForegroundVolume]);

  // Limpiar recursos de audio
  const cleanup = useCallback(async () => {
    if (backgroundSound) {
      try {
        await backgroundSound.unloadAsync();
      } catch (error) {
        console.log('Error unloading background sound:', error);
      }
    }
    if (foregroundSound) {
      try {
        await foregroundSound.unloadAsync();
      } catch (error) {
        console.log('Error unloading foreground sound:', error);
      }
    }
  }, [backgroundSound, foregroundSound]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  const value = {
    isMuted,
    backgroundSound,
    foregroundSound,
    loadBackgroundSound,
    loadForegroundSound,
    playForegroundSound,
    stopForegroundSound,
    setBackgroundVolume,
    setForegroundVolume,
    stopBackgroundSound,
    pauseBackgroundSound,
    resumeBackgroundSound,
    toggleMute,
    cleanup,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}; 