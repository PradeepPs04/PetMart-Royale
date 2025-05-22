import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dotenv from 'dotenv';
dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
   define: {
    "process.env.REACT_APP_BASE_URL": JSON.stringify(process.env.VITE_REACT_APP_BASE_URL),
    "process.env.RAZORPAY_KEY": JSON.stringify(process.env.VITE_REACT_APP_RAZORPAY_KEY),
  }
})
