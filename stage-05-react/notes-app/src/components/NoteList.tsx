import type { Note } from "../types/note";

import NoteCard from "./NoteCard";

type NoteListProps = {
  notes: Note[];
};

function NoteList({ notes }: NoteListProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" >
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </section>
  );
}

export default NoteList; 
