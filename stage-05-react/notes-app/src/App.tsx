import Header from "./components/Header";

import type { Note } from "./types/note";
import { useState } from "react";

import NoteList from "./components/NoteList";

import NoteForm from "./components/NoteForm";
import type { NoteFormData } from "./types/noteFormData";

function App() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Learn React",
      content: "Study components, props, and state.",
      category: "Study",
      pinned: false,
      archived: false,
    },
    {
      id: 2,
      title: "Shopping",
      content: "Buy milk, bread, and coffee.",
      category: "Personal",
      pinned: false,
      archived: false,
    },
    {
      id: 3,
      title: "Project Ideas",
      content: "Build a Notes application with React.",
      category: "Projects",
      pinned: false,
      archived: false,
    },
  ]);

  function handleCreateNote(formData: NoteFormData) {
    const newNote: Note = {
      id: Date.now(),
      title: formData.title,
      content: formData.content,
      category: formData.category,
      pinned: false,
      archived: false,
    };

    setNotes((previousNotes) => [...previousNotes, newNote]);
  }

  function handleDelete(noteId: number) {
    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== noteId),
    );
  }

  function handleTogglePin(noteId: number) {
    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              pinned: !note.pinned,
            }
          : note,
      ),
    );
  }

  function handleToggleArchive(noteId: number) {
    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              archived: !note.archived,
            }
          : note,
      ),
    );
  }

  return (
    <div className="min-h-screen  bg-gray-100">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">My Notes</h2>
          <p className="mt-1 text-gray-600">
            Keep track of your important notes.
          </p>
        </div>
        <NoteForm onCreateNote={handleCreateNote} />
        <NoteList
          notes={notes}
          onDelete={handleDelete}
          onToggleArchive={handleToggleArchive}
          onTogglePin={handleTogglePin}
        />
      </main>
    </div>
  );
}

export default App;
