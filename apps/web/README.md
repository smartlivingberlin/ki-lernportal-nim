# KI-Lernportal NIM — Web Frontend

This is the Next.js frontend for the KI-Lernportal NIM.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Package Manager:** pnpm

## Getting Started

### Local Development

1. Install dependencies from the root directory:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm --filter web dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

### Verification Commands

To ensure the project is buildable and follows linting rules:

```bash
# Build the project
pnpm --filter web build

# Run lint checks
pnpm --filter web lint
```

## Folder Structure

- `src/app`: Next.js App Router pages and layouts.
- `_prototype`: Original static HTML prototype (for reference).
- `public`: Static assets.
