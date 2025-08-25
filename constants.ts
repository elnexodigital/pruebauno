import { Podcast } from "./types";

// Instructions: Replace these placeholder URLs with your actual image URLs from Cloudinary.
export const BACKGROUND_IMAGES = {
  morning: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755853107/213406_small_b3pf71.mp4', // Reemplaza con tu URL de imagen para la mañana
  afternoon: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755853108/211718_small_ntg6fv.mp4', // Reemplaza con tu URL de imagen para la tarde
  night: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755852356/4437-178898261_small_og2cb1.mp4', // Reemplaza con tu URL de imagen para la noche
};

// A curated list of Cloudinary video URLs for the visual player.
export const VIDEO_URLS: string[] = [
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755907719/animaci%C3%B3n_APP_pvxjop.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755853107/213406_small_b3pf71.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755853108/211718_small_ntg6fv.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755852356/4437-178898261_small_og2cb1.mp4',
  'https://res.cloudinary.com/demo/video/upload/elephants.mp4',
  'https://res.cloudinary.com/demo/video/upload/boat.mp4',
];

// A curated list of YouTube video IDs for background music (audio only).
export const MUSIC_IDS: string[] = [
  '5qap5aO4i9A', // Lofi hip hop radio
  'DWcJFNfaw9c', // Coffee shop vibes
  'aGFz4M-TPt8', // Ambient study music
  'rUxyKA_-grg', // Relaxing sleep music
  'MCiBnlfA_eA', // Synthwave radio
  'fEV_2b2JCwY', // Jazz piano
  'M-p-n01yB6s', // Calm meditation music
];

// A curated list of podcasts. The first one is considered the "latest".
export const PODCASTS: Podcast[] = [
  {
    id: 'p1',
    title: 'Las IAs en las cavernas',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755750743/El%20fen%C3%B3meno%20de%20la%20infoxicaci%C3%B3n.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1755905334/la_ia_en_la_caverna_b8oagi.png',
  },
  {
    id: 'p2',
    title: 'El fenómeno de la infoxicación',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755750743/El%20fen%C3%B3meno%20de%20la%20infoxicaci%C3%B3n.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1755904536/el_fenomeno_de_la_infoxicaci%C3%B3n_dqctd4.png',
  },
  {
    id: 'p3',
    title: 'Mensaje al futuro gutural',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755750741/mensaje%20al%20futuro%20gutural.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1755904537/el_futuro_gutural_sdatkl.png',
  },
  {
    id: 'p4',
    title: 'La Paradoja de la Hiperconectividad desconectada',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755750738/La%20Paradoja%20de%20la%20Hiperconectividad%20desconectada.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1755904537/hiperconectividad_desconectada_kafron.png',
  },
  {
    id: 'p5',
    title: 'el devate binario',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755750731/el%20devate%20binario.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1755904536/el_experimento_binario_ye6lem.png',
  },
  {
    id: 'p6',
    title: 'El simulacro de la comunicación',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755750732/El%20simulacro%20de%20la%20comunicaci%C3%B3n.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1755904537/el_simulacro_de_la_comunicac%C3%ADon_bdupba.png',
  },
  {
    id: 'p7',
    title: 'La simplificación es involutiva',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755750708/La%20simplificaci%C3%B3n%20es%20involutiva.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1755904537/la_simplificaci%C3%B3n_es_involutiva_qan3ea.png',
  },
  {
    id: 'p8',
    title: 'Música conector de cerebro y corazón',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755750385/m%C3%BAsica_conector_de_cerebro_y_corazon_ua7xs9.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1755904537/m%C3%BAsica_conector_de_cerebro_y_coraz%C3%B3n_fn1h5r.png',
  },
  {
    id: 'p9',
    title: 'La Mentira de la Felicidad.',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755750374/La%20Mentira%20de%20la%20Felicidad..mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1755905995/La_mentira_de_la_felicidad_mxaaki.png',
  },
  {
    id: 'p10',
    title: 'felicidad en la rueda de hamster',
    artist: 'Leo Castrillo',
    videoId: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755750381/felicidad_en_la_rueda_de_hamster_.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1755904537/felicidad_en_la_rueda_del_hamster_siik75.png',
  },
  {
    id: 'p11',
    title: 'Esta',
    artist: 'Leo Castrillo',
    videoId: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755722507/esta_gtudkp.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1755904538/musica_propia_zadotn.png',
  },
  {
    id: 'p12',
    title: 'Celebramos la tristeza catarsis',
    artist: 'Leo Castrillo',
    videoId: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755750367/Celebramos%20la%20tristeza%20catarsis.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1755905729/festejamos_la_tristeza_dl9rx7.png',
  }
];