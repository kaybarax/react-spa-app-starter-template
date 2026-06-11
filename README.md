# React SPA Web App Starter, Template Framework

Get up and running quickly, with building your React JS SPA web application.

#### All batteries included like Angular — global state manager ([Zustand](https://github.com/pmndrs/zustand)) hooked to localStorage for seamless persistence of component data stores and offline facility; sound routing and navigation logic built on top of [React Router](https://reactrouter.com/); secured routes with a built-in auth guard; and [TanStack Query](https://tanstack.com/query/latest) pre-wired for the day a server comes into play.

## The stack

| Concern               | Powered by                                                  |
| --------------------- | ----------------------------------------------------------- |
| UI library            | React 19                                                     |
| Build / dev tooling   | Vite 8 (TypeScript 6, ESLint 10, Prettier)                   |
| Global state          | Zustand 5, persisted to localStorage                         |
| Routing & navigation  | React Router 7, wrapped in the template's navigation logic   |
| Server data (optional)| TanStack Query 5 — provider mounted, demo page included      |
| Styling               | Bulma 1 + Sass                                               |
| Unit testing          | Vitest 4 + Testing Library (managed by Vite)                 |
| E2E testing           | Playwright                                                   |
| Local "backend"       | IndexedDB (sign up / login demo) — no server required        |

> Getting up and running:
>
* `$ git clone <this repo>`
* `$ yarn install | npm install`
* `$ yarn dev | npm run dev`
* Open the application at http://localhost:3000
>

And you are good to go!

### Scripts

| Script               | What it does                                  |
| -------------------- | --------------------------------------------- |
| `yarn dev`           | Start the Vite dev server on port 3000        |
| `yarn build`         | Type-check and produce a production build     |
| `yarn preview`       | Preview the production build                  |
| `yarn lint`          | Lint with ESLint                              |
| `yarn format`        | Format with Prettier                          |
| `yarn test`          | Run the Vitest unit test suite                |
| `yarn test:watch`    | Run Vitest in watch mode                      |
| `yarn test:coverage` | Unit tests with coverage report               |
| `yarn test:e2e`      | Run the Playwright end-to-end tests           |

## A brief system breakdown

### Let's start here!

So you have an SPA web app that you want to build with React Js.
And you need to come up with an app-wide, system design setup. That is, system breakdown to
individual bits and pieces like, routing and navigation, controllers, app's global state
management, and sharing components' state information; configuring security access for your
pages, as to which are publicly accessible, and which a user must be logged in and authenticated
to access; and even different types of access based on roles.
Well, this self-guiding design employed here in this, "React Js SPA Web App with Login Starter
Template Framework Design" has got you covered.

### The design philosophy!

#### App working data and main components state/data (the stores):
All app working data, and main components state is managed in your "stores."
So, you have a main store "app" which, specifically, is for managing running app data.
Then you have other stores based on, and for your app's main components, in this showcase,
that would be the components [page1, page2, page3, page4] plus the secured app. Those stores
essentially hold the component's state globally, such that their information can be shared
across each other.

The stores mini-ecosystem lives in `src/app/stores`, built on a tiny `createStore` factory that
wraps Zustand's `persist` middleware — every store is automatically persisted to localStorage so
you don't lose your working data across page reloads, and every store gets a `reset()` action.
Add your own stores by following the pattern in `stores.ts`.

#### Controllers functions:
React is a view library and not a full blown framework like Angular. But like most engineers, we
like the practice of splitting things apart and dealing with them in pieces. So, React components
only deal with the UI rendering, while the functions a view relies on are lifted out to a
"controller" file for that activity (see `src/app/controllers`), which you import and use as you wish.

#### Routing and navigation:
Built on top of React Router 7, wrapped in the template's own navigation logic
(`src/app/routing-and-navigation`): central route declarations, an `appNavigation` singleton you
can call from anywhere (views, controllers, stores), a navigation trail tracked in the app store,
and a `RequireAuth` guard component that protects the secured routes — unauthenticated visitors
are redirected to the login page. Follow the pattern therein to add your own routes.

#### Login, sign up and the secured app:
The template ships with a working sign up / login / logout flow, no server needed: users are
stored in the browser's IndexedDB (`src/app/app-management/data-manager`), authentication state
lives in the persisted auth store, and the secured pages are wrapped in the route guard. Swap the
IndexedDB calls in `src/app/controllers/login-controller.ts` for your real backend when you have one.

#### Server data, when a server shows up (TanStack Query):
This template is a fully self-contained frontend app — it runs without any server. But the moment
a server comes into play, TanStack Query is the blessed option for fetching, caching and
synchronizing server data. The `QueryClientProvider` is already mounted at the app entry, and
Page 5 (`src/app/views/page-5-server-data-example.tsx`) demonstrates the whole pattern: loading,
error, cached and refetch states. The rule of thumb: stores for your app's working/UI state,
the query cache for server state.

#### Notifications:
A global notification center (`src/app/shared-components-and-modules/notification-center`)
renders Bulma-styled alerts from anywhere — views, controllers, stores — through a single
`notificationCallback(type, message)` call.

#### Testing:
Unit tests are managed by Vite through Vitest (`*.test.ts(x)` co-located with the source, jsdom
environment, Testing Library for components) — see the examples next to `util.ts`,
`createStore.ts`, `login-form.tsx` and the notification center. End-to-end journeys are covered
by Playwright in `tests/e2e`, including the full sign up → login → secured app → logout flow.

### And there you have it:
Come up with frontend application design architecture from experience, over the years; get those
components above, and put them together with React js; and you have an all batteries included,
shiny whistles and bells, React Js SPA web app template framework to start you off to build your
web app — one that facilitates a secure app with sign up, login and authentication; or even a
fully public SPA — just tweak or turn off the login and sign up facilities if you don't need them.

And now!

### About me, and S/Os and credits
#### About me:
Hi. I'm Kevin Barasa. A full stack software engineer currently based in my hometown and country, Nairobi, Kenya.
At the time of the original build of this template (May, 2020), I had 3 and a half years of professional (hired)
software engineering experience, and 5 to 6 yrs of total software engineering experience, both professionally
and personally.
I'm especially, particularly well versed with Java, SQL (MySQL/OracleSQL), Javascript and web technologies,
Mobile app development with React Native and Android, and I have, and can as well work with other languages
and technologies like Python, C++, C#, Dart, NoSQL Dbs, and AWS cloud.

#### Let's connect:
LinkedIn: [Kevin Barasa (kaybarax)](https://www.linkedin.com/in/kaybarax/)

Github: [Kaybarax](https://github.com/Kaybarax)

Twitter: [Kaybarax](https://twitter.com/Kaybarax)

#### Shout out's and credits:
[Daishi Kato](https://twitter.com/dai_shi) and the [Poimandres collective](https://github.com/pmndrs) —
maintainers of [Zustand](https://github.com/pmndrs/zustand), the global state manager powering the app.

[Tanner Linsley](https://twitter.com/tannerlinsley) — creator of [TanStack Query](https://tanstack.com/query/latest),
the blessed option here for server data.

[Andy Haskell](https://twitter.com/AndyHaskell2013) — tutorial guide on implementing IndexedDb.
Thanks a lot dude for your tutorial I came across on [@Medium and Dev.to](https://dev.to/andyhaskell/build-a-basic-web-app-with-indexeddb-38ef).


#### !! Have fun bringing your web app to life! Cheers !!
