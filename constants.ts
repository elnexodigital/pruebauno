import { Podcast, MusicTrack, PopupContent, VideoPodcast, TimeOfDay } from "./types";

// INSTRUCCIÓN: Sube tus audios de saludo a Cloudinary y reemplaza estas URLs.
export const GREETING_AUDIOS = {
  morning: [ // 10 saludos de 07:30 a 12:00 
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265258/10_jvsbhs.mp3', 
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265258/11_ddtxzh.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265259/12_kv7dc7.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265259/13_a8blfe.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265274/14_ke8hml.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265275/15_pbsmec.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265277/16_d8ranc.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265278/17_qf3zmo.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265279/18_uw1dpy.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265280/19_gpjhoz.mp3',
  ],
  afternoon: [ // 10 saludos de 12:01 a 18:00 
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265290/20_wn0weh.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265291/21_fwpqni.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265292/22_l5bkbz.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265294/23_ahmio9.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265294/24_sdjmui.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265295/25_piazi2.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265296/hpvyxo.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265298/27_guvt3f.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265299/28_mcuvlw.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265300/29_juasvn.mp3',
  ],
  night: [ // 9 saludos de 18:01 a 22:00 
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265336/30_rpschd.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265337/31_qybjne.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265339/33_j0xym3.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265340/34_cu8l1q.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265343/35_fmvioz.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265343/36_voxsro.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265345/37_rnefti.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265347/38_obcrwl.mp3',
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265348/39_khytco.mp3',
  ],
  noctambulo: [ // 1 saludo de 22:01 a 07:29 
    'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756265409/reflexiones_de_un_noc_mvrotz.mp3',
  ],
};

// Character images for different times of day
export const CHARACTER_IMAGES = {
  [TimeOfDay.Morning]: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756527988/Grace-removebg-preview_julviv.png', // Graciela
  [TimeOfDay.Afternoon]: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756527988/Sergio-removebg-preview_wl4ewa.png', // Sergio
  [TimeOfDay.Night]: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756527988/Gabriel-removebg-preview_u7x1rs.png', // Gabriel
  [TimeOfDay.Noctambulo]: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756527988/Gabriel-removebg-preview_u7x1rs.png', // Gabriel
};

// A single, static background image for the entire application.
export const STATIC_BACKGROUND_URL = 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756588189/pexels-life-of-pix-8892_ymfsnd.jpg';

// Sound effect for news popups
export const NEWS_INTRO_URL = 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756917133/entrada_noticias_u6m45n.mp3';

// A curated list of Cloudinary video URLs for the visual player.
// These are separate from the background videos.
export const VIDEO_URLS: string[] = [
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1755907719/animaci%C3%B3n_APP_pvxjop.mp4',
  'https://res.cloudinary.com/demo/video/upload/elephants.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345297/14_okcuk0.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345296/13_debkpb.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345293/11_gud5kv.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345294/12_ringmi.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345294/9_ulzdcy.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345293/10_io3g8k.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345059/8_vng8sz.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345005/4_hczosi.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345005/6_jdroij.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345004/5_ivvibp.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345004/7_aw3cxt.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345003/3_thswfg.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345002/2_gthspn.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756345001/1_ndgmbp.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344401/spot_10_segundos_completo_gtdtqu.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344390/spot10_segundos_completo_zsk1g7.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344378/spot_10_segundos_completo_hhoeeb.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344292/spot_10_segundos_completo_bkagma.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344282/spot10segundos_completo_rku0iy.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344274/spot_10_segundos_completo_fzdqlg.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344264/spot_10_segundos_completo_kmryb2.mp4',
  'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756344252/spot_10_segundos_yirf7x.mp4',
].filter((url, index, self) => self.indexOf(url) === index); // Remove duplicates


// Placeholder for the main logo, used as a spinning record in the music player.
// INSTRUCTION: Replace this with the final logo's Cloudinary URL.
export const NEXO_DIGITAL_LOGO_URL = 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756714882/logo_el_nexo_digital_assa82.png';


