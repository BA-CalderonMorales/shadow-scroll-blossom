
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Determine base URL based on deployment target
  let base = '/';
  
  if (mode === 'production') {
    // Check if we're building for GitHub Pages
    // This can be determined by environment variable or other means
    const isGitHubPages = process.env.GITHUB_PAGES === 'true' || process.env.CI === 'true';
    base = isGitHubPages ? '/shadow-scroll-blossom/' : '/';
  }

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
