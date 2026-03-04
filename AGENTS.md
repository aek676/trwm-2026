# AGENTS.md - Developer Guide for TRWM-2026

## Project Overview

TRWM-2026 is a Bun/Elysia TypeScript web server project. It uses:
- **Runtime:** Bun (latest)
- **Framework:** Elysia (REST API framework)
- **Language:** TypeScript with strict mode
- **Module System:** ES2022

## Commands

### Development
```bash
bun run dev
```
Starts the server in watch mode with hot reload. Accessible at http://localhost:3000

### Production
```bash
bun run start
```
Runs the compiled server (if using bunx/elysia bundler)

### Type Checking
```bash
bun tsc --noEmit
```
Runs TypeScript type checking without emitting files. The project has strict mode enabled.

### Testing
```bash
bun test
```
Runs all tests. Currently no tests are configured.

To run a single test file:
```bash
bun test <path-to-test-file>
```

To run tests matching a pattern:
```bash
bun test --grep "test name pattern"
```

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
- Controllers: `*-controller.ts` or `*.controller.ts`
- Types/Interfaces: `*.type.ts` or `types/*.ts`

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

### Error Handling

Use Elysia's error handling patterns:
```typescript
import { Elysia, error } from "elysia"

const app = new Elysia()
  .onError(({ code, error: err }) => {
    if (code === 'NOT_FOUND') {
      return error(404, { message: "Resource not found" })
    }
    return error(500, { message: "Internal server error" })
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

### File Organization

```
src/
├── index.ts              # Main entry point
├── controllers/         # Request handlers
│   └── location.ts
├── services/            # Business logic
├── types/               # TypeScript interfaces
├── utils/               # Helper functions
└── middleware/          # Custom middleware
```

### Code Formatting

- Use single quotes for strings
- Always use semicolons
- Use 2 spaces for indentation
- Trailing commas in objects/arrays
- Maximum line length: 100 characters

### Best Practices

1. **Always use type annotations** - No implicit any
2. **Handle errors explicitly** - Never let errors propagate silently
3. **Use async/await** - Prefer over raw promises
4. **Return typed responses** - Define response interfaces
5. **Keep functions small** - Single responsibility principle
6. **Use const over let** - Avoid mutable variables when possible
7. **Destructure objects** - When accessing multiple properties

### Adding Tests

When adding tests, use Bun's built-in test runner:
```typescript
import { describe, it, expect } from "bun:test"

describe("Location Controller", () => {
  it("should fetch location data", () => {
    const result = fetchLocation("123")
    expect(result).toBeDefined()
  })
})
```

Test files should be placed alongside the files they test:
```
src/controllers/
├── location.ts
└── location.test.ts
```

### Common Patterns

**Route Definition:**
```typescript
const app = new Elysia()
  .get("/locations", getLocations)
  .post("/locations", createLocation)
  .get("/locations/:id", getLocationById)
  .put("/locations/:id", updateLocation)
  .delete("/locations/:id", deleteLocation)
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

## Notes

- This is a small project - simple structure is preferred over complex abstractions
- No linting/formatting tools currently configured - maintain consistent style manually
- No CI/CD pipeline - manual testing required before commits
