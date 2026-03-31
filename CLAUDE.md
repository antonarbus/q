# Claude Code Instructions

After making any code changes, always run `mcp__ide__getDiagnostics` on the modified file to check for linter/type errors before finishing.

## Project

Full-stack quotation management app. React frontend + Express + Bun backend. Neon (serverless Postgres) via Drizzle ORM. Google Cloud Storage for document content. Deployed to GCP Cloud Run.

## Structure

Follows [Feature-Sliced Design](https://feature-sliced.design/) on both frontend and backend.

```
front/
  app/       # Bootstrap (router, store, global styles)
  page/      # Route-level pages
  widget/    # Composite UI sections
  feature/   # User interactions
  entity/    # Business entities
  shared/    # Reusable UI, utils, libs (no business logic)

back/
  api/       # Route handlers
  entity/    # DB models / data access
  shared/    # Shared utils, error handling, constants
```

## FSD: Cross-Layer Singleton Pattern

FSD forbids `shared/` from importing higher layers. But infrastructure singletons (router, Redux store, axios) are created in `app/` and need to be accessed from anywhere.

**Solution: holder + side-effect import + module augmentation**

Each singleton lives in `shared/` as a class with a getter/setter. `app/` creates the concrete instance and injects it into the holder via side-effect imports at the top of `App.tsx`.

```ts
// shared/ — holder with getter/setter
export const reduxHolder = new ReduxHolder()
export const routerHolder = new RouterHolder()
export const instance = new Instance() // queryClient, navStructure, etc.

// app/ — creates and injects (import order matters)
import './router'      // creates router, sets routerHolder.router
import './redux'       // creates store, sets reduxHolder.store
import './axiosConfig' // creates axios instance
```

Redux types (`RootState`, `AppDispatch`) flow from `app/` to `shared/` via module augmentation on an empty `Register` interface in `shared/lib/redux/register.ts` — `shared/` never imports `app/`.

**Usage from any layer:**
```ts
import { reduxHolder }  from '@front/shared/lib/redux'
import { routerHolder } from '@front/shared/lib/react-router-dom/router'
import { instance }     from '@front/shared/instance'

reduxHolder.dispatch(someAction())
reduxHolder.getState().user.accessToken
reduxHolder.useSelector(selectSomething)
routerHolder.router.navigate('/path')
instance.queryClient.invalidateQueries({ queryKey: [...] })
```
