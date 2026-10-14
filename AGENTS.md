# Project constraints

This project is a static one-page website.

## Allowed files
- `index.html`
- `style.css`
- `script.js`

## Rules
- No dependencies, package managers, or CDN resources.
- No build step, bundler, or generated assets.
- No accounts, deployments, or external services.
- Keep all work inside this project directory.
- Serve only on localhost during development.
- Do not commit, push, install, or deploy without explicit instruction.
- Keep markup semantic, CSS readable, and JavaScript small.
- The page must remain usable at narrow and wide widths and fully operable by keyboard.

## Interaction
- Project filtering by tag is the primary UI interaction.
- Filter buttons use `aria-pressed` and the card list uses `aria-live="polite"`.
- The status text is announced for screen readers.
