# Feature-Sliced Design (FSD) for front-end applications

https://feature-sliced.design/docs/get-started/overview

In FSD, a project consists of _layers_, _slices_ and _segments_.

![FSD diagram](./fsd.png)

## Layers

_Layers_ are vertically arranged. ❗️Code on one _layer_ can only interact with code from the _layers_ below.

### 1. `shared/`

Reusable functionality, detached from the business (e.g. UIKit, libs, API). ❗️No business logic here.

### 2. `entities/`

Elements which have a business value (e.g. BlogPost, User, Order, Product). Can be a components with slots for content/interactive elements.

Should contain the logic to describe how _entity_ looks and behaves (e.g. static UI elements, data stores, CRUD operations, reducers, selectors, mappers).

### 3. `features/`

_Entity_ can act differently depending on _features_ we apply on top of it (e.g. the User _entity_ with different _features_ can show a contact card or get a personal ad or be granted access etc...).

_Feature_ is an action on _entity_ to achieve a valuable outcome (e.g. create-blog-post, login-by-auth, edit-account, publish-video).

Can contain interactive UI elements, internal state and API calls that enable value-producing actions.

### 4. `widgets/`

Compositional _layer_ to combine lower-level units from _entities_ + _features_ into meaningful assembled blocks with content and interactive buttons wired to the api calls (e.g. PostCard, IssuesList, UserProfile).

In this _layer_ we fill slots left in the UI of _Entities_ with other _Entities_ and interactive elements from _Features_.

Usually non-business logic come here (e.g. gestures, keyboard interaction, etc). For reach widgets business logic is permitted.

❗️It might be hard to decide what goes into _Entities_ and _Features_. Do not worry. Just put all logic into _Widgets_ layer. You will feel later if it should be split into _Entities_ and _Features_.

### 5. `pages/`

Compositional layer to construct full pages or views from _entities_, _features_ and _widgets_ (e.g. route components for each page/slot). ❗️No business and minimum other logic here.

### 6. `app/`

App-wide settings, (e.g. styles, providers, router, store).

https://feature-sliced.design/docs/reference/layers

## Slices

A _layer_ can be divided into business oriented _slices_ to keep related code together (e.g. post, add-user-to-friends, news-feed...)

1. `Shared` and `App` _layers_ never have _slices_ (they do not have business logic inside).
2. ❗️*Slices* cannot use other _slices_ on the same _layer_.
3. Closely related slices can be grouped in a directory, but they still should follow rule above.
4. ❗️*Slices* (and _segments_ without _slices_) must contain the `index.ts` entry points (public API) with module re-exports. Code outside should not reference internal _slice_ file structure, but public API only.

## Segments

A _slice_ consists of _segments_ to separate code by its technical nature, common _segments_, ❗️but not necessarily are:

1. `ui/` ui-logic, components
2. `model/` business logic, store, actions, selectors
3. `lib/` utils, helpers, hooks
4. `api/` communication with external APIs, backend API methods

# Auth

Authorization - checking if password is correct
Authentication - checking if a user is the same as authorized initially

(A) The client is authorized by comparing email and
password's hash with secrete sault against database.

(B) On successful authorization the server issues an 'access'
and a 'refresh' tokens for future user authentication to avoid
asking for credentials on every http request.

(C) Client stores 'access' token locally in memory and
attaches it inside request headers for private api requests.
Token is attached by 'request' interceptor in 'axiosWithAuth'.
If we do a request to a protected endpoint we just use axiosWithAuth
instance to avoid attaching token manually.

(D) For protected apis the 'verifyToken' express middleware verifies an 'access' token.
If the token is ok, the request goes forward. If the token is bad
(compromised or outdated) a response of status 401 is returned.

(E) 'Access' token expires in 15 min.
'Response' interceptor in 'axiosWithAuth' checks for 401 status and
if it is the 401, it makes additional request to update 'access' token by
presenting a 'refresh' token in cookies, which has 30d expiry time.

(F) 'Refresh' token is saved on server in secured cookies on the login 
and on tokens refresh. Token is also kept in database. 
If the 'refresh' token is valid and available in database, then 
updated 'access' and updated 'refresh' tokens are issued.

(G) 'axiosWithAuth' remembers initial request with all parameters when it
got 401 error and after getting successful refreshed tokens it repeats
initial http request.

(H) If 'refresh' token is invalid or old, then 'access' token is not
issued, client is considered as unauthorized and new login action
is required.

(I) If a user is deleted from the database, he is still authorized
for short time until 'access' token is expired (15 min).
We should consider the duration of access token depending on
sensitivity of our data.

(J) Tokens are also checked and refreshed at the initial app
load in useEffect() on <Main /> component mount. That's how we determine
if a known client returned back and avoid prompting for credentials
on a page refresh.

(K) For tokens we use JWT tokens, which contain encrypted (not hashed)
payload (usually object with user email, role, etc...), validation time
and a hash based on a secret keys, which are kept on a server.
Server can validate the token only if it knows the secrete keys.
Secrete keys are kept in environment variables.

