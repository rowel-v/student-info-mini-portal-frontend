import { useEffect, useState } from "react";
import StudentInfoDialog from "./dialog/StudentInfo";
import type { Student } from "./dialog/StudentInfo";
import AddStudentDialog from "./dialog/AddStudent";

function UsersTable() {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [addButtonIsClicked, setAddButtonIsClicked] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6 text-center">
        Student Mini Portal
      </h1>

      {/* Card */}
      <div className="p-6 bg-gray-800 rounded-2xl shadow-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2>Student Data</h2>
          <button
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
            onClick={() => setAddButtonIsClicked(true)}
          >
            Add Student
          </button>
        </div>

        {/* Table */}
        <div className="overflow-y-auto rounded-xl border border-gray-700 max-h-[678px]">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-700 text-gray-300 sticky top-0">
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
                  <td className="px-4 py-3 font-medium text-white">
                    {stud.firstname} {stud.middlename} {stud.lastname}
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {stud.data.course}
                  </td>
                  <td className="px-4 py-3 text-gray-300">{stud.data.year}</td>
                  <td className="px-4 py-3 text-gray-300">
                    {stud.data.address}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedStudent && (
        <StudentInfoDialog
          student={selectedStudent}
          updateChanges={() => {
            window.location.reload();
            setSelectedStudent(null);
          }}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      {addButtonIsClicked && (
        <AddStudentDialog onClose={() => setAddButtonIsClicked(false)} />
      )}
    </div>
  );
}

export default UsersTable;
