# Sprint 1 — Project Setup

## Overview

This sprint establishes the foundation for the React Notes App.

The project was created using React, TypeScript, Vite, and Tailwind CSS.

The goal was to understand the basic React application structure and create the first components before implementing the Notes App features.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS

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

- Header
- Main content area
- Notes section placeholder

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

- `id`
- `title`
- `content`
- `category`

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
notes;
```

and `NoteCard` receives:

```tsx
note;
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

- Display notes
- Delete notes
- Pin and unpin notes
- Archive and unarchive notes

The project now has dynamic state-driven behavior instead of static data.

# Sprint 4 — Create Note

## Overview

This sprint adds the ability to create new notes through a React form.

The form uses controlled inputs and React state to manage the user's input before creating a new note.

## What Was Implemented

### NoteForm

Created a reusable `NoteForm` component with three fields:

- Title
- Content
- Category

### Controlled Inputs

Each input is controlled by React state.

The form state is stored as:

```tsx
const [formData, setFormData] = useState<NoteFormData>(initialFormData);
```

The input value comes from state, and `onChange` updates that state.

### Form Validation

Added validation to ensure:

- Title is required
- Content is required
- Category is required

Invalid submissions display an error message and do not create a note.

### Submit Handling

The form uses `onSubmit` and prevents the browser's default form submission behavior.

The submission flow is:

```text
Form
 ↓
onSubmit
 ↓
Validation
 ↓
onCreateNote()
 ↓
App
 ↓
setNotes()
 ↓
React re-renders
```

### Creating Notes

`App` owns the notes state.

`NoteForm` sends the form data to `App` through the `onCreateNote` callback.

`App` creates the new `Note` and adds it to the notes array using an immutable state update.

### Form Reset

After successfully creating a note, the form state is reset to its initial values.

## React Concepts Practiced

- Controlled inputs
- Form state
- `useState`
- `onChange`
- `onSubmit`
- Form validation
- Callback props
- Parent → child communication
- Immutable state updates

## Architecture

```text
App
 │
 │ owns notes state
 │
 ├── NoteForm
 │     │
 │     ├── form state
 │     ├── validation
 │     └── onCreateNote()
 │              │
 │              ↓
 │           App
 │              │
 │          setNotes()
 │
 └── NoteList
       │
       └── NoteCard
```

## Result

The Notes App can now create new notes dynamically instead of relying only on initial notes.


# Sprint 5 — Edit Note

## Overview

This sprint adds the ability to edit existing notes.

The existing `NoteForm` component is reused for both creating and editing notes instead of creating a separate edit form.

## What Was Implemented

### Edit Note

Each `NoteCard` now provides an **Edit** button.

When the user clicks Edit:

```text
NoteCard
   ↓
Edit
   ↓
App
   ↓
editingNote
   ↓
NoteForm
```

The selected note is passed to `NoteForm`, where its existing data is displayed in the form.

### Reusable NoteForm

`NoteForm` now supports two modes:

* Create
* Edit

The form determines the mode based on whether an existing note was provided.

```text
note === null
     ↓
Create Mode

note !== null
     ↓
Edit Mode
```

The same form is therefore reused for both operations.

### Updating a Note

When editing a note, submitting the form calls:

```text
NoteForm
   ↓
onUpdateNote()
   ↓
App
   ↓
setNotes()
   ↓
UI updates
```

The note is updated using `map()` without modifying the original array.

### Conditional Rendering

The form is shown only when needed:

```text
isFormOpen === true
        ↓
Show NoteForm

isFormOpen === false
        ↓
Hide NoteForm
```

The application also conditionally changes the form's behavior and labels between Create and Edit modes.

### Cancel

A Cancel button was added to close the form without changing the notes.

## Additional UI Improvements

### Confirmation Dialog

A reusable `ConfirmDialog` component was added to prevent accidental deletion.

The flow is:

```text
Delete
  ↓
ConfirmDialog
  ↓
Cancel / Confirm
  ↓
Delete note if confirmed
```

### Note Actions Menu

The NoteCard actions were reorganized to improve the UI.

The main Edit action remains visible, while secondary actions are placed inside a menu:

* Pin / Unpin
* Archive / Unarchive
* Delete

## React Concepts Practiced

* Component reuse
* Component composition
* Props
* Callback props
* `useState`
* Conditional rendering
* Controlled forms
* Immutable state updates
* `map()`
* Component identity with `key`
* Reusable components

## Final Flow

```text
                     App
                      │
              ┌───────┴────────┐
              ↓                ↓
          Add Note          NoteCard
              │                │
              ↓                ↓
          NoteForm            Edit
              │                │
              │                ↓
              │            NoteForm
              │                │
              └───────┬────────┘
                      ↓
                 Submit Form
                      ↓
              Create / Update
                      ↓
                  setNotes()
                      ↓
                 UI updates
```

## Result

The Notes App can now create and edit notes using a single reusable form component.

This sprint demonstrates how React components can be reused while their behavior is controlled through props and callbacks.