// The user's extensive music library has been restored.
export const MUSIC_TRACKS: MusicTrack[] = [
    {
    id: 'm8',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154371/M%C3%BAsica_Cham%C3%A1nica_wjt2sc.mp3',
    description: 'Música chamánica: tambor, trance y selva que respira..',
  },
  {
    id: 'm9',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154368/kpop_mhptzr.mp3',
    description: 'K-Pop: brillo eléctrico, coreo milimétrica y adrenalina juvenil.',
  },
  {
    id: 'm10',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154360/utomp3.com_-_Experience_David_Guettas_Epic_Performance_Of_The_Monolith_at_AlUla_k6sjqi.mp3',
    description: 'David Guetta – The Monolith: beats monumentales en un desierto de luces eternas.',
  },
  {
    id: 'm11',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154359/Whiskey_Blues_Best_of_Slow_BluesRock_1_nvnw0f.mp3',
    description: 'Whiskey Blues: guitarras lentas, humo denso y la noche que nunca cierra..',
  },
  {
    id: 'm12',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154358/playlist_1_wpldia.mp3',
    description: 'De todo: playlist marciana',
  },
  {
    id: 'm14',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154332/DUNE_PART_TWO_SOUNDTRACK_CUT_Hans_Zimmer_xxf2ve.mp3',
    description: 'Dune 2: arena mágica, entre amores prohibidos.',
  },
  {
    id: 'm15',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154307/SnapSave.io_-_Insomnia_Monster_Mix_320_kbps_hk1mgp.mp3',
    description: 'Insomnia Monster: sombras eléctricas, mente despierta y un rugido en la oscuridad..',
  },
  {
    id: 'm16',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154298/Dark_Clubbing_Exotic_c9mlrt.mp3',
    description: 'Dark Exotic: luces que cortan la noche y ritmos que hipnotizan el cuerpo.',
  },
  {
    id: 'm17',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154290/Dark_Season_3_Soundtrack_zpz9xd.mp3',
    description: 'Dark 3: Cuando la sombra es el camino.',
  },
  {
    id: 'm18',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154286/Dark_Soundtrack_Season1_x13die.mp3',
    description: 'Dark 1: Todo está conectado.',
  },
  {
    id: 'm19',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154281/Dark_Soundtrack_Season_2_iix02x.mp3',
    description: 'Dark: Las sombras del futuro en el presente.',
  },
  {
    id: 'm20',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154279/Zack_Hemsey_The_Way_pb3q1t.mp3',
    description: 'Zack Hemsey – The Way: intensidad épica, drama que late y pasos hacia lo inevitable.',
  },
  {
    id: 'm21',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154273/cold-little-heart_i4lzeh.mp3',
    description: 'Frío-poco-heart: melancolía helada con un susurro de vulnerabilidad.',
  },
  {
    id: 'm22',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154270/Y2DL_Wednesday_Playing_Cello_-_Paint_It_Black__Epic_Version_citspz.mp3',
    description: 'Wednesday – Paint It Black (Epic Cello): oscuridad intensa, arco que llora y energía que golpea el alma.',
  },
  {
    id: 'm23',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154269/Who_Will_Save_Us_feat_Fleurie_Tommee_Profitt_qeirn4.mp3',
    description: 'Who Will Save Us (feat. Fleurie) – Tommee Profitt: voz etérea entre ruinas, esperanza frágil que lucha por brillar.',
  },
  {
    id: 'm24',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154264/Justin_Timberlake_Say_Something_First_Take_ft_Chris_Stapleton_x3zc1c.mp3',
    description: 'Justin Timberlake & Chris Stapleton – Say Something: emoción cruda, dueto que quiebra el silencio y susurra verdades.',
  },
  {
    id: 'm25',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154260/snow-raven-olox-feat-andreas-om-gennady-papizh-jivan-gasparyan-jivan-gasparyanjr-crying-earth_f8wrpk.mp3',
    description: 'Cuervo de nieve – Olox: voces y instrumentos que lloran juntos, un lamento épico que atraviesa el alma.',
  },
  {
    id: 'm26',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154259/Thomas_Azier_Red_Eyes_official_video_uqakln.mp3',
    description: 'Thomas Azier – Red Eyes: atmósfera intensa, pulsos oscuros y mirada que no se aparta.',
  },
  {
    id: 'm27',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154256/The_beatles_let_it_be_hgvv95.mp3',
    description: 'The Beatles – Let It Be: calma melancólica que susurra consuelo en medio del caos.',
  },
  {
    id: 'm28',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154256/the_la_planta_x_luana_mil_preguntas_cover_rmjs5y.mp3',
    description: 'The La Planta x Luana – Mil Preguntas: curiosidad y emociones que se entrelazan en cada nota.',
  },
  {
    id: 'm29',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154253/Roger_Waters_Comfortably_Numb_lc2qff.mp3',
    description: 'Roger Waters – Comfortably Numb: guitarra que duele, voz que flota y un viaje entre anestesia y emoción.',
  },
  {
    id: 'm30',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154249/Runaway_kz7wdo.mp3',
    description: 'Runaway: energía desenfrenada, adrenalina que corre y libertad que quema.',
  },
  {
    id: 'm31',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154249/Rone_-_Bye_Bye_Macadam_Official_Video_-_onlinevideoconverter.com_fdp7ok.mp3',
    description: 'Rone – Bye Bye Macadam: sintetizadores suaves que flotan, nostalgia urbana y pasos que se alejan.',
  },
  {
    id: 'm32',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154248/Snake_at_the_Window_feat_Lucy_Tops_rpejyd.mp3',
    description: 'Snake at the Window feat. Lucy Tops: misterio y tensión que se deslizan entre voces y ritmos sinuosos.',
  },
  {
    id: 'm33',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154244/RombaiFer_vazquez_cami_raj-cumbia_usddq3.mp3',
    description: 'Rombai & Fer Vázquez feat. Cami Raj – Cumbia: ritmo contagioso, fiesta que no para y alegría que se mueve sola.',
  },
  {
    id: 'm34',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154241/Residente_Silvia_P%C3%A9rez_Cruz_Pen%C3%A9lope_Cruz_313_Official_Video_oh7xpb.mp3',
    description: 'Residente, Silvia Pérez Cruz & Penélope Cruz: intensidad y emoción entrelazadas, voces que cuentan historias profundas.',
  },
  {
    id: 'm35',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154238/ongleikr_Ulvetime_Hour_of_the_Wolf_fynem3.mp3',
    description: 'Ongleikr – Ulvetime: Hour of the Wolf: atmósfera oscura, tensión creciente y un lamento que recorre los huesos.',
  },
  {
    id: 'm36',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154225/Nirvana_Something_In_The_Way_THE_BATMAN_rtvhda.mp3',
    description: 'Nirvana – Something In The Way (The Batman): melancolía cruda, susurros sombríos y un peso que se arrastra en la oscuridad.',
  },
  {
    id: 'm37',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154225/Monolink_Burning_Sun_Original_Mix_qjswfc.mp3',
    description: 'Monolink – Burning Sun: beats hipnóticos, calor que envuelve y un viaje electrónico al atardecer.',
  },
  {
    id: 'm38',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154223/metallica_nothing_else_matters_sgrm7u.mp3',
    description: 'Metallica – Nothing Else Matters: guitarra emotiva, intimidad potente y un suspiro que atraviesa el alma.',
  },
  {
    id: 'm39',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154221/Meilan_Maurits_Song_for_a_Pure_Heart_Sound_Healing_nsxjdu.mp3',
    description: 'Meilan Maurits – Song for a Pure Heart: sonidos sanadores que acarician el espíritu y calman la mente.',
  },
  {
    id: 'm40',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154218/moby_Extreme_Ways_ft_Dougy_Mandagi_gectsl.mp3',
    description: 'Moby – Extreme Ways feat: ritmo urgente, tensión cinematográfica y emoción que no cede.',
  },
  {
    id: 'm41',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154218/moby_In_My_Heart_ft_Gregory_k3xdkl.mp3',
    description: 'Moby – In My Heart feat: delicadeza melódica, sentimientos profundos que laten suavemente.',
  },
  {
    id: 'm42',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154213/matt-corby-monday-official-video_y7gfw5.mp3',
    description: 'Matt Corby – Lunes: voz cálida, melancolía suave y un susurro que acompaña la introspección.',
  },
  {
    id: 'm43',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154210/Laboratorium_Pie%C5%9Bni_Lecieli_cjocgi.mp3',
    description: 'Laboratorium Pieśni – Lecieli: capas vocales que flotan, tradición y emoción entrelazadas en un canto hipnótico.',
  },
  {
    id: 'm44',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154209/jose-gonzalez-stay-alive-official-video_yleijs.mp3',
    description: 'José González – Manténgase Vivo: guitarra delicada y voz serena que sostienen esperanza en silencio.',
  },
  {
    id: 'm45',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154205/KASST_VTOPIA_nyplyz.mp3',
    description: 'KASST – VTOPIA: atmósfera futurista, beats profundos y un viaje sonoro que desconcierta y fascina.',
  },
  {
    id: 'm46',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154201/K%C3%A4ppee_lmgjbk.mp3',
    description: 'Käppee: texturas electrónicas suaves y un pulso hipnótico que envuelve.',
  },
  {
    id: 'm48',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154200/Jorge_Drexler_Tinta_y_Tiempo_bj8qqn.mp3',
    description: 'Jorge Drexler – Tinta y Tiempo: poesía suave sobre melodía tranquila, reflexionando sobre recuerdos y momentos.',
  },
  {
    id: 'm49',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154196/Jorge_Drexler_La_trama_y_el_desenlace_v6llin.mp3',
    description: 'Jorge Drexler – La trama y el desenlace: historias que se entrelazan en melodías delicadas y letras que invitan a pensar.',
  },
  {
    id: 'm50',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154194/ira_ring_ring_p4vzzb.mp3',
    description: 'Ira – Ring Ring: energía directa, ritmo contagioso y actitud que no se esconde.',
  },
  {
    id: 'm51',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154192/gustavo-santaolalla-babel-otnicka-remix_aknfxu.mp3',
    description: 'Gustavo Santaolalla – Babel (Otnicka Remix): atmósfera etérea, cuerdas profundas y electrónica que eleva el alma.',
  },
  {
    id: 'm52',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154191/HAVASI_Prelude_Age_of_Heroes_Official_Concert_Video_syx4b6.mp3',
    description: 'HAVASI – Prelude: Age of Heroes: piano épico que despierta grandeza y emoción heroica.',
  },
  {
    id: 'm53',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154191/Igorrr_Tout_Petit_Moineau_zznoa0.mp3',
    description: 'Igorrr – Tout Petit Moineau: caos controlado, mezcla de géneros extremos y energía impredecible.',
  },
  {
    id: 'm54',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154190/Hania_Rani_F_Major_Official_Video_Gondwana_Records_womftd.mp3',
    description: 'Hania Rani – F Major: piano delicado y atmósfera introspectiva que envuelve suavemente.',
  },
  {
    id: 'm55',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154188/If_I_had_a_heart_Tagelharpa_Cello_cover_daw1qf.mp3',
    description: 'If I Had a Heart – Tagelharpa & Cello: oscuro y profundo, lamento que resuena entre cuerdas e voces ancestrales.',
  },
  {
    id: 'm56',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154185/Harder_Better_Faster_Stronger_Daft_Punk_Pomplamoose_ht3llb.mp3',
    description: 'Harder, Better, Faster, Stronger – Pomplamoose: ritmos mecánicos y energía juguetona que transforma cada pulso en movimiento.',
  },
  {
    id: 'm57',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154183/Goodbye_snq0fm.mp3',
    description: 'Goodbye: melancolía suave, adiós sentido y emociones que se quedan flotando.',
  },
  {
    id: 'm58',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154181/forest-with-small-river-birds-and-nature-field-recording-6735_rnbqqa.mp3',
    description: 'Bosque con pájaros de río: sonidos naturales que envuelven, agua y aves en un susurro constante de la naturaleza.',
  },
  {
    id: 'm59',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154181/grabby-bow-sample-33124_krrjin.mp3',
    description: 'Grabby Bow – Sample: texturas experimentales, ritmo juguetón y exploración sonora que despierta curiosidad.',
  },
  {
    id: 'm60',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154180/David_Guetta_Burj_Al_Arab_Live_Concert_UnitedatHome_opoes3.mp3',
    description: 'David Guetta – Burj Al Arab Live Concert: energía arrolladora, luces deslumbrantes y beats que llenan el aire de fiesta.',
  },
  {
    id: 'm61',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154179/Giol%C3%AC_Assia_YOUNG_FOREVER_qxm6pm.mp3',
    description: 'Giolì & Assia – Young Forever: frescura vibrante, energía juvenil y melodías que invitan a soñar.',
  },
  {
    id: 'm62',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154179/Florence_The_Machine_Youve_Got_The_Love_Giol%C3%A0_Assia_Remix_qsfvlm.mp3',
    description: 'You’ve Got The Love (Giolì & Assia): voces poderosas, emoción que eleva y ritmo que envuelve el corazón.',
  },
  {
    id: 'm63',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154178/Fleurie_-_Breathe_Lyric_Video_xq7d1a.mp3',
    description: 'Fleurie – Breathe: delicadeza etérea, susurros que calman y un respiro entre la intensidad emocional.',
  },
  {
    id: 'm64',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154171/Faithless_-_We_Come_1_ornl1u.mp3',
    description: 'Faithless – We Come 1: ritmos potentes, energía contagiosa y un llamado a moverse sin descanso.',
  },
  {
    id: 'm65',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154170/Eurythmics_Sweet_Dreams_Instrumental_iyd94f.mp3',
    description: 'Eurythmics – Sweet Dreams (Instrumental): sintetizadores icónicos y atmósfera hipnótica que envuelve cada nota.',
  },
  {
    id: 'm66',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154170/Fade_Under_A_Tergo_Lupi_uxtxyi.mp3',
    description: 'Fade – Under A Tergo Lupi: ambiente oscuro y envolvente, con tensión y texturas que hipnotizan.',
  },
  {
    id: 'm67',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154162/Dua_Lipa_covers_Arctic_Monkeys_Do_I_Wanna_Know_in_the_Live_Lounge_xiok8d.mp3',
    description: 'Dua Lipa – Do I Wanna Know (cover): voz potente y sensual que reinterpreta con estilo íntimo y moderno el clásico de Arctic Monkeys.',
  },
  {
    id: 'm68',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154156/Desperado_zj7tsh.mp3',
    description: 'Rihanna - Desperado: melancolía intensa, guitarra que suspira y sensación de soledad épica.',
  },
  {
    id: 'm69',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154152/David_Guetta_ft_Sia_Titanium_David_Guetta_MORTEN_Future_Rave_Remix_Live_Edit_dkqqid.mp3',
    description: 'David Guetta ft. Sia – Titanium (Future Rave Remix): energía explosiva, voces poderosas y beats que no dejan de empujar.',
  },
  {
    id: 'm70',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154142/All_of_Me_Stellenbosch_University_Choir_John_Legend_Arr_Andre_van_der_Merwe_gqp6ww.mp3',
    description: 'All of Me – Stellenbosch University Choir: armonías vocales envolventes que transforman el clásico de John Legend en un coro emotivo y poderoso.',
  },
  {
    id: 'm71',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154134/agnes-obel-fuel-to-fire-official-video_pk0z7x.mp3',
    description: 'Agnes Obel – Combustible para fuego: piano delicado y voz etérea que encienden emociones profundas y reflexivas.',
  },
  {
    id: 'm72',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154130/Agnes_Obel_DARK_Slowed_and_Reverb_Brings_back_a_lot_of_memories_z4dxqi.mp3',
    description: 'Agnes Obel – DARK (Slowed & Reverb): atmósfera introspectiva, nostalgia densa y melodías que envuelven como un susurro del pasado.',
  },
  {
    id: 'm73',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154128/Beyond_Us_jzx3lq.mp3',
    description: 'Beyond Us: sonido expansivo y envolvente, con energía que invita a soñar más allá del presente.',
  },
  {
    id: 'm74',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154126/A_Tergo_Lupi_Red_Sun_wxhprz.mp3',
    description: 'A Tergo Lupi – Red Sun: atmósfera intensa y misteriosa, con texturas sonoras que arden lentamente.',
  },
  {
    id: 'm75',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154125/A_TERGO_LUPI_Cozu_OFFICIAL_VIDEO_ibk3w2.mp3',
    description: 'A Tergo Lupi – Cozu: misterio y tensión, con texturas oscuras que envuelven y capturan la atención.',
  },
  {
    id: 'm76',
    url:'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756154125/2CELLOS_Smells_Like_Teen_Spirit_Live_at_Sydney_Opera_House_zleidb.mp3',
    description: '2CELLOS – Smells Like Teen Spirit: energía explosiva, cuerdas que rugen y reinterpretación épica del clásico de Nirvana.',
  },
  {
    id: 'm77',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425717/Motivaci%C3%B3n_es_la_palabra_del_inicio_p3wu5m.mp3',
    description: 'gasolina para patear la puerta del día sin pedir permiso.',
  },
  {
    id: 'm78',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425716/Musica_Electronica_PARA_BAILAR_t9e54v.mp3',
    description: 'Electrónica para tirar el bastón de Gandalf y bailar como hobbits',
  },
  {
    id: 'm79',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425712/Majestic_Violin_Bass_Symphony_skdhhh.mp3',
    description: 'Ópera rave para héroes cansados',
  },
  {
    id: 'm80',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425712/Top_music_for_running_vb3mxv.mp3',
    description: 'Motivación: correr como si te persiguiera el alquiler personificado.',
  },
  {
    id: 'm81',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425694/YUNGBLUD_Lowlife_Live_From_Marigny_ksvmsu.mp3',
    description: 'Rock sucio para bailar con las botas embarradas.',
  },
  {
    id: 'm82',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425683/WOS_MORFEO_igo5zh.mp3',
    description: 'rap de insomnio para despertar gigantes.',
  },
  {
    id: 'm84',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425680/TROTSKY_VENGARAN_Mas_alla_o_mas_aca_f0a2ie.mp3',
    description: 'Cumbia punk para bailar en el velorio de tus miedos.',
  },
  {
    id: 'm85',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425680/while_my_guitar_gently_weeps_monalisa_twins_the_beatles_v6adbe.mp3',
    description: 'Guitarras lloronas para sonreír entre lágrimas.',
  },
  {
    id: 'm86',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425679/Who_Will_Save_Us_feat._Fleurie_Tommee_Profitt_fky1n9.mp3',
    description: 'Épica cinematográfica para fingir que todo tiene sentido.',
  },
  {
    id: 'm87',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425677/WHAT_S_UP_4NonBlondes_p7m1ei.mp3',
    description: 'Grito rebelde para mirarte al espejo y no pedir perdón. (GRACIAS MAMÁ)',
  },
  {
    id: 'm88',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425676/Walame_asmzft.mp3',
    description: 'Beat fluyendo para mover la cabeza sin razón aparente.',
  },
  {
    id: 'm89',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425675/Vangelis_-_To_the_Unknown_Man_xnkpbd.mp3',
    description: 'Sintetizadores para perderse sin mapa ni culpa.',
  },
  {
    id: 'm90',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425673/Uruguayo_Hasta_Las_Venas_The_La_Planta_Los_Fatales_Cumbia_Pa_La_Seleccion_njqfyy.mp3',
    description: 'Cumbia guerrera para gritar goles que nadie vio.',
  },
  {
    id: 'm91',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425670/Vois_sur_ton_chemin_Cover_Les_Choristes_anxu6i.mp3',
    description: 'Coros infantiles para recordar que aún hay luz.',
  },
  {
    id: 'm92',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425667/The_Revivalists_Wish_I_Knew_You_zrrw5o.mp3',
    description: 'Rock melancólico para extrañar sin pedir permiso.',
  },
  {
    id: 'm93',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425666/Ummet_Ozcan_Kalimba_dpa4ws.mp3',
    description: 'Electrónica tropical para viajar sin pasaporte.',
  },
  {
    id: 'm94',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425666/Ummet_Ozcan_X_Otyken_Altay_p23mw7.mp3',
    description: 'Trance épico para correr con el viento de aliado.',
  },
  {
    id: 'm95',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425664/Thirty_Seconds_To_Mars_-_Up_In_The_Air_m1ydcq.mp3',
    description: 'Rock celestial para saltar sin mirar abajo.',
  },
  {
    id: 'm96',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425661/Trotsky_Vengaran_UN_BESO_Y_UNA_FLOR_usxjur.mp3',
    description: 'Cumbia romántica para besar sin manual de instrucciones.',
  },
  {
    id: 'm97',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425660/the-beatles-come-together-cover_by_sershenzaritskaya_zlg6uw.mp3',
    description: 'Pop clásico para juntarte aunque nadie sepa por qué.',
  },
  {
    id: 'm98',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425659/The_Dead_South_-_In_Hell_I_ll_Be_In_Good_Company_pbeomv.mp3',
    description: 'Bluegrass oscuro para brindar con los demonios.',
  },
  {
    id: 'm99',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425657/The_Cure_Friday_I_m_In_Love_xg6tqz.mp3',
    description: 'Pop gótico para enamorarte aunque sea viernes.',
  },
  {
    id: 'm100',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425657/THE_LAST_OF_US_Fuel_to_Fire_by_Agnes_Obel_norfa1.mp3',
    description: 'Épica triste para prender fuego a lo que duele.',
  },
  {
    id: 'm101',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425653/The_Cure_Just_Like_Heaven_ultuju.mp3',
    description: 'Pop melancólico para flotar entre nubes de nostalgia.',
  },
  {
    id: 'm102',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425653/the_beatles_yellow_submarine_smkll6.mp3',
    description: 'Pop psicodélico para navegar en pijama y sonrisas.',
  },
  {
    id: 'm103',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425652/the_beatles_oh_darling_cbar7x.mp3',
    description: 'Balada dulce para pedir perdón con ternura exagerada.',
  },
  {
    id: 'm104',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425652/the_beatles_pomplamoose_hjt5sd.mp3',
    description: 'Pop raro para sonreír sin motivo aparente.',
  },
  {
    id: 'm105',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425650/the_beatles_obladi_oblada_skvukp.mp3',
    description: 'Pop alegre para cantar como si nada importara.',
  },
  {
    id: 'm106',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425650/the_beatles_hey_jude_bsssdd.mp3',
    description: 'Balada eterna para consolar al mondo cantando.',
  },
  {
    id: 'm107',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425650/the_beatles_help_dv2fg9.mp3',
    description: 'Rock urgente para gritar “¡socorro!” con estilo.',
  },
  {
    id: 'm108',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425650/TASH_SULTANA_JUNGLE_abimoe.mp3',
    description: 'Funk psicodélico para perderte entre lianas y acordes.',
  },
  {
    id: 'm109',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425648/Sultans_of_Swing_kri1ji.mp3',
    description: 'Guitarras elegantes para caminar como rey del barrio.',
  },
  {
    id: 'm110',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425647/System_Of_A_Down_Aerials_vmnd0y.mp3',
    description: 'Metal explosivo para gritar mientras el mundo se cae.',
  },
  {
    id: 'm111',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425644/Sting_Shape_Of_My_Heart_Leon_bgrlzn.mp3',
    description: 'Jazz introspectivo para dibujar secretos en el aire.',
  },
  {
    id: 'm112',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425643/Stefflon_Don_-_16_Shots_hyz9sj.mp3',
    description: 'Trap afilado para que nadie olvide tu nombre.',
  },
  {
    id: 'm113',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425641/somewhere_over_the_rainbow_israel_iz_kamakawiwoole_wacew0.mp3',
    description: 'Ukelele soñador para flotar sobre tus penas.',
  },
  {
    id: 'm114',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425640/Stromae_Pomme_fcrzcg.mp3',
    description: 'Electropop ácido para morder la manzana sin culpa.',
  },
  {
    id: 'm115',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425639/Sigrid_-_Everybody_Knows_ochfjl.mp3',
    description: 'Pop luminoso para gritar verdades incómodas.',
  },
  {
    id: 'm116',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425638/Shut_Me_Up_Acoustic_Version_-_Lindsay_Ell_-_The_Ell_Sessions_cqm3qj.mp3',
    description: 'Balada cruel para callarte a vos mismo con estilo.',
  },
  {
    id: 'm117',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425635/Seru_giran_Eiti_leda_wotz0c.mp3',
    description: 'Rock argentino para cuestionar todo y no arreglar nada.',
  },
  {
    id: 'm118',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425635/Sia_I_m_Still_Here_JOKER_tdyele.mp3',
    description: 'Pop dramático para levantarte aunque el mundo te ignore.',
  },
  {
    id: 'm119',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425634/Sia_Cheap_Thrills_ouyzjp.mp3',
    description: 'Pop mordaz para disfrutar sin remordimientos.',
  },
  {
    id: 'm121',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425630/SHAED_Trampoline_Jauz_Remix_n7nd02.mp3',
    description: 'Electropop volador para saltar sobre tus problemas.',
  },
  {
    id: 'm122',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425627/Santana_jtorwy.mp3',
    description: 'Guitarras ardientes para sudar pasión sin permiso.',
  },
  {
    id: 'm123',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425626/Scared_Of_The_Dark_-_Julia_Westlin_hmav3a.mp3',
    description: 'Pop nocturno para abrazar tus miedos a escondidas.',
  },
  {
    id: 'm124',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425624/Residente_-_Ren%C3%A9_uzrm5g.mp3',
    description: 'Rap confesional para hablarle al espejo sin filtros.',
  },
  {
    id: 'm125',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425624/Sakura_Cherry_Blossoms_zosbnq.mp3',
    description: 'Melodía delicada para llorar flores que nunca volverán.',
  },
  {
    id: 'm126',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425618/Rising_Appalachia_-_Silver_xxzlyl.mp3',
    description: 'Folk brillante para buscar tesoros que nadie ve.',
  },
  {
    id: 'm127',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425616/Rivo_-_Last_Night_Korolova_Remix_qygtnj.mp3',
    description: 'Electropop nocturno para arrepentirte bailando.',
  },
  {
    id: 'm128',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425614/RAJA_-_Maasai_mk8k2k.mp3',
    description: 'Beat tribal para caminar con orgullo aunque nadie te mire.',
  },
  {
    id: 'm129',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425612/Ren_Hi_Ren_mvxeiv.mp3',
    description: 'Pop inquieto para perseguir sombras sin descanso.',
  },
  {
    id: 'm130',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425608/RAJA_MAASAI_xbasm7.mp3',
    description: 'Etnic techno con más tambores que una mudanza tribal.',
  },
  {
    id: 'm131',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425603/Rag_n_Bone_Man_Human_iegg84.mp3',
    description: 'Ideal para gritarle al espejo con voz de góspel y cara de lunes.',
  },
  {
    id: 'm132',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425603/Portugal._The_Man_weikc7.mp3',
    description: 'Rock psicodélico con complejo de himno millennial: suena a revolución, pero con filtro vintage.',
  },
  {
    id: 'm133',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425602/radiohead_creep_zjqrxj.mp3',
    description: 'Balada para bichos raros que se sienten como error de sistema en una fiesta elegante.',
  },
  {
    id: 'm134',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425601/Pozo-_Lisandro_Aristimu%C3%B1o_t2w7kn.mp3',
    description: 'Canción para caer sin red: un descenso poético entre barro, alas rotas y lunas mordidas.',
  },
  {
    id: 'm135',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425601/Pyramid_-_Cole_s_Memories_lwv0ki.mp3',
    description: 'Recuerdo electrónico con sabor a nostalgia digital: como leer un viejo chat en medio de una rave.',
  },
  {
    id: 'm136',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425601/Pitufo_Lombardo_Descolgando_el_Cielo_d4dv4q.mp3',
    description: 'Murga épica para colgar la bandera en el alma y bajar el cielo a puro pedal.',
  },
  {
    id: 'm137',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425598/P_NK_What_About_Us_hl1tmu.mp3',
    description: 'Balada de ruptura con sabor a reclamo colectivo: cuando el corazón y la política se rompen al mismo tiempo.',
  },
  {
    id: 'm138',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425597/POLO_PAN_a_Feel_Good_touian.mp3',
    description: 'Electro pop para flotar en limonada cósmica: felicidad con sintetizadores y cero culpa.',
  },
  {
    id: 'm139',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425593/Parra_for_Cuva_Anna_Naklab_orjeg5.mp3',
    description: 'Electrónica melancólica para soñar con amores imposibles en cámara lenta.',
  },
  {
    id: 'm140',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425591/peggy_lee_a_hard_days_night_wqakco.mp3',
    description: 'Cover con swing para noches duras: cuando el cansancio se baila con elegancia y whisky.',
  },
  {
    id: 'm141',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425591/Nicki_Nicole_Concert_xdqy7q.mp3',
    description: 'Trap-pop confesional para gritarle al amor con uñas pintadas y beats que sangran.',
  },
  {
    id: 'm142',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425591/onerepublic_counting_stars_lgjsxs.mp3',
    description: 'Pop espiritual para quienes cambian billetes por estrellas y aún esperan que el karma tenga playlist.',
  },
  {
    id: 'm143',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425590/Omiki_-_Devil_in_Me_wlnidq.mp3',
    description: 'Psytrance poseído: beats que sudan pecado y melodía con olor a exorcismo elegante.',
  },
  {
    id: 'm144',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425590/OTTA_orchestra_Royal_Safari_fs1c3a.mp3',
    description: 'Instrumental teatral con delirio imperial: suena a desfile de coronas en plena selva psicodélica.',
  },
  {
    id: 'm145',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425587/One_Hundred_Hunters_gl7y7w.mp3',
    description: 'Electrónica cinemática para perseguir ideas como si fueran bestias en la niebla.',
  },
  {
    id: 'm146',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425584/Of_Monsters_and_Men_Dirty_Paws_s5cpxu.mp3',
    description: 'Fábula indie para bestias sensibles: cuando la guerra la ganan las patas sucias y los árboles que cantan.',
  },
  {
    id: 'm147',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425579/Noga_Erez_-_DUMB_ykn0tb.mp3',
    description: 'Electropop con veneno: arrogancia, sarcasmo y beats que te insultan bailando.',
  },
  {
    id: 'm148',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425578/memory_of_joe_cocker-1944-2014_nj6oal.mp3',
    description: 'Homenaje rasposo a una voz que gritaba verdades con whisky y ternura.',
  },
  {
    id: 'm149',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425577/Noga_Erez_-_VIEWS_m7o07d.mp3',
    description: 'Electropop con metralla: crítica afilada para un mundo que compra números y vende alma.',
  },
  {
    id: 'm150',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425575/Na_Le_Phaxe_Remix_lkklbo.mp3',
    description: 'Trance hipnótico para perderse en galaxias interiores: beats que susurran en idioma extraterrestre.',
  },
  {
    id: 'm151',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425572/Michael_Jackson_-_Billie_Jean_fqhiwo.mp3',
    description: 'Pop paranoico con moonwalk: cuando el ritmo denuncia y el bajo te persigue como una sospecha.',
  },
  {
    id: 'm152',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425565/Moby_Natural_Blues_ft.Christina_Ricci_lzmejm.mp3',
    description: 'Blues electrónico para almas cansadas: cuando el dolor se repite como sample y la fe suena a eco lejano.',
  },
  {
    id: 'm153',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425561/Massive_Attack_Teardrop_np5gvn.mp3',
    description: 'Trip hop líquido para llorar sin hacer ruido: cada beat es una lágrima que flota en gravedad cero.',
  },
  {
    id: 'm154',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425559/miley_cyrus_jaded_backyard_lbokik.mp3',
    description: 'Balada confesional en clave acústica: cuando el arrepentimiento se canta entre árboles y heridas abiertas.',
  },
  {
    id: 'm155',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425556/Mazzy_Star_-_Fade_Into_You_pfwmqj.mp3',
    description: 'Dream pop para disolverse en otro cuerpo: susurros que flotan como humo en habitaciones donde nadie pregunta.',
  },
  {
    id: 'm156',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425556/Macy_Gray_-_Here_Comes_The_Rain_Again_f4zb6z.mp3',
    description: 'Cover soul con melancolía retro: la lluvia cae como memoria y cada nota es un suspiro empapado.',
  },
  {
    id: 'm157',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425555/mark_ronson_nothing_breaks_like_a_heart_kkuayp.mp3',
    description: 'Country-disco para corazones blindados: suena a persecución emocional con sirenas y glitter roto.',
  },
  {
    id: 'm158',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425553/Lisandro_Aristimun%CC%83o_Anfibio_mnxtut.mp3',
    description: 'Folk electrónico para llorar en posición fetal pero con estilo: ideal para cuando el sol te da la espalda y vos le escribís una carta igual.',
  },
  {
    id: 'm159',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425546/Main_Title_Also_Sprach_Zarathustra_rx6nqf.mp3',
    description: 'Fanfarria cósmica para egos en expansión: ideal para entrar a una reunión como si fueras el Big Bang con traje.',
  },
  {
    id: 'm160',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425545/Los_Autenticos_Decadentes_Amor_y1oqsp.mp3',
    description: 'Balada decadente para enamorarse como quien se tira de un trampolín sin revisar si hay agua: suave, narcótica y con olor a error feliz.',
  },
  {
    id: 'm161',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425545/Lady_Gaga_Bradley_Cooper_Shallow_From_A_Star_Is_Born_ki7ptg.mp3',
    description: 'Balada épica para zambullirse en el drama: cuando el amor se canta al borde del abismo y el fondo nunca llega.',
  },
  {
    id: 'm162',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425544/lp_when_were_high_iwqlyv.mp3',
    description: 'Electropop hedonista para besar el cielo con glitter en la lengua: ideal para cuando el amor y la droga se confunden en la misma playlist.',
  },
  {
    id: 'm163',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425544/lovely_k8i1zg.mp3',
    description: 'Balada gélida para corazones de vidrio: ideal para cuando el dolor se vuelve decoración y el hogar es una jaula con eco.',
  },
  {
    id: 'm164',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425541/LOST_Tommee_Profitt_Sam_Tinnesz_x_Billy_Ray_Cyrus_n5kwsa.mp3',
    description: 'Balada apocalíptica para vagar por el infierno con botas country y sintetizadores épicos: ideal para cuando ni Dios contesta y el río te arrastra igual.',
  },
  {
    id: 'm166',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425540/Los_Fabulosos_Cadillacs_Siguiendo_La_Luna_czwff5.mp3',
    description: 'Balada lunar para llorar con dignidad: ideal para prometer cambios que nunca llegan mientras el cielo te ignora con estilo.',
  },
  {
    id: 'm167',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425539/Lisa_Gerrard_Now_We_Are_Free_do7tix.mp3',
    description: 'Épica espiritual para flotar sobre ruinas: ideal para morir en cámara lenta mientras el alma se despide en idioma inventado.',
  },
  {
    id: 'm168',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425536/LA_TEJA_PRIDE_La_Suerte_nzfnzu.mp3',
    description: 'Rap resiliente para sobrevivir con dignidad: ideal para desayunar pena, cortar el pelo y seguir el mapa de tu corazón aunque esté dibujado con errores.',
  },
  {
    id: 'm169',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425534/lady-gaga-imagine_2015_european_games_opening_ceremony_pznt1i.mp3',
    description: 'Cover solemne para estadios con lágrimas: cuando Lennon se canta en piano blanco y Gaga se convierte en embajadora del drama global.',
  },
  {
    id: 'm170',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425533/Lenny_Kravitz_Again_twzjbe.mp3',
    description: 'Balada nostálgica para amantes reincidentes: ideal para preguntarse “¿dónde has estado?” mientras el espejo responde con silencio y guitarra.',
  },
  {
    id: 'm171',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425531/Laura_van_Dam_-_Insomnia_le9ilv.mp3',
    description: 'Techno melódico para noches sin consuelo: ideal para bailar con los ojos abiertos mientras el insomnio te susurra que no hay final.',
  },
  {
    id: 'm172',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425528/LA_TRAMPA_CA%C3%8DDA_LIBRE_tn4ia6.mp3',
    description: 'Rock uruguayo en modo salto sin red: ideal para cuando preferís el abismo antes que seguir cruzando los dedos.',
  },
  {
    id: 'm173',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425526/LA_TRAMPA_LAS_D%C3%89CIMAS_qu0t7u.mp3',
    description: 'Milonga rebelde para cantar con espinas: ideal para declarar tu libertad sobre los escombros, mientras la guitarra decide cuándo callar.',
  },
  {
    id: 'm174',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425524/Joker_Gary_Glitter_Rock_and_Roll_mggbfj.mp3',
    description: 'Glam rock para bailar en escaleras con problemas mentales: ideal para cuando el mundo arde y vos sonreís con maquillaje corrido.',
  },
  {
    id: 'm175',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425523/Kovacs_My_Love_jof2cl.mp3',
    description: 'Soul noir para vengarse con elegancia: ideal para brindar con champán sobre los restos del ego ajeno.',
  },
  {
    id: 'm177',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425519/Korolova_Shining_edmmil.mp3',
    description: 'Melodic techno para brillar en la oscuridad sin pedir permiso: ideal para cuando el cuerpo pide pista y el alma se enciende como bola de espejos.',
  },
  {
    id: 'm179',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425518/Julia_Westlin_-_Scared_Of_The_Dark_wrlkap.mp3',
    description: 'Balada etérea para abrazar el miedo con voz de cristal: ideal para cuando la oscuridad te canta primero y vos decidís responderle en falsete.',
  },
  {
    id: 'm180',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425515/Kaleidoscope_Adrian_Berenguer_cma9ld.mp3',
    description: 'Ambient minimalista para mirar el mundo desde adentro: ideal para cuando el alma se fragmenta en colores y el tiempo decide no molestar.',
  },
  {
    id: 'm181',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425515/Joker_X_Harley_Don_t_Let_Me_Down_fehcvu.mp3',
    description: 'Remix dramático para bailar con traumas compartidos: ideal para cuando el amor es tóxico, pero el beat te convence de quedarte un rato más.',
  },
  {
    id: 'm182',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425513/Jonathan_Roy_Keeping_Me_Alive_fl5yoz.mp3',
    description: 'Pop confesional para prender fuego al pasado con voz rasgada: ideal para cuando decidís que sobrevivir también puede sonar épico.',
  },
  {
    id: 'm183',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425507/Jarrod_Morris_Desperado_rf79f0.mp3',
    description: 'Country alternativo para corazones huecos en Monte Carlo: ideal para fugarse con alguien igual de roto, mientras el auto arranca y nadie mira atrás.',
  },
  {
    id: 'm184',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425507/JOKER_2_Lady_Gaga_o1iy80.mp3',
    description: 'Balada psicótica para enamorarse en el manicomio: ideal para cuando el amor es un delirio compartido y el maquillaje se corre con lágrimas de ópera.',
  },
  {
    id: 'm185',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425506/Jan_Blomqvist_Natascha_Polke_Midnight_Sun_r2tqgx.mp3',
    description: 'Techno melódico para correr sin mapa bajo un sol que nunca duerme: ideal para perderse con alguien que también quiere olvidar, mientras el beat dibuja constelaciones en la piel.',
  },
  {
    id: 'm186',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425505/Ivy_Levan_-_Biscuit_k6bkpa.mp3',
    description: 'Pop venenoso con pestañas de guerra: ideal para cuando no pedís permiso, tirás el té, y gritás “kiss my biscuit” como si fuera un decreto presidencial.',
  },
  {
    id: 'm187',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425505/INXS_Never_Tear_Us_Apart_vmfitg.mp3',
    description: 'Balada con saxofón para amores que ni el universo puede separar, ideal para cuando sentís que volar juntos es más fácil que caminar solos.',
  },
  {
    id: 'm188',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425501/Hoobastank_The_Reason_u3sk3v.mp3',
    description: 'Balada arrepentida para pedir perdón sin bajar la mirada: ideal para cuando entendés tarde, pero igual querés que lo sepa.',
  },
  {
    id: 'm189',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425500/Heilung_Anoana_g5vkl4.mp3',
    description: 'Ritual sonoro para invocar memorias que nunca viviste: ideal para caminar descalzo entre árboles que te reconocen, mientras el tambor te recuerda que sos parte de algo más viejo que el lenguaje.',
  },
  {
    id: 'm191',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425500/In_The_End_Fleurie_Jung_Youth_Tommee_Profitt_kq6ftm.mp3',
    description: 'Versión épica para cuando el dolor se vuelve cinematográfico: ideal para caer con estilo, sabiendo que aunque no importe… lo intentaste con todo.',
  },
  {
    id: 'm192',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425498/Indiara_Sfair_Tiago_Juk_La_Noche_zvl9zf.mp3',
    description: 'Cinemática emocional para resistir cuando todo arde: ideal para seguir latiendo aunque el mundo se caiga, porque hay algo en vos que no se rinde.',
  },
  {
    id: 'm193',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425498/If_I_Hada_Heart_Tal_Barr_qlksnv.mp3',
    description: 'Ritual urbano con alma de selva: ideal para cuando la noche te abraza sin preguntar y el groove te recuerda que sos parte de algo que respira más lento.',
  },
  {
    id: 'm194',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425495/Imagine_ragons_Thunder_jrpurn.mp3',
    description: 'Himno de autoafirmación con rayos incluidos: ideal para cuando te reís último, desde el escenario, mientras los que se burlaban aplauden desde el fondo.',
  },
  {
    id: 'm195',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425494/Himno_nacional_Uruguayo_por_NO_TE_VA_GUSTAR_Y_LA_CATALINA_eqf6dr.mp3',
    description: 'Versión lenta con tambor de murga y alma de fogón: ideal para cuando el orgullo se canta con voz rasposa y el país te late en el pecho como un redoblante.',
  },
  {
    id: 'm196',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425492/Heilung_Anoana_r1jgc6.mp3',
    description: 'Ritual ancestral para despertar memorias que no sabías que eran tuyas: ideal para cuando el cuerpo se convierte en tambor y el alma recuerda que alguna vez fue bosque.',
  },
  {
    id: 'm197',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425491/HAVASI_The_Storm_feat._Lisa_Gerrard_zvlgk1.mp3',
    description: 'Sinfonía épica para cuando el alma se convierte en tormenta: ideal para cruzar paisajes internos con la voz como brújula y el piano como relámpago.',
  },
  {
    id: 'm198',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425489/Halsey_Without_Me_v0kfeb.mp3',
    description: 'Pop confesional para cuando el amor te sube al pedestal y después te deja caer: ideal para recordar que fuiste vos quien lo sostuvo, y también quien aprendió a soltar.',
  },
  {
    id: 'm199',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425489/Happiness_Does_Not_Wait_k3nwfj.mp3',
    description: 'Piano suspendido en el tiempo para cuando la nostalgia no avisa: ideal para mirar por la ventana sin saber si estás recordando o imaginando.',
  },
  {
    id: 'm200',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425485/green_day_basket_case_tofllq.mp3',
    description: 'Punk confesional para cuando la cabeza es un laberinto y el corazón no tiene mapa: ideal para gritar tus paranoias con guitarra distorsionada y que el mundo te escuche sin entender, pero igual te aplauda.',
  },
  {
    id: 'm201',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425483/Faithless_-_Insomnia_ciueqp.mp3',
    description: 'Mantra electrónico para noches sin tregua: ideal para cuando el cuerpo pide descanso pero la mente sigue escribiendo con luz de vela y ritmo de tambor interno.',
  },
  {
    id: 'm202',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425483/gnarls_barkley_crazy_czm8tl.mp3',
    description: 'Soul psicodélico para cuando perder la cabeza se siente como encontrar el centro: ideal para bailar con tus demonios mientras les cantás que están invitados.',
  },
  {
    id: 'm203',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425481/Gnarls_Barkley_Crazy_Cover_by_Daniela_Andrade_xthp4d.mp3',
    description: 'Versión íntima para cuando la locura se canta en susurros: ideal para abrazar lo roto con voz suave y entender que perderse también puede sonar hermoso.',
  },
  {
    id: 'm204',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425481/Get_Up_LiQuiD_jq7wrj.mp3',
    description: 'House líquido para cuerpos que se derriten en la pista: ideal para cuando el sudor es lenguaje y el beat te pide que no expliques, solo te levantes.',
  },
  {
    id: 'm205',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425481/Gioli_Assia_GOD_DON_T_LEAVE_ME_ALONE_jsecmq.mp3',
    description: 'Electrónica confesional con alma de ritual: ideal para cuando el cuerpo pide liberación pero la voz aún suplica compañía.',
  },
  {
    id: 'm206',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425477/fiona_apple_across_the_universe_zpikgp.mp3',
    description: 'Cover etérea para flotar entre pensamientos que no te pertenecen: ideal para cuando las palabras se escurren como lluvia en un vaso de papel y el universo te acaricia sin cambiarte.',
  },
  {
    id: 'm207',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425476/False_Confidence_-_Noah_Kahan_iyldsp.mp3',
    description: 'Folk-pop confesional para cuando te vestís para alguien que nunca te ve: ideal para derrumbarte con elegancia y reconstruirte con dudas bien pulidas.',
  },
  {
    id: 'm208',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425474/Fade_Under_-_A_Tergo_Lupi_pr4b12.mp3',
    description: 'Dark folk con tambor ritual y alma de piedra antigua: ideal para cuando el vacío te llama por tu nombre y vos respondés con música que sabe caer sin romperse',
  },
  {
    id: 'm209',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425475/Feeling_Good_Harmonica_Cover_Amanda_Ventura_niwlox.mp3',
    description: 'Versión soplada con alma de libertad: ideal para cuando el día empieza sin permiso y vos decidís que hoy sí, hoy se siente bien.',
  },
  {
    id: 'm210',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425470/Dua_Lipa_Physical_lyqkob.mp3',
    description: 'Pop ochentoso con adrenalina y brillo: ideal para cuando el cuerpo pide pista y el corazón se enciende como bola de espejos.',
  },
  {
    id: 'm211',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425468/ETOLUBOV_-_%D0%97%D0%B0%D0%B3%D0%B0%D0%B4%D0%B0%D0%BB%D0%B0_pbjtph.mp3',
    description: 'Pop ruso con alma de ensueño: ideal para cuando imaginás a alguien tanto que empieza a existir en tu cielo inventado. Voz suave, deseo dibujado y un ritmo que flota como promesa no dicha',
  },
  {
    id: 'm212',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425468/Estas_Tonne-Feel_the_pain_zotcsv.mp3',
    description: 'Guitarra viajera para llorar sin palabras.',
  },
  {
    id: 'm213',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425467/El_Cuarteto_de_Nos_Gaucho_Power_bvubqj.mp3',
    description: 'Rock uruguayo para galopar sobre la absurdidad del mundo.',
  },
  {
    id: 'm214',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425465/El_Cuarteto_de_Nos_Mirada_de_Nylon_yovtoz.mp3',
    description: 'Pop irónico para mirar la vida a través de lente sintético.',
  },
  {
    id: 'm215',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425457/Earl_All_That_Glitters_er5qrg.mp3',
    description: 'Hip-hop brillante para brillar aunque sea efímero.',
  },
  {
    id: 'm216',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425455/David_Guetta_ft_Sia_-_Titanium_eocqle.mp3',
    description: 'Electro poderoso para ser indestructible aunque te duela todo.',
  },
  {
    id: 'm217',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425454/dream_on_postmodern_jukebox_ft_morgan_james_aerosmith_hacve9.mp3',
    description: 'Swing melancólico para soñar con drama vintage.',
  },
  {
    id: 'm218',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425454/Deep_Dish_-_Say_Hello_ipiz6p.mp3',
    description: 'House oscuro para invitar al infierno a tus amigos.',
  },
  {
    id: 'm219',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425454/dele_set_fire_to_the_rain_atynue.mp3',
    description: 'Pop dramático para prender fuego a tus lágrimas.',
  },
  {
    id: 'm221',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425452/domnufr_alltid_cvyysl.mp3',
    description: 'Electrónica fría para bailar en la niebla.',
  },
  {
    id: 'm222',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425452/Dj_Kantik_Teriyaki_Boyz_Tokyo_Drift_Sean_Paul_Temperature_Remix_kolaxb.mp3',
    description: 'Reggaetón internacional para correr como si Tokio te persiguiera.',
  },
  {
    id: 'm223',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425447/David_Guetta_Titanium_phzfaw.mp3',
    description: 'Electro explosivo para resistir aunque todo te empuje al suelo.',
  },
  {
    id: 'm224',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425446/Charly_Garcia_Nuevos_rapos_jpfj3a.mp3',
    description: 'Rock excéntrico para reírte del mundo y de vos mismo.',
  },
  {
    id: 'm225',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425446/dancing_queen_abba_1920s_ycx4ej.mp3',
    description: 'Disco brillante para mover el esqueleto sin culpa.',
  },
  {
    id: 'm226',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425446/creep_vintage_postmodern_jukebox_cdse6h.mp3',
    description: 'Jazz oscuro para mirarte al espejo con sonrisa torcida.',
  },
  {
    id: 'm227',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425444/CROW_-_UPIKO_njpkyp.mp3',
    description: 'Rock crudo para gritar aunque nadie escuche.',
  },
  {
    id: 'm228',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425442/Cannons_-_Hurricane_jfep2y.mp3',
    description: 'Pop intenso para bailar mientras todo se desordena.',
  },
  {
    id: 'm229',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425441/come_together_metal_cover_by_leo_hannah_rabea_erik_truls_ccv0ad.mp3',
    description: 'Metal épico para unirnos aunque todo esté hecho trizas.',
  },
  {
    id: 'm230',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425441/Chiquillada_zgsjmb.mp3',
    description: 'Recuerdos de nuestras raíces, para saltar sin que nadie te vea.',
  },
  {
    id: 'm231',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425440/come_together_the_beatles_jennel_garcia_acoustic_cover_bnjtuh.mp3',
    description: 'Acústico suave para juntarte en silencio con el caos.',
  },
  {
    id: 'm232',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425436/campari_entering_red_ana_de_armas_vmswhe.mp3',
    description: 'Electrónica seductora para entrar rojo como el Campari.',
  },
  {
    id: 'm233',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425436/Brit_Floyd_-_The_Great_Gig_In_the_Sky_-_Live_in_RENO_eq5swe.mp3',
    description: 'Pink Floyd épico para flotar entre nubes de guitarra y voz.',
  },
  {
    id: 'm234',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425436/Cadillac_Solitario_um3or8.mp3',
    description: 'Rock nostálgico para manejar con el corazón abierto.',
  },
  {
    id: 'm235',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425430/bad-romance-vintage_rjnizv.mp3',
    description: 'Pop melancólico para enamorarte con precaución.',
  },
  {
    id: 'm236',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425430/Bonobo_First_Fires_feat._Grey_Reverend_vzz0xp.mp3',
    description: 'Electrónica orgánica para encender chispas invisibles.',
  },
  {
    id: 'm237',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425427/Alt-J_Taro_l2eamv.mp3',
    description: 'Indie épico para marchar con historias que duelen.',
  },
  {
    id: 'm238',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425426/balada_para_un_loco_wfeg4a.mp3',
    description: 'Tango desquiciado para amar sin reglas ni frenos.',
  },
  {
    id: 'm239',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425426/BENNETT_Vois_sur_ton_chemin_t2dqyt.mp3',
    description: 'Coros suaves para recordar que aún hay esperanza.',
  },
  {
    id: 'm240',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425423/aygrace_you_dont_own_me_ft_geazy_hwltmn.mp3',
    description: 'AyGrace – You Don’t Own Me (feat. G-Eazy) Pop desafiante para decir “no me perteneces” a gritos.',
  },
  {
    id: 'm241',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425421/Aerosmith-_Dont_Want_Miss_a_Thing_ejbwbl.mp3',
    description: 'Aerosmith – I Don’t Want to Miss a Thing** Balada gigante para suspirar como si fuera el último día.',
  },
  {
    id: 'm242',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425421/Andre_Rieu_O_Fortuna_Carmina_Burana_bwxq7b.mp3',
    description: 'André Rieu – O Fortuna (Carmina Burana)** Orquesta apocalíptica para dramatizar cada instante.',
  },
  {
    id: 'm243',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425422/AWOLNATION_Sail_ndwm9h.mp3',
    description: 'AWOLNATION – Sail** Electrónica intensa para hundirte y flotar al mismo tiempo.',
  },
  {
    id: 'm244',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425419/adele_hello_qseo7h.mp3',
    description: 'Adele – Hello** Balada intensa para llamar al pasado y colgar con estilo.',
  },
  {
    id: 'm245',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425418/Artemas_i_like_the_way_you_kiss_me_uf4qfc.mp3',
    description: 'Artemas – I Like the Way You Kiss Me** Pop coqueto para sonreír con los labios ajenos.',
  },
  {
    id: 'm246',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425416/Avicii_Levels_x2tnbs.mp3',
    description: 'Avicii – Levels** Electrónica imparable para saltar como si no hubiera gravedad.',
  },
  {
    id: 'm247',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425415/alt-J_Breezeblocks_hivwbf.mp3',
    description: 'Alt-J – Breezeblocks** Indie oscuro para obsesionarte con melodías que atrapan.',
  },
  {
    id: 'm248',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425415/Anna_Lapwood_Ludovico_Einaudi_Experience_Elbphilharmonie_Sessions_dlk5gf.mp3',
    description: 'Anna Lapwood – Ludovico Einaudi Experience (Elbphilharmonie Sessions)** Piano elegante para flotar entre notas y suspiros.',
  },
  {
    id: 'm249',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425413/AaRON_-_Blouson_Noir_mxlyvk.mp3',
    description: 'AaRON – Blouson Noir** Pop melancólico para caminar bajo luces que no perdonan.',
  },
  {
    id: 'm250',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425413/AURORA_Starvation_ppitvv.mp3',
    description: 'AURORA – Starvation** Electropop oscuro para gritar hambre de mundo y emociones.',
  },
  {
    id: 'm251',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425409/1930s-jazz-wham-cover-feat-robyn-adele-anderson-dave-koz_o60g1f.mp3',
    description: 'Década de 1930 Jazz – Wham! Cover (feat. Robyn Adele Anderson & Dave Koz)** Jazz vintage para moverte como si nadie te estuviera mirando.',
  },
  {
    id: 'm252',
    url: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756425408/adele_rolling_in_the_deep_m15oyf.mp3',
    description: 'Adele – Rolling in the Deep** Balada poderosa para hundirte en la traición con estilo.',
  },
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
  },
  {
    id: 'p13',
    title: 'Sirio confuso',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756607093/Siro_confuso_ugpldr.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756610721/_2089c8cb-2a0d-4a9e-aa2f-4107b04451ae_cg3kab.jpg',
  },
  {
    id: 'p14',
    title: 'Elemento Alma',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756607090/elemento_alma_r9conb.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756610721/_2089c8cb-2a0d-4a9e-aa2f-4107b04451ae_cg3kab.jpg',
  },
  {
    id: 'p15',
    title: 'Quizás la vida.',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756607089/quizas_la_vida_ryzzta.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756610721/_2089c8cb-2a0d-4a9e-aa2f-4107b04451ae_cg3kab.jpg',
  },
  {
    id: 'p16',
    title: 'El miedo como señal de vida.',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756607000/El_Miedo_como_Se%C3%B1al_de_Vida_vsoc5e.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756610721/_2089c8cb-2a0d-4a9e-aa2f-4107b04451ae_cg3kab.jpg',
  },
  {
    id: 'p17',
    title: 'Paranoia Digital',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756606972/paranoia_dom%C3%A9stica_y6qr0e.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756610721/_2089c8cb-2a0d-4a9e-aa2f-4107b04451ae_cg3kab.jpg',
  },
  {
    id: 'p18',
    title: 'De Dios Del Alma y de Sísifo.',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756606972/De_dios_del_alma_y_de_s%C3%ADsifo_xm8vzu.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756610721/_2089c8cb-2a0d-4a9e-aa2f-4107b04451ae_cg3kab.jpg',
  },
  {
    id: 'p19',
    title: 'Sirio paranoico (otra vez)',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756606971/paranoia_digital1_o1n621.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756610721/_2089c8cb-2a0d-4a9e-aa2f-4107b04451ae_cg3kab.jpg',
  },
  {
    id: 'p20',
    title: 'Malditos Lame botas.',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756606840/Los_lame_botas_del_poder_tnmoge.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756610721/_2089c8cb-2a0d-4a9e-aa2f-4107b04451ae_cg3kab.jpg',
  },
  {
    id: 'p21',
    title: 'Don Quijano.',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756606839/Don_Quijano_euutdn.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756610721/_2089c8cb-2a0d-4a9e-aa2f-4107b04451ae_cg3kab.jpg',
  },
  {
    id: 'p22',
    title: 'Cenicienta es? o se hace?',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756606823/cenicienta_wnj1go.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756610721/_2089c8cb-2a0d-4a9e-aa2f-4107b04451ae_cg3kab.jpg',
  },
  {
    id: 'p23',
    title: 'Somos ritmo y ritmo somos',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756606802/somos_ritmo_y_ritmo_somos_cgqvmy.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756610721/_2089c8cb-2a0d-4a9e-aa2f-4107b04451ae_cg3kab.jpg',
  },
  {
    id: 'p24',
    title: 'La fe a pesar de la muerte.',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756606783/la_fe_a_pesar_de_la_muerte_qvtqkc.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756610721/_2089c8cb-2a0d-4a9e-aa2f-4107b04451ae_cg3kab.jpg',
  },
  {
    id: 'p25',
    title: 'Conchita Macarneí.',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756606776/conchita_macarnei_pifvph.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756610721/_2089c8cb-2a0d-4a9e-aa2f-4107b04451ae_cg3kab.jpg',
  },
  {
    id: 'p26',
    title: 'El universo vive!!!',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756606277/el_universo_vive_myuffn.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756610721/_2089c8cb-2a0d-4a9e-aa2f-4107b04451ae_cg3kab.jpg',
  },
  {
    id: 'p27',
    title: 'Elemento fuego.',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756606275/fuego_sqewvj.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756610721/_2089c8cb-2a0d-4a9e-aa2f-4107b04451ae_cg3kab.jpg',
  },
  {
    id: 'p28',
    title: 'Elemento tierra.',
    artist: 'Podcast',
    videoId: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756606275/tierra_hfudg2.mp3',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756610721/_2089c8cb-2a0d-4a9e-aa2f-4107b04451ae_cg3kab.jpg',
  },
];

