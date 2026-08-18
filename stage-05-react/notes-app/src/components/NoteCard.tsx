import { useState } from "react";

import type { Note } from "../types/note";

type NoteCardProps = {
  note: Note;
  onDelete: (note: Note) => void;
  onTogglePin: (noteId: number) => void;
  onToggleArchive: (noteId: number) => void;
  onEdit: (note: Note) => void;
};

function NoteCard({
  note,
  onDelete,
  onTogglePin,
  onToggleArchive,
  onEdit,
}: NoteCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleEdit() {
    onEdit(note);
    setIsMenuOpen(false);
  }

  function handleTogglePin() {
    onTogglePin(note.id);
    setIsMenuOpen(false);
  }

  function handleToggleArchive() {
    onToggleArchive(note.id);
    setIsMenuOpen(false);
  }

  function handleDelete() {
    onDelete(note);
    setIsMenuOpen(false);
  }

  return (
    <article className="rounded-xl bg-white p-5 shadow-md">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{note.title}</h2>

          <span className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
            {note.category}
          </span>
        </div>

        {/* More Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            className="rounded-lg px-2 py-1 text-xl text-gray-500 hover:bg-gray-100"
            aria-label="Note actions"
          >
            ⋮
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 z-10 mt-2 w-40 rounded-lg border bg-white p-1 shadow-lg">
              <button
                type="button"
                onClick={handleTogglePin}
                className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
              >
                {note.pinned ? "Unpin" : "Pin"}
              </button>

              <button
                type="button"
                onClick={handleToggleArchive}
                className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
              >
                {note.archived ? "Unarchive" : "Archive"}
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-600">{note.content}</p>

      {/* Footer */}
      <div className="mt-5 flex justify-end border-t pt-4">
        <button
          type="button"
          onClick={handleEdit}
          className="rounded-lg bg-blue-100 px-4 py-2 text-sm text-blue-700 hover:bg-blue-200"
        >
          Edit
        </button>
      </div>
    </article>
  );
}

export default NoteCard;
