# Shadow Scroll Blossom

An interactive canvas experiment where you can create colorful particle trails and switch between background themes.

<details>
<summary><strong>Getting Started</strong></summary>

1. Clone the repository.
2. Run `npm install`.
3. Launch the dev server with `npm run dev` and open `http://localhost:8080`.

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

- Mouse and touch tracking on the canvas
- Multiple particle styles and background themes
- Dark mode toggle with persistence
- Settings stored in localStorage

</details>

<details>
<summary><strong>Editing the Code</strong></summary>

Edit directly on [Lovable](https://lovable.dev/projects/37feecad-ffa4-4ddb-a957-b38a5b8fc776) or work locally using your favorite editor. Make sure Node.js is installed via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

</details>

<details>
<summary><strong>Technology Overview</strong></summary>

This project uses Vite, React, TypeScript, Tailwind CSS, and shadcn-ui.

</details>

<details>
<summary><strong>Deployment</strong></summary>

Use the Share → Publish option on Lovable to deploy your site. Custom domains can be configured in Project → Settings → Domains.

Pushes to `main` automatically deploy to **GitHub Pages** via GitHub Actions. Enable Pages in the repository settings with "GitHub Actions" as the source. Once enabled, your site will be live at [`https://ba-calderonmorales.github.io/shadow-scroll-blossom/`](https://ba-calderonmorales.github.io/shadow-scroll-blossom/).

GitHub Pages must be enabled for the pull request previews to work correctly.

</details>


<details>
<summary><strong>Previewing Pull Requests</strong></summary>

Every pull request triggers a workflow that builds the site and publishes a free GitHub Pages preview. A link to the preview is posted as a comment on the PR so you can test changes before merging.

</details>

