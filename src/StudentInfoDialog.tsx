import { X } from "lucide-react";
import { useState } from "react";
import DeleteConfirmationDialog from "./Dialog";

class Student {
  fullname: string;

  data: {
    course: string;
    year: number;
    address: string;
  };

  constructor(
    fullname: string,
    data: { course: string; year: number; address: string }
  ) {
    this.fullname = fullname;
    this.data = data;
  }
}

function deleteStudentRequest(fullname: string) {
  fetch("http://localhost:8080/student", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fullname }),
  }).then((response) => {
    if (response.status === 204) {
      console.log("Student deleted successfully");
    } else {
      console.error("Failed to delete student");
    }
  });
}

function StudentInfoDialog({
  student,
  onClose,
  updateChanges,
}: {
  student: Student;
  onClose: () => void;
  updateChanges: () => void;
}) {
  const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray/20 backdrop-blur-sm">
      <div className="relative bg-gray-900 p-6 rounded-2xl shadow-2xl w-96 transform transition-all scale-100 animate-fadeIn">
        {/* X Close Icon */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-4 text-indigo-400 border-b border-gray-700 pb-2">
          Student Data
        </h2>

        <div className="flex mb-1">
          <span className="w-24">Name:</span>
          <span>{student.fullname}</span>
        </div>

        <div className="flex mb-1">
          <span className="w-24">Course:</span>
          <span>{student.data.course}</span>
        </div>

        <div className="flex mb-1">
          <span className="w-24">Year:</span>
          <span>{student.data.year}</span>
        </div>

        <div className="flex mb-1">
          <span className="w-24">Address:</span>
          <span className="flex-1 line-clamp-10">{student.data.address}</span>
        </div>

        <div className="flex justify-end">
          <button
            className="mr-4 mt-4 ml-2 bg-red-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            onClick={() => setDeleteDialogIsOpen(true)}
          >
            Delete
          </button>

          <button
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            onClick={onClose}
          >
            Edit
          </button>
        </div>

        {/* Delete confirmation dialog */}
        {deleteDialogIsOpen && (
          <DeleteConfirmationDialog
            onConfirm={() => {
              deleteStudentRequest(student.fullname);
              updateChanges();
              setDeleteDialogIsOpen(false);
              onClose(); // also close main dialog
            }}
            onCancel={() => setDeleteDialogIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default StudentInfoDialog;
