interface SelectedProductTagProps {
  name: string;
  onRemove: () => void;
}

function SelectedProductTag({ name, onRemove }: SelectedProductTagProps) {
  return (
    <div className="inline-flex items-center bg-blue-600 text-white rounded px-3 py-1 mr-2 mt-1 select-none">
      <span>{name}</span>
      <button
        onClick={onRemove}
        className="ml-2 font-bold hover:text-gray-300"
        aria-label="Remove selected product"
        type="button"
      >
        ×
      </button>
    </div>
  );
}
