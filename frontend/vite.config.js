import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Charger les variables d'environnement
  const env = loadEnv(mode, process.cwd(), "VITE_");
  console.log("Loaded VITE env:", env); // pour vérifier que la clé est bien lue

  return {
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8000",
          secure: false,
        },
      },
    },
    plugins: [react()],
    define: {
      // expose les variables au client si import.meta.env ne marche pas
      "process.env": env,
    },
  };
});