// New Video Podcasts section
export const VIDEO_PODCASTS: VideoPodcast[] = [
  {
    id: 'vp1',
    title: 'Nuestra Relación con el Miedo',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756788879/el_miedo_como_se%C3%B1al_de_vida_yob06x.png',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756788223/Nuestra_relaci%C3%B3n_con_el_miedo_mp4_qpekkp.mp4',
    transcript: 'El miedo, esa sombra que nos sigue, que nos define. ¿Es un ancla o una brújula? A menudo lo vemos como un enemigo a vencer, una debilidad a ocultar. Pero, ¿y si fuera un lenguaje? El lenguaje primordial de la vida misma, una señal de que estamos al borde de algo nuevo, de algo que importa...'
  },
  {
    id: 'vp2',
    title: 'La Paradoja de Sísifo',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756788879/de_dios_del_alma_y_de_s%C3%ADsifo_o9z5vr.png',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756788223/La_paradoja_de_S%C3%ADsifo_mp4_kkmzqh.mp4',
    transcript: 'Hablemos de Sísifo. Condenado a empujar una roca eternamente. Un símbolo del absurdo, de la lucha sin sentido. Pero Camus nos invita a imaginar a un Sísifo feliz. Feliz no por la meta, que es inalcanzable, sino por la lucha misma. En el esfuerzo, en la tensión del músculo, en la roca que se domina por un instante... ahí reside una forma extraña de libertad. Quizás nuestra existencia es eso: encontrar la dignidad en el esfuerzo, sin esperar una cima definitiva.'
  },
  {
    id: 'vp3',
    title: '¿Vale la pena la felicidad?',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1755904538/musica_propia_zadotn.png',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756716939/vale_la_pena_la_felicidad_lryhcf.mp4',
    transcript: 'Este episodio del podcast "El Nexo Digital" profundiza en una crítica a la concepción contemporánea de la felicidad, presentándola no como un estado natural, sino como un constructo de la sociedad de consumo. El locutor argumenta que la felicidad se ha mercantilizado, siendo promovida a través de la publicidad y las redes sociales como un producto que se puede adquirir, generando una búsqueda incesante y, a menudo, frustrante. Además, se introduce la idea de que las emociones negativas son una parte inevitable y necesaria de la vida, y que el intento de suprimirlas puede ser contraproducente.'
  },
  {
    id: 'vp4',
    title: 'El pecado de ser positivo.',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1755904538/musica_propia_zadotn.png',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756716797/pecado_de_positivo_enqsru.mp4',
    transcript: 'Este pódcast explora la dualidad entre el optimismo inspirador y el pragmatismo necesario para alcanzar metas. A través de la definición de "mantra" y la presentación de la canción "What\'s Up?", se introduce la idea de la lucha interna y la búsqueda de sentido. El locutor se dirige a los "soñadores de vocación", aquellos que se aferran a la positividad y a la autoayuda, presentándoles con un toque de ironía libros de éxito personal como "El Alquimista". Sin embargo, el núcleo del mensaje es un llamado a la acción: la fe y los sueños son valiosos, pero inútiles sin el trabajo duro y el "sentido común". El pódcast concluye con una fusión musical que simboliza la unión de lo antiguo y lo moderno, sugiriendo que la verdadera sabiduría reside en equilibrar la inspiración con la ejecución.'
  },
  {
    id: 'vp5',
    title: 'El colectivo, virus de la mediocridad',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1755904538/musica_propia_zadotn.png',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756714528/el_colectivo_h0vlp5.mp4',
    transcript: 'Este podcast es una crítica contundente al conformismo social y a la pérdida de la individualidad en la era moderna, un fenómeno que el locutor denomina "el virus de la mediocridad encubierta". Se argumenta que la sociedad, especialmente a través de las redes sociales, nos presiona para encajar en un molde colectivo, donde la validación externa (como los "me gusta") reemplaza la autenticidad. Basándose en el experimento de conformidad de Asch, el podcast sostiene que nuestro miedo a la soledad y al rechazo nos lleva a sacrificar el pensamiento crítico y la creatividad individual. El colectivo, lejos de ser un refugio, se convierte en un "campo de concentración intelectual" que disfraza la mediocridad de unidad. El mensaje final es un llamado a la rebelión del pensamiento individual: a romper las cadenas del conformismo y a abrazar la diferencia como la verdadera esencia de la humanidad y la libertad.'
  },
  {
    id: 'vp6',
    title: 'El sesgo cognitivo en los sueños',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756774912/pexels-nahlamahgoub-12567771_fndbwz.jpg',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756716775/sesgo_cognitivo_en_los_suenos_tuyj6e.mp4',
    transcript: 'Se introduce el concepto de "inercia cognitiva" y "sesgo de confirmación" para explicar por qué seguimos estos caminos preestablecidos sin cuestionarlos. El episodio propone un cambio de enfoque: en lugar de buscar la realización en lo material y externo, sugiere una introspección para descubrir una meta espiritual y auténtica. Esta búsqueda interna se presenta como un camino hacia una existencia más sabia y humana, un proceso de despojarse de lo superfluo para encontrar la "esencia" de uno mismo.'
  },
  {
    id: 'vp7',
    title: 'Persistencia',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756774912/pexels-nahlamahgoub-12567771_fndbwz.jpg',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756714508/persistencia_xdkmtb.mp4',
    transcript: 'Este podcast es una meditación poética sobre la naturaleza cruda de la persistencia. Despoja al acto de "seguir adelante" del glamour de la motivación o la inspiración, presentándolo como un instinto fundamental de resistencia, casi mecánico. El locutor explora la idea de que la vida es una búsqueda constante, a menudo sin un objetivo claro, donde el valor no reside en el logro final, sino en el simple acto de continuar a pesar del cansancio, el miedo y la duda. La persistencia se redefine como una forma de fe secular, un "como si" que nos mantiene en movimiento para evitar el "silencio total" de la rendición.'
  },
  {
    id: 'vp8',
    title: 'Persigue tus sueños!!',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1755904538/musica_propia_zadotn.png',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756716712/persigue_tus_suenos_zvkqiv.mp4',
    transcript: 'Este episodio del podcast "El Nexo Digital" se sumerge en una reflexión crítica sobre el concepto de "perseguir los sueños" en la sociedad contemporánea. El locutor argumenta que la presión social y la cultura de la inmediatez a menudo nos llevan a adoptar metas que no son auténticas, lo que puede conducir a la insatisfacción a largo plazo. A través de un análisis que combina la psicología y la sociología, el podcast explora la tensión entre los deseos individuales y las expectativas externas, sugiriendo que la verdadera realización personal se encuentra en un camino de introspección y en la definición de un propósito genuino, más allá de los "espejismos" que nos presenta el mundo moderno.'
  },
  {
    id: 'vp9',
    title: 'Simplificar.. es INVOLUTIVO',
    coverUrl: 'https://res.cloudinary.com/ddmj6zevz/image/upload/v1756774912/pexels-nahlamahgoub-12567771_fndbwz.jpg',
    videoUrl: 'https://res.cloudinary.com/ddmj6zevz/video/upload/v1756715180/040225_simplificar_es_involutivo_j81nvg.mp4',
    transcript: 'El podcast presenta una crítica a la simplificación del lenguaje en la era digital, argumentando que la inmediatez y la "cultura de la reacción" están erosionando la reflexión crítica y la profundidad comunicativa. Citando a sociólogos como Evgeny Morozov y Manuel Castells, el locutor describe una involución donde abreviaciones y emojis reemplazan pensamientos complejos. Luego, el episodio transita hacia el análisis de la canción "Jungle" de Tash Sultana, presentándola como una metáfora de la exploración de la "jungla interna", un espacio de superación personal, libertad y lucha contra los miedos propios.'
  }
];

