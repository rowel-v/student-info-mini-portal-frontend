import { X } from "lucide-react";
import { Student } from "./StudentInfoDialog";
import { useState } from "react";

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

async function updateStudentRequest(
  fullname: string,
  UpdatedStudentData: Student
) {
  const response = await fetch(`http://localhost:8080/student/${fullname}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(UpdatedStudentData),
  });
  if (response.status === 200 || response.status === 204) {
    console.log("Student updated successfully");
  } else {
    console.error("Failed to update student");
  }
}

function EditStudentDialog({
  onSave,
  onClose,
  student,
}: {
  onSave: () => void;
  onClose: () => void;
  student: Student;
}) {
  const [updatedFullName, setUpdatedFullName] = useState(student.fullname);
  const [updatedCourse, setUpdatedCourse] = useState(student.data.course);
  const [updateYear, setUpdatedYear] = useState(student.data.year);
  const [updatedAddress, setUpdatedAddress] = useState(student.data.address);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray/20 backdrop-blur-sm">
      <div className="relative bg-gray-900 p-6 rounded-2xl shadow-2xl w-96 transform transition-all scale-100 animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-indigo-400 border-b border-gray-700 pb-2">
          Edit Student Data
        </h2>
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <label className="block mb-2 font-medium">Full Name</label>
        <input
          type="text"
          className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          value={updatedFullName}
          onChange={(e) => setUpdatedFullName(e.target.value)}
        />

        <label className="block mb-2 font-medium">Course</label>
        <input
          type="text"
          className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          value={updatedCourse}
          onChange={(e) => setUpdatedCourse(e.target.value)}
        />

        <label className="block mb-2 font-medium">Year</label>
        <input
          type="number"
          className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          value={updateYear}
          onChange={(e) => setUpdatedYear(Number(e.target.value))}
        />

        <label className="block mb-2 font-medium">Address</label>
        <input
          type="text"
          className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
          value={updatedAddress}
          onChange={(e) => setUpdatedAddress(e.target.value)}
        />

        <div className="flex justify-end">
          <button
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            onClick={() => {
              const updatedData = new Student(updatedFullName, {
                course: updatedCourse,
                year: updateYear,
                address: updatedAddress,
              });
              updateStudentRequest(student.fullname, updatedData).then(() => {
                onSave();
              });
            }}
          >
            Save
          </button>

          <button
            className="mr-4 mt-4 ml-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export { EditStudentDialog };
export { DeleteConfirmationDialog };
