export enum TimeOfDay {
  Noctambulo = 'Noctámbulo',
  Morning = 'Mañana',
  Afternoon = 'Tarde',
  Night = 'Noche',
}

export interface UserInfo {
  name: string;
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
  description: string;
}

export interface MediaItem {
  type: 'podcast' | 'music';
  videoId: string;
  coverUrl: string;
  title?: string;
  artist?: string;
  description?: string;
}

export interface PopupContent {
  time: string; // "HH:MM" format
  title: string;
  text: string;
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
}