// Audio stingers have been updated with the user's provided list.
export const AUDIO_STINGERS: string[] = [
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756595448/16_zdos44.mp3',
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756595446/15_k7vkvj.mp3',
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756595446/14_l416pu.mp3',
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756595445/13_deaxsh.mp3',
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756595445/12_i4nikk.mp3',
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756595445/8_igjm87.mp3',
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756595445/7_syaunh.mp3',
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756595445/10_gu8r0y.mp3',
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756595445/11_js74po.mp3',
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756595444/3_sxj48g.mp3',
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756595444/5_rgarth.mp3',
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756595444/4_secta1.mp3',
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756595444/6_aodzxg.mp3',
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756595444/1_ebuxxi.mp3',
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756595444/2_m5meaa.mp3',
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756596319/6_vgib96.mp3',
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756596319/5_adspov.mp3',
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756596318/1_nghc1y.mp3',
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756596318/3_m4xv5e.mp3',
  'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756596318/2_f8szz9.mp3',
];

const generatePopupSchedule = (): PopupContent[] => {
  const schedule: PopupContent[] = [];
  const newsPopupBase: Omit<PopupContent, 'time'> = {
    type: 'news',
    title: "Vienen las Noticias",
    text: "Un momento por favor...",
    videoUrl: "https://res.cloudinary.com/ddmj6zevz/video/upload/v1756612883/Vienen_las_Noticias_ujmv2i.mp4",
    videoAspectRatio: '1080/330',
  };

  // Morning schedule: 7 AM to 12 PM, every 30 minutes
  for (let hour = 7; hour < 12; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
        const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        schedule.push({ ...newsPopupBase, time });
    }
  }

  // Afternoon schedule: 12 PM to 5 PM, every 90 minutes
  let afternoonTime = new Date();
  afternoonTime.setHours(12, 0, 0, 0);
  while(afternoonTime.getHours() < 17) {
    const time = `${String(afternoonTime.getHours()).padStart(2, '0')}:${String(afternoonTime.getMinutes()).padStart(2, '0')}`;
    if (!schedule.some(p => p.time === time)) {
        schedule.push({ ...newsPopupBase, time });
    }
    afternoonTime.setMinutes(afternoonTime.getMinutes() + 90);
  }
  
    // Add static popups
  schedule.push(
    {
      time: "16:30", // This might overlap with a news popup, but we'll add it. The check logic will show the first match for the minute.
      type: 'static',
      title: "Prueba de Video con Audio",
      text: "Este es el popup para que pruebes tu video. La radio debería pausarse cuando aparece y reanudarse cuando lo cierras.",
      videoUrl: "https://res.cloudinary.com/ddmj6zevz/video/upload/v1756355792/NOTICIAS_he4dnu.mp4", 
    },
    {
      time: "21:15",
      type: 'static',
      title: "Mensaje de Audio",
      text: "Una reflexión para terminar el día. Sube el volumen y escucha este mensaje especial.",
      audioUrl: 'https://res.cloudinary.com/dgvkbrgre/video/upload/v1756595444/3_sxj48g.mp3',
      imageUrl: "https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    }
  );

  return schedule.sort((a, b) => a.time.localeCompare(b.time));
};

export const POPUP_SCHEDULE: PopupContent[] = generatePopupSchedule();