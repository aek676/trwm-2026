# AGENTS.md - Developer Guide for TRWM-2026

TRWM-2026 is a Bun/Elysia TypeScript web server with server-side rendering.

- **Runtime:** Bun | **Framework:** Elysia | **JSX:** @elysiajs/html
- **Language:** TypeScript (strict mode) | **Frontend:** SSR HTML + Bootstrap

## Commands

```bash
bun dev          # Development server with hot reload (http://localhost:3000)
bun run build    # Production build to dist/server
bun run start    # Run compiled server
bun check        # TypeScript type checking (tsc --noEmit)
bun lint         # Biome linter
```

## Code Style

### TypeScript

- Explicit type annotations for all parameters and returns
- Avoid `any` - use `unknown` if truly unknown
- Handle null/undefined explicitly

### Imports

```typescript
import { Elysia } from "elysia";
import type { SomeType } from "./types";
// Order: framework → third-party → internal types → local
```

### Naming

- Files: kebab-case (`location-controller.ts`, `*.tsx` for views)
- Functions: camelCase, prefix async with `fetch*`, `load*`, `get*`
- Variables: camelCase, booleans with `is*`, `has*`, `can*`, `should*`
- Constants: UPPER_SNAKE_CASE for config, camelCase for objects

### Types

```typescript
function getUser(id: string): User | null { ... }
interface Location { id: string; name: string; coordinates: { lat: number; lng: number } }
type Result<T> = { success: true; data: T } | { success: false; error: string }
```

### JSX with @elysiajs/html

```tsx
export function HomeView({ title }: { title: string }) {
  return (
    <Layout title={title}>
      <div class="container">
        <h1>{title}</h1>
      </div>
    </Layout>
  );
}
```

- Use `safe` attribute for user input: `<div safe>{userInput}</div>`

### Error Handling

```typescript
const app = new Elysia()
  .onError(({ code, error: err }) => {
    if (code === "NOT_FOUND") return <ErrorView message="Not Found" status={404} />
    return <ErrorView message={err.message} status={500} />
  })

async function fetchData(id: string): Promise<Result<Data>> {
  try {
    const data = await externalCall(id)
    return { success: true, data }
  } catch (err) {
    return { success: false, error: (err as Error).message }
  }
}
```

## File Organization

```
src/
├── index.ts            # Entry point with clustering (prod)
├── server.tsx          # Elysia app setup (dev)
├── controllers/        # Request handlers (*.ts)
├── routes/             # Route definitions (index.tsx)
├── views/              # JSX components (*.tsx)
└── public/             # Static assets
```

## Best Practices

1. Always use type annotations - no implicit any
2. Handle errors explicitly - never silent propagate
3. Use async/await over raw promises
4. Return typed responses
5. Keep functions small - single responsibility
6. Use `const` over `let`
7. Destructure objects
8. Use `safe` for user-generated content
9. Server-side render with JSX
10. Use Bootstrap classes in views

## Linting & Formatting

- **Config:** biome.json (tabs, double quotes)
- **Command:** `bun run lint` (Biome) + `bun check` (TypeScript)
- Run both before commits

## Common Patterns

```typescript
// Route
const app = new Elysia()
  .get("/", ({ html }) => html(<HomeView title="Welcome" />))

// Validation
import { t } from "elysia"
const locationSchema = t.Object({ name: t.String(), lat: t.Number(), lng: t.Number() })

// Static assets
app.use(staticPlugin({ assets: "./src/public", prefix: "/" }))
```

## Deployment

- Clustering: `index.ts` spawns workers per CPU core
- Build: `bun run build` → `dist/server` executable
- Run: `NODE_ENV=production bun run start`

## Notes

- SSR using @elysiajs/html (wraps @kitajs/html)
- Bootstrap via CDN
