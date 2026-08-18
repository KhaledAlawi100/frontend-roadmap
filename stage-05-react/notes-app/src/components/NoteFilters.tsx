type NoteFilterProps = {
  searchTerm: string;
  categoryFilter: string;
  archiveFilter: "ALL" | "ACTIVE" | "ARCHIVED";
  showPinned: boolean;

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onArchiveChange: (value: "ALL" | "ACTIVE" | "ARCHIVED") => void;
  onPinnedChange: (value: boolean) => void;
};

function NoteFilters({
  searchTerm,
  categoryFilter,
  archiveFilter,
  showPinned,
  onSearchChange,
  onCategoryChange,
  onArchiveChange,
  onPinnedChange,
}: NoteFilterProps) {
  return (
    <div className="mb-8 rounded-xl bg-white p-5 shadow-md">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/*   Search   */}

        <div>
          <label
            htmlFor="search"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Search
          </label>

          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search notes..."
            className="w-full rounded-lg border px-3 py-2"
          />
        </div>

        {/* Category */}

        <div>
          <label
            htmlFor="category"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Category
          </label>

          <select
            id="category"
            value={categoryFilter}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="ALL">All</option>
            <option value="Study">Study</option>
            <option value="Personal">Personal</option>
            <option value="Projects">Projects</option>
            <option value="Work">Work</option>
          </select>
        </div>

        {/* Archive */}

        <div>
          <label
            htmlFor="archive"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Archive
          </label>
          <select
            id="archive"
            value={archiveFilter}
            onChange={(event) =>
              onArchiveChange(
                event.target.value as "ALL" | "ACTIVE" | "ARCHIVED",
              )
            }
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="ALL">All notes</option>
            <option value="ACTIVE">Active</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        {/* Pinned */}

        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={showPinned}
              onChange={(event) => onPinnedChange(event.target.checked)}
              className="h-4 w-4"
            />

            <span className="text-sm font-medium text-gray-700">
              Pinned only
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default NoteFilters;
