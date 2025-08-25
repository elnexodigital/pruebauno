export enum TimeOfDay {
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

export interface MediaItem {
  type: 'podcast' | 'music';
  videoId: string;
  coverUrl: string;
  title?: string;
}