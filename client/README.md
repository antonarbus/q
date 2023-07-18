# Feature-Sliced Design (FSD) for front-end applications
https://feature-sliced.design/docs/get-started/overview

In FSD, a project consists of *layers*, *slices* and *segments*.

![FSD diagram](./fsd.png)

## Layers

*Layers* are vertically arranged. ❗️Code on one *layer* can only interact with code from the *layers* below.

### 1. `shared/`
  Reusable functionality, detached from the business (e.g. UIKit, libs, API). ❗️No business logic here.
### 2. `entities/`
  Elements which have a business value (e.g. BlogPost, User, Order, Product). Can be a components with slots for content/interactive elements.

  Should contain the logic to describe how *entity* looks and behaves (static UI elements, data stores, CRUD operations, states, reducers, selectors, mappers). 
  
  *Entity* can paly a role in different scenarios by applying different *features* on top of it (e.g. the User *entity* with different *features* can show a contact card or get a personal ad or be granted access etc...) 
### 3. `features/` 
  Actions that a user (or application) apply on top of a business *entity* to achieve a valuable outcome (create-blog-post, login-by-oauth, edit-account, publish-video).  
  
  Can contain interactive UI elements, internal state and API calls that enable value-producing actions.
### 4. `widgets/` 
  Compositional *layer* to combine *entities* + *features* (+ *shared*) into meaningful assembled blocks with content and interactive buttons wired to the api calls (e.g. PostCard, IssuesList, UserProfile).  

  This *layer* provides a way to fill in the slots left in the UI of *Entities* with other *Entities* and interactive elements from *Features*. ❗️In most cases almost no business logic here.  

  ❗️It might be hard to decide what goes into *Entities* and *Features*. Do not worry. Just put all logic into *Widgets* layer. You will feel later if it should be split into *Entities* and *Features*.
### 5. `pages/` 
  Compositional layer to construct full pages or views from *entities*, *features* and *widgets* (e.g. route components for each page/slot). ❗️No business and minimum other logic here.
### 6. `app/` 
  App-wide settings, (e.g. styles, providers, router, store...).

https://feature-sliced.design/docs/reference/layers

## Slices
  - A *layer* can be divided into business oriented *slices* to keep related code together (e.g. post,add-user-to-friends, news-feed...)
  - `Shared` and `App` *layers* never have *slices* (they do not have business logic inside).
  - ❗️*Slices* cannot use other *slices* on the same *layer*.
  - ❗️*Slices* (and *segments* without *slices*) must contain the `index.ts` entry points (public API) with module re-exports. Code outside should not reference internal *slice* file structure, but public API only.

## Segments
  A *slice* consists of *segments* to separate code by its technical nature, common *segments*, ❗️but not necessarily are:
  1. `ui/` ui-logic, components
  2. `model/` business logic, store, actions, selectors
  3. `lib/` utils, helpers, hooks
  4. `api/` communication with external APIs, backend API methods