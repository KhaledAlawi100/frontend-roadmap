import type { Note } from "../types/note";
import NoteCard from "./NoteCard";

type NoteListProps = {
  notes: Note[];
  onDelete: (note: Note) => void;
  onTogglePin: (noteId: number) => void;
  onToggleArchive: (noteId: number) => void;
  onEdit: (note: Note) => void;
};

function NoteList({ notes , onDelete ,onTogglePin ,onToggleArchive ,onEdit }: NoteListProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onDelete={onDelete}
          onTogglePin={onTogglePin}
          onToggleArchive={onToggleArchive}
          onEdit={onEdit}
        />
      ))}
    </section>
  );
}

export default NoteList;
