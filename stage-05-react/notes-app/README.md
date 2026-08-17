# Sprint 1 — Project Setup

## Overview

This sprint establishes the foundation for the React Notes App.

The project was created using React, TypeScript, Vite, and Tailwind CSS.

The goal was to understand the basic React application structure and create the first components before implementing the Notes App features.

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS

## Project Structure

```text
src/
├── components/
│   └── Header.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## What Was Implemented

### App Component

`App.tsx` is the root React component.

It provides the main application layout and composes the `Header` component with the main content.

### Header Component

`Header.tsx` is a separate functional component responsible for displaying the application header.

### Main Layout

The application contains:

* Header
* Main content area
* Notes section placeholder

Tailwind CSS utility classes are used for the initial styling.

## React Concepts Practiced

### JSX

Used JSX to describe the UI structure inside React components.

### Components

Created functional React components and separated the header from the main application component.

### Component Composition

`App` composes `Header` as a child component.

```text
App
└── Header
```

## Result

The project now has a clean React + TypeScript + Tailwind foundation ready for the next sprint.

## Next Sprint

Build the Notes UI using components, props, lists, and keys.

# Sprint 2 — Note Components

## Overview

This sprint introduces the Notes App display structure.

The application now renders a collection of notes using reusable React components.

## What Was Implemented

### Note Type

Created a `Note` TypeScript type containing:

* `id`
* `title`
* `content`
* `category`

### NoteCard

Created a reusable `NoteCard` component responsible for displaying a single note.

The note is received through props.

### NoteList

Created a `NoteList` component responsible for displaying multiple notes.

It receives an array of notes and uses `map()` to create a `NoteCard` for each note.

## React Concepts Practiced

### Components

Created separate components with clear responsibilities:

```text
App
└── NoteList
    ├── NoteCard
    ├── NoteCard
    └── NoteCard
```

### Props

`NoteList` receives:

```tsx
notes
```

and `NoteCard` receives:

```tsx
note
```

### Lists

The notes array is rendered using:

```tsx
notes.map(...)
```

### Keys

Each `NoteCard` receives a unique React key:

```tsx
key={note.id}
```

This gives React a stable identity for each item in the list.

### Component Composition

The UI is divided into smaller components:

```text
App
 ↓
NoteList
 ↓
NoteCard
```

This makes the application easier to understand and maintain.

## Result

The Notes App can now display multiple notes dynamically from an array of typed data.

## Next Sprint

Manage the notes using React state and implement note operations such as adding, deleting, and updating notes.


# Sprint 3 — Notes State

## Overview

This sprint introduces React state into the Notes App.

The notes are now managed using `useState`, allowing the UI to update when notes are modified.

## What Was Implemented

### Notes State

Moved the notes collection into React state:

```tsx
const [notes, setNotes] = useState<Note[]>([]);
```

The `App` component owns the notes state.

### Delete

Implemented note deletion using `filter()`.

The selected note is removed while creating a new array.

### Pin / Unpin

Implemented toggling the `pinned` property using `map()`.

A note can switch between:

```text
pinned: false
pinned: true
```

### Archive / Unarchive

Implemented toggling the `archived` property using `map()`.

A note can switch between:

```text
archived: false
archived: true
```

## React Concepts Practiced

### State

Used `useState` to allow the notes collection to change over time.

### State Updates

Used `setNotes()` to update the notes state.

### Functional Updates

Used the previous state when calculating the next state:

```tsx
setNotes((previousNotes) => ...)
```

This is useful when the new state depends on the previous state.

### Immutable Arrays

Used methods such as:

```text
filter()
map()
```

instead of modifying the existing notes array directly.

## Component Communication

The `App` component owns the state and passes callback functions to child components.

```text
App
 ↓
NoteList
 ↓
NoteCard
```

Callbacks such as `onDelete`, `onTogglePin`, and `onToggleArchive` allow child components to request changes from the parent.

## Result

The Notes App can now:

* Display notes
* Delete notes
* Pin and unpin notes
* Archive and unarchive notes

The project now has dynamic state-driven behavior instead of static data.


