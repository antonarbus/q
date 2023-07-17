Feature-Sliced Design (FSD) for front-end applications
https://feature-sliced.design/docs/get-started/overview

In FSD, a project consists of layers, each layer is made up of slices and each slice is made up of segments.

App consists from vertically arranged layers.
Modules on one layer can only interact with modules from the layers strictly below.

Layers:
1. app/ app-wide settings, (e.g. styles, providers, router, store...)
2. pages/ compositional layer to construct full pages from entities, features and widgets (e.g. route components for each page in the app, should have minimum logic)
3. widgets/ compositional layer to combine entities and features into meaningful blocks (e.g. "assembled" PostCard, IssuesList, UserProfile with content and interactive buttons wired to the api calls)
4. features/ actions on an entities that bring business value, interactivity logic for elements (.e.g. create-blog-post, login-by-oauth, edit-account, publish-video)
5. entities/ business related components with slots for content and the interactive elements (e.g. BlogPost, User, Order, Product)
6. shared/ reusable functionality, detached from the specifics of the business.(e.g. UIit, libs, API)

https://feature-sliced.design/docs/reference/layers

Slices:
A layer is divided into business domains with slices to keep related code close to each other (e.g. post, add-user-to-friends, news-feed...)
Shared and App layers don't contain slices.
Slices cannot use other slices on the same layer.

Segments:
A slice consists of segments to separate code within a slice.

Common segments are:
0. index.ts (re-exports)
1. ui/ (ui-logic, components)
2. model/ (business logic, store, actions)
3. api/
4. lib/ (utils, helpers, hooks)

https://feature-sliced.design/docs/reference/slices-segments#examples


Public apis:
Slice (and segment without slices) must contain the index.ts entrypoint with its public API 



