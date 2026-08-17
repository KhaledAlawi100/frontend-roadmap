import Header from "./components/Header";

import type { Note } from "./types/note";

import NoteList from "./components/NoteList";

const notes: Note[] = [
  {
    id: 1,
    title: "Learn React",
    content: "Study components, props, and state.",
    category: "Study",
  },
  {
    id: 2,
    title: "Shopping",
    content: "Buy milk, bread, and coffee.",
    category: "Personal",
  },
  {
    id: 3,
    title: "Project Ideas",
    content: "Build a Notes application with React.",
    category: "Projects",
  },
];

function App() {
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
        <NoteList notes={notes}/>
      </main>
    </div>
  );
}

export default App;
