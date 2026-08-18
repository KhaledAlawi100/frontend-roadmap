type ConfirmDialogProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/40 p-4">
      <div className="w-full h-fit  flex flex-col items-center max-w-md rounded-xl bg-white p-6 shadow-xl ">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">{title}</h2>
        <p className="mb-6 text-gray-600">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
