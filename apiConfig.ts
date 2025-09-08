// ADVERTENCIA DE SEGURIDAD: Exponer claves de API en el código del cliente es muy arriesgado.
// Este archivo ahora lee las variables de entorno, que es la forma estándar
// y segura de manejar secretos en entornos como Vercel.
// Asegúrate de que tus variables de entorno en Vercel se llamen:
// VITE_GEMINI_API_KEY, VITE_OPENWEATHER_API_KEY, VITE_ELEVENLABS_API_KEY, VITE_OPENAI_API_KEY

export const API_KEYS = {
  gemini: process.env.VITE_GEMINI_API_KEY || '',
  openWeather: process.env.VITE_OPENWEATHER_API_KEY || '',
  elevenLabs: process.env.VITE_ELEVENLABS_API_KEY || '',
  openAI: process.env.VITE_OPENAI_API_KEY || '',
};
