interface RemoveButtonProps {
  onClick: () => void;
}

function RemoveButton({ onClick }: RemoveButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 items-center justify-center rounded-md bg-red-500 px-4 text-sm font-medium text-white transition hover:bg-red-600"
    >
      Remove
    </button>
  );
}

export default RemoveButton;
