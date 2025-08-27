export enum TimeOfDay {
  Noctambulo = 'Noctámbulo',
  Morning = 'Mañana',
  Afternoon = 'Tarde',
  Night = 'Noche',
}

export interface UserInfo {
  name: string;
  phone: string;
  email?: string;
}

export interface TimeOfDayInfo {
  timeOfDay: TimeOfDay;
  backgroundUrl: string;
  overlayClass: string;
}

export interface Podcast {
  id: string;
  title: string;
  coverUrl: string;
  videoId: string;
  artist?: string;
}

export interface MusicTrack {
  id: string;
  url: string; // Cloudinary URL
  title: string;
  description: string;
  // FIX: Added 'lento' and 'movido' to the list of allowed tags.
  tags: Array<number | 'chill' | 'upbeat' | 'focus' | 'energetic' | 'lento' | 'movido'>;
}

export interface MediaItem {
  type: 'podcast' | 'music';
  videoId: string;
  coverUrl: string;
  title?: string;
  artist?: string;
  description?: string;
}