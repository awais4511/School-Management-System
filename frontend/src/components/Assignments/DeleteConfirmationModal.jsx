import { MdWarning } from "react-icons/md";

export default function DeleteConfirmationModal({ assignmentTitle, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center justify-center mb-5">
          <div className="bg-red-100 p-3 rounded-full">
            <MdWarning className="text-red-600 text-2xl" />
          </div>
        </div>

        <h2 className="font-bold text-slate-800 text-center text-base mb-2">
          Delete Assignment?
        </h2>
        <p className="text-slate-500 text-center text-sm mb-6">
          Are you sure you want to delete <strong>"{assignmentTitle}"</strong>? This action cannot
          be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold py-2.5 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
