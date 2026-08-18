import Header from "./components/Header";

import type { Note } from "./types/note";
import { useState } from "react";

import NoteList from "./components/NoteList";

import NoteForm from "./components/NoteForm";
import type { NoteFormData } from "./types/noteFormData";
import ConfirmDialog from "./components/ConfirmDialog";

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

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);

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
  
  function handleEditNote(note: Note) {
    setEditingNote(note);
    setIsFormOpen(true);
  }
  function handleCancelForm() {
    setEditingNote(null);
    setIsFormOpen(false);
  }

  function handleUpdateNote(noteId: number, formData: NoteFormData) {
    setNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              title: formData.title,
              content: formData.content,
              category: formData.category,
            }
          : note,
      ),
    );
    setEditingNote(null);
    setIsFormOpen(false);
  }

  function handleDelete(note: Note) {
    setNoteToDelete(note);
  }

  function confirmDelete() {
    if (!noteToDelete) {
      return;
    }

    setNotes((previousNotes) =>
      previousNotes.filter((note) => note.id !== noteToDelete.id),
    );

    setNoteToDelete(null);
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
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Notes</h2>

            <p className="mt-1 text-gray-600">
              Keep track of your important notes.
            </p>
          </div>

          {/* Add Note Button */}
          {!isFormOpen && (
            <button
              type="button"
              onClick={() => {
                setEditingNote(null);
                setIsFormOpen(true);
              }}
              className="rounded-lg bg-black px-4 py-2 text-white"
            >
              Add Note
            </button>
          )}
        </div>

        {/*====== Form ========  */}
        {isFormOpen && (
          <NoteForm
            key={editingNote?.id ?? "create"}
            note={editingNote}
            onCreateNote={handleCreateNote}
            onUpdateNote={handleUpdateNote}
            onCancel={handleCancelForm}
          />
        )}

        {/*====== Note List ========  */}
        <NoteList
          notes={notes}
          onDelete={handleDelete}
          onToggleArchive={handleToggleArchive}
          onTogglePin={handleTogglePin}
          onEdit={handleEditNote}
        />

        {/*====== Confirm Dialog ========  */}
        {noteToDelete && (
          <ConfirmDialog
            title="Delete Note"
            message={`Are you sure you want to delete "${noteToDelete.title}"?`}
            onConfirm={confirmDelete}
            onCancel={() => setNoteToDelete(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;
