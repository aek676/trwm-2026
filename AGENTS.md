# AGENTS.md - Developer Guide for TRWM-2026

## Project Overview

TRWM-2026 is a Bun/Elysia TypeScript web server project with server-side rendering. It uses:

- **Runtime:** Bun (latest)
- **Framework:** Elysia (REST API framework)
- **JSX Runtime:** @elysiajs/html (Elysia HTML plugin wrapping @kitajs/html for high-performance HTML string generation)
- **Language:** TypeScript with strict mode
- **Module System:** ES2022 (`module` field in tsconfig; `target` is ES2021)
- **Frontend:** Server-side rendered HTML with Bootstrap
- **Architecture:** Clustered server setup for production

## Commands

### Development

```bash
bun run dev
```

Starts the server in watch mode with hot reload (`--watch` on `src/server.tsx`). Runs **single-process** (no clustering). Accessible at <http://localhost:3000>

### Production

```bash
bun run start
```

Runs the compiled server from dist/server (use after building)

### Build

```bash
bun run build
```

Compiles the application for production with minification and bundling, outputting to dist/server

### Type Checking

```bash
bun check 
```

Runs TypeScript type checking without emitting files. The project has strict mode enabled.

### Linting

```bash
bun run lint 
```

Runs Biome linter with recommended rules and custom formatting (tabs, double quotes)

## Code Style Guidelines

### TypeScript Configuration

The project uses strict TypeScript mode. All code must:

- Have explicit type annotations for function parameters and return types
- Avoid `any` type - use `unknown` if type is truly unknown
- Handle null/undefined explicitly (strictNullChecks enabled)

### Import Conventions

```typescript
// Standard imports
import { Elysia } from "elysia"
import type { SomeType } from "./types"

// Group imports: external first, then internal
// Order: framework → third-party → internal types → local
```

### Naming Conventions

**Files:**

- Use kebab-case: `location-controller.ts`, `user-service.ts`
- Controllers: `*-controller.ts`
- Views: `*.tsx` for JSX components
- Routes: `index.tsx` for route definitions

**Functions:**

- Use camelCase: `getUserById`, `fetchLocationData`
- Prefix async operations with action verb: `fetch*`, `load*`, `get*`

**Variables:**

- Use camelCase: `userId`, `isActive`, `locationList`
- Boolean prefixes: `is*`, `has*`, `can*`, `should*`

**Constants:**

- Use UPPER_SNAKE_CASE for config constants
- Use camelCase for object constants

### Type Definitions

Always define explicit types for:

```typescript
// Function parameters and returns
function getUser(id: string): User | null {
  // ...
}

// Interface definitions
interface Location {
  id: string
  name: string
  coordinates: {
    lat: number
    lng: number
  }
}

// Generic types
type Result<T> = { success: true; data: T } | { success: false; error: string }
```

### JSX with @elysiajs/html

Use JSX for server-side rendered HTML:

```tsx
// Basic JSX component
export function HomeView({ title }: { title: string }) {
  return (
    <Layout title={title}>
      <div class="container">
        <h1>{title}</h1>
        <p>Bienvenido a {title}</p>
      </div>
    </Layout>
  )
}
```

**XSS Protection:**

- Use `safe` attribute for user input: `<div safe>{userInput}</div>`
- All attributes are auto-escaped except when using `safe`

### Error Handling

Use Elysia's error handling with custom JSX views:

```typescript
import { Elysia, error } from "elysia"

const app = new Elysia()
  .onError(({ code, error: err }) => {
    if (code === 'NOT_FOUND') {
      return <ErrorView message="Not Found" status={404} />
    }
    return <ErrorView message={err.message} status={500} />
  })
```

For async operations, use try-catch with proper typing:

```typescript
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
├── index.ts              # Main entry point with clustering (production)
├── server.tsx            # Elysia app setup with plugins (dev entry point)
├── controllers/         # Request handlers
│   ├── index.ts         # Barrel re-exports
│   ├── location.ts
│   ├── users.ts
│   └── others.ts
├── routes/              # Route definitions
│   └── index.tsx
├── views/               # JSX view components
│   ├── index.tsx        # Barrel re-exports
│   ├── Layout.tsx
│   ├── HomeView.tsx
│   └── ErrorView.tsx
└── public/              # Static assets
    └── stylesheets/
        └── style.css
```

## Best Practices

1. **Always use type annotations** - No implicit any
2. **Handle errors explicitly** - Never let errors propagate silently
3. **Use async/await** - Prefer over raw promises
4. **Return typed responses** - Define response interfaces
5. **Keep functions small** - Single responsibility principle
6. **Use const over let** - Avoid mutable variables when possible
7. **Destructure objects** - When accessing multiple properties
8. **Use `safe` attribute** - For all user-generated content to prevent XSS
9. **Server-side rendering** - Use JSX components for HTML generation
10. **Bootstrap integration** - Leverage Bootstrap classes in views

## Linting & Formatting

Uses Biome for fast linting and formatting:

- **Configuration**: `biome.json` with tabs and double quotes
- **Rules**: Recommended rules enabled
- **Formatter**: Tab indentation, double quotes for strings
- **Command**: `bun run check` to run linting

Biome config:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.4.5/schema.json",
  "vcs": {
    "enabled": true,
    "clientKind": "git",
    "useIgnoreFile": true
  },
  "files": {
    "ignoreUnknown": false,
    "includes": ["src/**"]
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "tab"
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "double"
    }
  },
  "assist": {
    "enabled": true,
    "actions": {
      "source": {
        "organizeImports": "on"
      }
    }
  }
}
```

## Deployment

### Clustering

The app uses Node.js clustering for production:

- `index.ts` spawns workers based on available CPU cores
- Each worker runs the Elysia server instance
- Improves performance and reliability

### Production Build

- Run `bun run build` to create optimized bundle
- Output: `dist/server` executable
- Includes minification and syntax optimization
- Use `NODE_ENV=production` for production runtime

## Common Patterns

**Route Definition:**

```typescript
const app = new Elysia()
  .get("/", ({ html }) => html(<HomeView title="Welcome" />))
  .get("/location", () => <HomeView title="Location Info" />)
```

**Validation:**

```typescript
import { t } from "elysia"

const locationSchema = t.Object({
  name: t.String(),
  lat: t.Number(),
  lng: t.Number()
})
```

**Static Assets:**

```typescript
import { staticPlugin } from "@elysiajs/static"

app.use(staticPlugin({
  assets: "./src/public",
  prefix: "/"
}))
```

## Notes

- This is a server-side rendered application using JSX for HTML generation
- @elysiajs/html wraps @kitajs/html providing high-performance JSX-to-string compilation
- Bootstrap is included via CDN for styling
- No tests currently configured (use `bun test` when adding tests)
- Run linting before commits: `bun run check`</content>
<parameter name="filePath">/home/anass/workspaces/TRWM-2026/AGENTS.md

