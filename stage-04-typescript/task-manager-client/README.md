# Task Manager Client

A TypeScript-based frontend project built as the practical project for **Stage 4 — TypeScript** of my Frontend Roadmap.

The goal of this project is to apply TypeScript concepts through a real application instead of learning TypeScript only through isolated exercises.

---

# Stage 4 — TypeScript

## Project Goal

Build a Task Manager API Client while applying the core TypeScript concepts learned throughout Stage 4.

The project focuses on:

- Strong type safety
- Interfaces
- Type aliases
- Union types
- Type narrowing
- Generics
- Enums
- Utility types
- API contracts
- Typed API communication
- Clean project structure
- TypeScript best practices

---

# Tech Stack

- TypeScript
- Vite
- HTML
- CSS
- Fetch API
- npm

---

# Sprint 0 — Project Setup

## Goal

Create the TypeScript project correctly.

## What Was Built

- Created a Vite project using the Vanilla TypeScript template
- Initialized npm
- Installed project dependencies
- Configured TypeScript
- Enabled strict TypeScript checking
- Configured ES modules
- Created the initial project structure
- Added development server support
- Added TypeScript type checking
- Added production build support

## Project Structure

```text
task-manager-client/
│
├── src/
│   ├── api/
│   ├── types/
│   ├── services/
│   ├── utils/
│   ├── main.ts
│   └── style.css
│
├── public/
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.

# Sprint 1 — Domain Model

## Goal

Define the application's data contracts.

This is the first major TypeScript sprint where we begin modeling the actual Task Manager domain before implementing the API and UI layers.

---

## What We Built

- Created the `Task` interface
- Created the `User` interface
- Created the `TaskStatus` type
- Added optional task properties
- Added readonly identifiers
- Applied union types
- Used type-only imports

---

## Concepts Applied

- Interfaces
- Type aliases
- Optional properties
- Union types
- `readonly`
- Primitive types
- Type-only imports
- Type checking

---

## Task Status

Task status is represented using a union type:

```ts
export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "COMPLETED";

  