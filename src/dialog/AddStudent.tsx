import { X } from "lucide-react";
import { useState } from "react";
import { Student } from "./StudentInfo";

async function addStudentRequest(student: Student) {
  const result = await fetch(`http://localhost:8080/student`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  return result.status === 204 ? true : false;
}

function AddStudentDialog({
  onClose,
  addSuccess,
}: {
  onClose: () => void;
  addSuccess: () => void;
}) {
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState(1);
  const [address, setAddress] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray/20 backdrop-blur-sm">
      <div className="relative bg-gray-900 p-6 rounded-2xl shadow-2xl w-96 transform transition-all scale-100 animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-indigo-400 border-b border-gray-700 pb-2">
          Add Student
        </h2>
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const student = new Student(firstname, middlename, lastname, {
              course,
              year,
              address,
            });

            const isSuccess = await addStudentRequest(student);

            if (isSuccess) {
              addSuccess();
            } else {
              // later
              console.log("faileds");
            }
            onClose(); // close dialog or handle save
          }}
        >
          <label className="block mb-2 font-medium">Firstname</label>
          <input
            type="text"
            className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
            onChange={(e) => setFirstname(e.target.value)}
            required
          />

          <label className="block mb-2 font-medium">Middlename</label>
          <input
            type="text"
            className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
            onChange={(e) => setMiddlename(e.target.value)}
            required
          />

          <label className="block mb-2 font-medium">Lastname</label>
          <input
            type="text"
            className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
            onChange={(e) => setLastname(e.target.value)}
            required
          />

          <label className="block mb-2 font-medium">Course</label>
          <input
            type="text"
            className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
            onChange={(e) => setCourse(e.target.value)}
            required
          />

          <label className="block mb-2 font-medium">Year</label>
          <input
            type="number"
            className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
            onChange={(e) => setYear(Number(e.target.value))}
            required
          />

          <label className="block mb-2 font-medium">Address</label>
          <input
            type="text"
            className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 text-white"
            onChange={(e) => setAddress(e.target.value)}
            required
          />

          <div className="flex justify-end">
            <button
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              type="submit"
            >
              Save
            </button>

            <button
              type="button"
              className="mr-4 mt-4 ml-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudentDialog;
