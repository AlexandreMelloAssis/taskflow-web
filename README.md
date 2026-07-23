# TaskFlow Web

An Angular 17 (standalone components) front end for [taskflow-api](https://github.com/AlexandreMelloAssis/taskflow-api) — a task-management REST API built with .NET 8.

## Overview

A small, focused SPA that lists tasks, lets you create new ones, mark them in-progress/done, and delete them. Built to demonstrate a clean Angular architecture: typed models, a single injectable service wrapping `HttpClient`, and signal-based state in the component — no NgModules, no unnecessary boilerplate.

```
src/app/
├── models/           # TypeScript interfaces mirroring the API's DTOs
├── services/         # TaskService — all HTTP calls to the API live here
├── app.component.ts   # Root standalone component: task list + create form
└── app.config.ts      # Application-wide providers (HttpClient, etc.)
```

## Tech stack

- Angular 17 (standalone components, no NgModules)
- TypeScript
- RxJS + `HttpClient` for API communication
- Signals for local component state

## Design notes

- **Typed contracts**: `models/task.model.ts` mirrors the DTOs exposed by the API (`TaskDto`, `CreateTaskRequest`), so a change in the API's shape surfaces as a compile error here instead of a runtime bug.
- **Service isolation**: `TaskService` is the only place that knows the API's base URL and endpoints. Components never call `HttpClient` directly.
- **Standalone components**: no `AppModule` — routes and providers are wired in `app.config.ts`, consistent with modern Angular (17+) conventions.

## Running locally

```bash
npm install
npm start
```

By default the app expects the API at `https://localhost:5001/api` (see `src/app/services/task.service.ts`) — update the `apiUrl` if your [taskflow-api](https://github.com/AlexandreMelloAssis/taskflow-api) instance runs elsewhere.

## Possible next steps

- Add route-level code splitting once more views are added (e.g., task detail, filters)
- Add optimistic UI updates for create/update/delete
- Add unit tests for `TaskService` with `HttpClientTestingModule`
