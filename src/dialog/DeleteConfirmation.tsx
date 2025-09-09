function DeleteConfirmationDialog({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-gray-900 p-6 rounded-xl shadow-xl w-80">
        <h2 className="text-lg font-semibold text-red-400 mb-4">
          Confirm Deletion
        </h2>

        <div className="flex justify-end space-x-3">
          <button
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export { DeleteConfirmationDialog };
