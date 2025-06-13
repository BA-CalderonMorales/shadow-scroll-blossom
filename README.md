# Shadow Scroll Blossom

This project is my personal playground for generative art. It renders colorful particle trails that react to your mouse or touch input and lets you switch between multiple background themes. The repository also serves as a template for anyone wanting to build a similar interactive canvas site.

<details>
<summary><strong>Using This Repository as a Template</strong></summary>

1. Fork or clone the repo.
2. Update the project name in `package.json` and adjust this README with your own description.
3. Modify the canvas logic in `src` to experiment with your own particle effects.
4. Push your changes to `main` to deploy automatically with GitHub Pages.

</details>

<details>
<summary><strong>Getting Started</strong></summary>

1. Run `npm install`.
2. Launch the dev server with `npm run dev` and open `http://localhost:8080`.
3. Build for production with `npm run build`.
4. Optionally run the SuperCollider script in `audio/generate_audio.scd` to create custom tracks.
5. Place the generated `ambient.mp3`, `upbeat.mp3`, and `chill.mp3` files in `public/audio`.

</details>

<details>
<summary><strong>Project Structure</strong></summary>

```
src/
  components/        React components for the canvas and UI
  contexts/          global settings state
  data/              static options for menus
  hooks/             reusable hooks
  pages/             route components
  utils/             canvas and particle helpers
  types/             TypeScript interfaces
```

</details>

<details>
<summary><strong>Key Features</strong></summary>

- Mouse and touch interaction on the canvas
- Multiple particle styles and background themes
- Dark mode toggle with persistence
- Settings stored in localStorage
- Optional audio tracks generated with SuperCollider (files not included)

</details>

<details>
<summary><strong>Editing the Code</strong></summary>

Edit directly on [Lovable](https://lovable.dev/projects/37feecad-ffa4-4ddb-a957-b38a5b8fc776) or work locally using your favorite editor. Make sure Node.js is installed via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

</details>

<details>
<summary><strong>Technology Overview</strong></summary>

This project uses Vite, React, TypeScript, Tailwind CSS and shadcn-ui.

</details>

<details>
<summary><strong>Deployment</strong></summary>

Pushes to `main` automatically deploy to **GitHub Pages** via GitHub Actions. Enable Pages in the repository settings with "GitHub Actions" as the source. Once enabled, your site will be live at [`https://ba-calderonmorales.github.io/shadow-scroll-blossom/`](https://ba-calderonmorales.github.io/shadow-scroll-blossom/).

GitHub Pages must be enabled for the pull request previews to work correctly.

</details>

<details>
<summary><strong>Previewing Pull Requests</strong></summary>

Every pull request triggers a workflow that builds the site and publishes a free GitHub Pages preview. A link to the preview is posted as a comment on the PR so you can test changes before merging.

</details>

