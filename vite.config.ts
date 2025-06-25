
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Set the base path depending on the deployment target. When deploying to
  // GitHub Pages we use the repository name as the base. All other environments
  // (local dev and Lovable previews) should use the root path.
  const base = process.env.VITE_DEPLOY_TARGET === 'github'
    ? '/shadow-scroll-blossom/'
    : '/';

  return {
    base,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
