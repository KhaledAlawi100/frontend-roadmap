import type { Note } from "../types/note";

type NoteCardProps = {
  note: Note;
  onDelete: (noteId: number) => void;
  onTogglePin: (noteId: number) => void;
  onToggleArchive: (noteId: number) => void;
};

function NoteCard({
  note,
  onDelete,
  onTogglePin,
  onToggleArchive,
}: NoteCardProps) {
  return (
    <article className="rounded-xl bg-white p-5 shadow-md ">
      <div className="mb-3 flex items-center justify-between  ">
        <h2 className="text-lg font-semibold text-gray-900 ">{note.title}</h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
          {note.category}
        </span>
      </div>

      <p className="text-gray-600">{note.content}</p>
      <div className="flex gap-2 mt-3 justify-end">
        <button
          type="button"
          onClick={() => onTogglePin(note.id)}
          className="rounded-lg bg-yellow-100  px-3 py-2 test-sm"
        >
          {note.pinned ? "Unpin" : "Pin"}
        </button>

        <button
          type="button"
          onClick={() => onToggleArchive(note.id)}
          className="rounded-lg bg-gray-100 px-3 py-2 text-sm"
        >
          {note.archived ? "Unarchive" : "Archive"}
        </button>

        <button
          type="button"
          onClick={() => onDelete(note.id)}
          className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default NoteCard;
