import { useEffect, useState } from "react";
import { X } from "lucide-react"; // 👈 close icon

function UsersTable() {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    async function loadStudents() {
      try {
        const response = await fetch("http://localhost:8080/student");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    loadStudents();
  }, []);

  const handleEdit = () => {
    setFormData(selectedStudent);
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await fetch(`http://localhost:8080/student/${selectedStudent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setStudents((prev) =>
        prev.map((s) => (s.id === selectedStudent.id ? formData : s))
      );

      setSelectedStudent(formData);
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:8080/student/${selectedStudent.id}`, {
        method: "DELETE",
      });

      setStudents((prev) =>
        prev.filter((s) => s.id !== selectedStudent.id)
      );

      setSelectedStudent(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6 text-center">Student Mini Portal</h1>

      {/* Card */}
      <div className="p-6 bg-gray-800 rounded-2xl shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2>Student Data</h2>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            Add Student
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-gray-700">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="px-4 py-3 font-medium w-1/4">Full Name</th>
                <th className="px-4 py-3 font-medium w-1/4">Course</th>
                <th className="px-4 py-3 font-medium w-1/4">Year</th>
                <th className="px-4 py-3 font-medium w-1/4">Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-600 bg-gray-800">
              {students.map((stud, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-indigo-500/50 cursor-pointer"
                  onClick={() => setSelectedStudent(stud)}
                >
                  <td className="px-4 py-3 font-medium text-white">{stud.fullname}</td>
                  <td className="px-4 py-3 text-gray-300">{stud.data.course}</td>
                  <td className="px-4 py-3 text-gray-300">{stud.data.year}</td>
                  <td className="px-4 py-3 text-gray-300">{stud.data.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog / Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray/20 backdrop-blur-sm">
          <div className="relative bg-gray-900 p-6 rounded-2xl shadow-2xl w-96 transform transition-all scale-100 animate-fadeIn">
            
            {/* X Close Icon */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
              onClick={() => setSelectedStudent(null)}
            >
              <X size={20} />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold mb-4 text-indigo-400 border-b border-gray-700 pb-2">
              {isEditing ? "Edit Student" : "Student Details"}
            </h2>

            {/* Content */}
            {!isEditing ? (
              <div className="space-y-2 text-gray-200">
                <div className="flex">
                  <span className="w-24 font-semibold text-gray-300">Name</span>
                  <span className="flex-1">{selectedStudent.fullname}</span>
                </div>
                <div className="flex">
                  <span className="w-24 font-semibold text-gray-300">Course</span>
                  <span className="flex-1">{selectedStudent.data.course}</span>
                </div>
                <div className="flex">
                  <span className="w-24 font-semibold text-gray-300">Year</span>
                  <span className="flex-1">{selectedStudent.data.year}</span>
                </div>
                <div className="flex">
                  <span className="w-24 font-semibold text-gray-300">Address</span>
                  <span className="flex-1 break-words">{selectedStudent.data.address}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-gray-200">
                <div className="flex flex-col">
                  <label className="text-gray-300">Name</label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname || ""}
                    onChange={handleChange}
                    className="px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-300">Course</label>
                  <input
                    type="text"
                    name="course"
                    value={formData.data?.course || ""}
                    onChange={(e) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        data: { ...prev.data, course: e.target.value },
                      }))
                    }
                    className="px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-300">Year</label>
                  <input
                    type="text"
                    name="year"
                    value={formData.data?.year || ""}
                    onChange={(e) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        data: { ...prev.data, year: e.target.value },
                      }))
                    }
                    className="px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-300">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.data?.address || ""}
                    onChange={(e) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        data: { ...prev.data, address: e.target.value },
                      }))
                    }
                    className="px-3 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3">
              {!isEditing ? (
                <>
                  <button
                    className="bg-indigo-700 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md transition cursor-pointer"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-900 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md transition cursor-pointer"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition cursor-pointer"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md transition cursor-pointer"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersTable;
