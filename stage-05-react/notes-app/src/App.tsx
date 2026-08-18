import Header from "./components/Header";

import type { Note } from "./types/note";

import NoteList from "./components/NoteList";

import NoteForm from "./components/NoteForm";
import type { NoteFormData } from "./types/noteFormData";
import ConfirmDialog from "./components/ConfirmDialog";
import NoteFilters from "./components/NoteFilters";
import type { NoteState } from "./types/noteState";
import { useEffect, useState } from "react";

function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem("notes");

    if (savedNotes) {
      return JSON.parse(savedNotes) as Note[];
    }

    return [
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
    ];
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [noteState, setNoteState] = useState<NoteState>({
    status: "loading",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (notes.length === 0) {
        setNoteState({
          status: "empty",
        });

        return;
      }

      setNoteState({
        status: "success",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function handleRetry() {
    setNoteState({
      status: "loading",
    });

    setTimeout(() => {
      if (notes.length === 0) {
        setNoteState({
          status: "empty",
        });

        return;
      }

      setNoteState({
        status: "success",
      });
    }, 1500);
  }

  const [archiveFilter, setArchiveFilter] = useState<
    "ALL" | "ACTIVE" | "ARCHIVED"
  >("ALL");

  const [showPinned, setShowPinned] = useState(false);

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

  const filterNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "ALL" || note.category === categoryFilter;

    const matchesArchive =
      archiveFilter === "ALL" ||
      (archiveFilter === "ACTIVE" && !note.archived) ||
      (archiveFilter === "ARCHIVED" && note.archived);

    const matchesPinned = !showPinned || note.pinned;

    return matchesSearch && matchesCategory && matchesArchive && matchesPinned;
  });

  function renderNotes() {
    if (noteState.status === "loading") {
      return (
        <p className="py-10 text-center text-gray-600">Loading notes...</p>
      );
    }

    if (noteState.status === "empty") {
      return <p className="py-10 text-center text-gray-600">No notes found.</p>;
    }

    if (noteState.status === "error") {
      return (
        <div className="flex flex-col items-center gap-4 py-10">
          <p className="text-red-600">{noteState.message}</p>

          <button
            type="button"
            onClick={handleRetry}
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Retry
          </button>
        </div>
      );
    }

    return (
      <NoteList
        notes={filterNotes}
        onDelete={handleDelete}
        onToggleArchive={handleToggleArchive}
        onTogglePin={handleTogglePin}
        onEdit={handleEditNote}
      />
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

          <div className="flex items-center gap-2 flex-col md:flex-row">
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

            {/* Search Button */}
            {!isFormOpen && (
              <button
                type="button"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="ml-4 rounded-lg bg-gray-200 px-4 py-2 text-gray-800"
              >
                {isSearchOpen ? "Close Search" : "Open Search"}
              </button>
            )}
          </div>
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

        {/*====== Note Filters ========  */}

        {isSearchOpen && (
          <NoteFilters
            searchTerm={searchTerm}
            categoryFilter={categoryFilter}
            archiveFilter={archiveFilter}
            showPinned={showPinned}
            onSearchChange={setSearchTerm}
            onCategoryChange={setCategoryFilter}
            onArchiveChange={setArchiveFilter}
            onPinnedChange={setShowPinned}
          />
        )}

        {/*====== Note List ========  */}
        {renderNotes()}

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
