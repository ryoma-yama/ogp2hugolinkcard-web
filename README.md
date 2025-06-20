# ogp2hugolinkcard-web

**ogp2hugolinkcard-web** is the easiest way to generate Hugo link card shortcodes from any URL—right in your browser, with no setup required.

- 👉 **Try it instantly:** [https://ogp2hugolinkcard-web.ryomayama.com/](https://ogp2hugolinkcard-web.ryomayama.com/)

## What is this?

This is the web version of [ogp2hugolinkcard](https://github.com/ryoma-yama/ogp2hugolinkcard), a CLI tool for developers who want to self-host or automate the process.

- **No installation or deployment needed**—just open the hosted site and start generating link cards.
- **Want to self-host or customize?** You can deploy this project yourself to Cloudflare or any other platform.
- Prefer the CLI? See: [ogp2hugolinkcard](https://github.com/ryoma-yama/ogp2hugolinkcard)

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Running the Development Server

- To preview UI changes with hot reload (recommended for UI/component development):

  ```bash
  pnpm dev
  ```
  - Starts the Astro dev server at `http://localhost:4321`.
  - Only the frontend is available; API requests to the Worker will not work locally.

- To test the full stack (Astro + Cloudflare Worker API) locally:

  ```bash
  pnpm preview
  ```
  - Builds the site and starts both the static site and the Worker API using Wrangler.
  - Use this when you need to test API integration.

### 3. Build for Production

```bash
pnpm build
```
- Outputs the production build to the `./dist/` directory.

### 4. Deploy

```bash
pnpm deploy:app
```
- Builds and deploys the app and Worker to Cloudflare.

## Project Structure

```
/
├── public/         # Static assets
├── src/
│   ├── pages/      # Astro pages
│   └── styles/     # Global CSS
├── worker/         # Cloudflare Worker code
├── package.json
└── astro.config.mjs
```

## Coding Standards

- Lint: `pnpm lint` (if configured)
- Format: `pnpm format` (uses Biome)
- TypeScript recommended

## Notes

- Use `pnpm dev` for rapid UI development (hot reload, no API).
- Use `pnpm preview` to test with the Worker API locally.
- See [Astro documentation](https://docs.astro.build) for more details.

## License

This project is licensed under the [Apache License 2.0](./LICENSE).
