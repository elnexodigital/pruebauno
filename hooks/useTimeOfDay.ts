import { useState, useEffect } from 'react';
import { TimeOfDay, TimeOfDayInfo } from '../types';
import { BACKGROUND_IMAGES } from '../constants';

export function useTimeOfDay(): TimeOfDayInfo {
  const [timeInfo, setTimeInfo] = useState<TimeOfDayInfo>(() => getTimeBasedInfo());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeInfo(getTimeBasedInfo());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return timeInfo;
}

function getTimeBasedInfo(): TimeOfDayInfo {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return {
      timeOfDay: TimeOfDay.Morning,
      backgroundUrl: BACKGROUND_IMAGES.morning,
      overlayClass: 'bg-black/40', // Overlay más oscuro para fondo brillante
    };
  }
  if (hour >= 12 && hour < 18) {
    return {
      timeOfDay: TimeOfDay.Afternoon,
      backgroundUrl: BACKGROUND_IMAGES.afternoon,
      overlayClass: 'bg-black/40', // Overlay más oscuro para fondo brillante
    };
  }
  return {
    timeOfDay: TimeOfDay.Night,
    backgroundUrl: BACKGROUND_IMAGES.night,
    overlayClass: 'bg-black/20', // Overlay más claro para fondo oscuro
  };
}