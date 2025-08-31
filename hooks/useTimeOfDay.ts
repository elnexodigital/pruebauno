import { useState, useEffect } from 'react';
import { TimeOfDay, TimeOfDayInfo } from '../types';

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
  const now = new Date();
  const totalMinutes = now.getHours() * 60 + now.getMinutes();

  // Noctámbulo: 22:01 (1321) to 07:29 (449)
  if (totalMinutes >= 1321 || totalMinutes <= 449) {
    return {
      timeOfDay: TimeOfDay.Noctambulo,
      overlayClass: 'bg-black/20',
    };
  }

  // Mañana: 07:30 (450) to 12:00 (720)
  if (totalMinutes >= 450 && totalMinutes <= 720) {
    return {
      timeOfDay: TimeOfDay.Morning,
      overlayClass: 'bg-black/40',
    };
  }

  // Tarde: 12:01 (721) to 18:00 (1080)
  if (totalMinutes >= 721 && totalMinutes <= 1080) {
    return {
      timeOfDay: TimeOfDay.Afternoon,
      overlayClass: 'bg-black/40',
    };
  }

  // Noche: 18:01 (1081) to 22:00 (1320)
  return {
    timeOfDay: TimeOfDay.Night,
    overlayClass: 'bg-black/20',
  };
}
