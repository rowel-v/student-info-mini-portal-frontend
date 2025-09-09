function SaveConfirmationDialog({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray bg-opacity-50">
      <div className="relative bg-gray-900 p-6 rounded-2xl shadow-2xl w-96 transform transition-all scale-100 animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-indigo-400 border-b border-gray-700 pb-2">
          Save Changes
        </h2>
        <p className="mb-6">
          Are you sure you want to save the changes made to this student?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="mr-4 mt-4 ml-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            onClick={() => onConfirm()}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export { SaveConfirmationDialog };
