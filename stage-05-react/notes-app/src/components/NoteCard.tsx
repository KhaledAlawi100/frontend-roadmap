import type { Note } from "../types/note";

type NoteCardProps = {
  note: Note;
};

function NoteCard({ note }: NoteCardProps) {
  return (
    <article className="rounded-xl bg-white p-5 shadow-md ">
      <div className="mb-3 flex items-center justify-between  ">
        <h2 className="text-lg font-semibold text-gray-900 ">{note.title}</h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700" >{note.category}</span>
      </div>

      {/* className="text-gray-600" */}
      <p>{note.content}</p>
    </article>
  );
}

export default NoteCard;
