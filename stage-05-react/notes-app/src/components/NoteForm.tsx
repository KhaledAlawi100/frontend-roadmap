import { useState } from "react";

import type { NoteFormData } from "../types/noteFormData";

type NoteFormProps = {
  onCreateNote: (formData: NoteFormData) => void;
};

const initialFormData: NoteFormData = {
  title: "",
  content: "",
  category: "",
};

function NoteForm({ onCreateNote }: NoteFormProps) {
  const [formData, setFormData] = useState<NoteFormData>(initialFormData);
  const [error, setError] = useState("");

  function handleFieldChange(field: keyof NoteFormData, value: string) {
    setFormData((previousFormData) => ({
      ...previousFormData,
    // Computed property name 
      [field]: value,
    }));
  }

  function validateForm(): string | null {
    if (!formData.title.trim()) {
      return "Title is required.";
    }

    if (!formData.content.trim()) {
      return "Content is required.";
    }

    if (!formData.category.trim()) {
      return "Category is required.";
    }

    return null;
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");

    onCreateNote(formData);

    setFormData(initialFormData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-b-xl bg-white p-6 shadow-md"
    >
      <h2 className="mb-4 text-xl font-semibold">Create Note</h2>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
          Title
        </label>

        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(event) => handleFieldChange("title", event.target.value)}
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Enter note title"
        />
      </div>

      {/* Content */}
      <div className="mb-4">
        <label htmlFor="content" className="mb-1 block text-sm font-medium">
          Content
        </label>

        <textarea
          id="content"
          value={formData.content}
          onChange={(event) => handleFieldChange("content", event.target.value)}
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Enter note content"
          rows={4}
        />
      </div>

      {/* Category */}
      <div className="mb-4">
        <label htmlFor="category" className="mb-1 block text-sm font-medium">
          Category
        </label>

        <input
          id="category"
          type="text"
          value={formData.category}
          onChange={(event) =>
            handleFieldChange("category", event.target.value)
          }
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Enter note category"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-black px-4 py-2 text-white"
      >
        Create Note
      </button>
    </form>
  );
}

export default NoteForm;
