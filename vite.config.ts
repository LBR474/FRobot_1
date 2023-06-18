import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/FRobot_1",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
