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
  id:string;
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

export interface VideoPodcast {
  id: string;
  title: string;
  videoUrl: string;
  transcript: string;
}

export interface GroundingSource {
    web: {
        uri: string;
        title: string;
    }
}

export interface NewsItem {
  headline: string;
  summary: string;
}

export interface WeatherInfo {
  temperature: string;
  description: string;
  windSpeed: string;
}

export interface PopupContent {
  time: string; // "HH:MM" format
  type: 'static' | 'news';
  title: string;
  text: string | NewsItem[];
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  sources?: GroundingSource[];
  videoAspectRatio?: string;
  weather?: WeatherInfo;
}

export interface AppSettings {
  playNewsAlert: boolean;
  selectedVoiceId?: string;
}

export interface ApiKeys {
  gemini: string;
  openWeather: string;
  elevenLabs: string;
  openAI: string;
}

export interface ElevenLabsVoice {
  voice_id: string;
  name: string;
}