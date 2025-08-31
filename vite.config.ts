import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // This function makes environment variables available to the client-side code.
  // Vercel automatically provides environment variables during the build process.
  
  // We are telling Vite to create a global process.env object in the final code,
  // and to replace process.env.KEY_VITE_KEY with the actual secret value from Vercel.
  // JSON.stringify is crucial to ensure the value is correctly formatted as a string.

  return {
    plugins: [react()],
    define: {
      'process.env.KEY_VITE_KEY': JSON.stringify(process.env.KEY_VITE_KEY),
    },
  };
});
